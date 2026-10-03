"use client";

import type {
  PublicClientErrorContext,
  PublicClientErrorMetadata,
  PublicClientErrorReportReceipt,
} from "./contracts";

const REPORT_PATH = "/api/public/observability/client-errors";
const REPORT_CONTRACT_VERSION = 1 as const;
const DELIVERY_TTL_MS = 15_000;
const MAX_DELIVERIES = 96;
const MESSAGE_LIMIT = 1_024;
const STACK_LIMIT = 8_192;
const MAX_STACK_LINES = 40;
const TOKEN_LIMIT = 128;
const PATHNAME_LIMIT = 512;
const CLIENT_BURST_LIMIT = 12;
const CLIENT_BURST_WINDOW_MS = 60_000;
const CONTROL_SINGLE_LINE = /[\u0000-\u001f\u007f-\u009f\u2028\u2029\u202a-\u202e\u2066-\u2069\ufeff]/gu;
const CONTROL_MULTILINE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u2028\u2029\u202a-\u202e\u2066-\u2069\ufeff]/gu;
const SAFE_TOKEN_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/u;
const RELEASE_PATTERN = /^[0-9A-Za-z][0-9A-Za-z._+-]{0,127}$/u;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const SENSITIVE_KEY_SOURCE = String.raw`[A-Za-z0-9_.-]*(?:password|passwd|passphrase|secret|token|authorization|cookie|csrf|api[_-]?key|database[_-]?url|smtp[_-]?(?:password|pass|secret)|private[_-]?key)[A-Za-z0-9_.-]*`;
const SECRET_ASSIGNMENT = /\b([A-Za-z0-9_.-]*(?:password|passwd|passphrase|secret|token|authorization|cookie|csrf|api[_-]?key|database[_-]?url|smtp[_-]?(?:password|pass|secret)|private[_-]?key)[A-Za-z0-9_.-]*)\b\s*[:=]\s*([^\s,;}\]]+)/giu;
const BEARER = /\bBearer\s+[A-Za-z0-9._~+/=-]+/giu;
const URL_CREDENTIALS = /([a-z][a-z0-9+.-]*:\/\/[^\s:@/]+:)[^\s@/]+@/giu;
const EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/giu;
const URL_WITH_QUERY = /\bhttps?:\/\/[^\s)\]}>'"]+/giu;

const deliveries = new Map<string, Readonly<{
  promise: Promise<PublicClientErrorReportReceipt | null>;
  expiresAt: number;
}>>();
const deliveryTimes: number[] = [];
const objectEventIds = new WeakMap<object, string>();

export function reportPublicClientError(
  error: unknown,
  context: PublicClientErrorContext,
): Promise<PublicClientErrorReportReceipt | null> {
  if (typeof window === "undefined" || !publicReportingEnabled() || context.operation === "observability.report") {
    return Promise.resolve(null);
  }

  const normalized = normalizePublicError(error);
  if (normalized.message === "") return Promise.resolve(null);

  const now = Date.now();
  prune(now);
  if (!admitLocalDelivery(now)) return Promise.resolve(null);
  const clientEventId = resolveClientEventId(error);
  const existing = deliveries.get(clientEventId);
  if (existing !== undefined && existing.expiresAt > now) return existing.promise;

  const promise = deliver(clientEventId, normalized, context).catch(() => null);
  deliveries.set(clientEventId, Object.freeze({ promise, expiresAt: now + DELIVERY_TTL_MS }));
  trimDeliveries();
  return promise;
}

export function reportPublicApiResponseFailure(
  path: string,
  response: Response,
  method = "GET",
): void {
  if (response.status < 500 || response.status > 599 || isReporterPath(path)) return;
  void reportPublicClientError(
    new Error(`Public API request failed with HTTP ${response.status}`),
    {
      category: "api",
      operation: apiOperation(method, path),
      requestId: validUuid(response.headers.get("x-request-id")),
      errorCode: "HTTP_SERVER_ERROR",
      statusCode: response.status,
      metadata: { phase: "response", action: "request", kind: "server_5xx" },
    },
  );
}

export function reportPublicFetchFailure(
  path: string,
  init: RequestInit,
  error: unknown,
): void {
  if (typeof window === "undefined" || isReporterPath(path)) return;
  const timeout = isTimeoutFailure(init.signal, error);
  const cancelled = init.signal?.aborted === true && !timeout;
  if (cancelled || navigator.onLine === false) return;
  void reportPublicClientError(error, {
    category: "network",
    operation: apiOperation((init.method ?? "GET").toUpperCase(), path),
    errorCode: timeout ? "PUBLIC_CLIENT_TIMEOUT" : "PUBLIC_NETWORK_REQUEST_FAILED",
    metadata: {
      phase: "transport",
      action: "request",
      kind: timeout ? "timeout" : "network_failure",
    },
  });
}

export function reportPublicMalformedResponse(
  path: string,
  response: Response,
  error: unknown,
  method = "GET",
): void {
  if (isReporterPath(path)) return;
  void reportPublicClientError(error, {
    category: "api",
    operation: apiOperation(method, path),
    requestId: validUuid(response.headers.get("x-request-id")),
    errorCode: "PUBLIC_INVALID_SERVER_RESPONSE",
    statusCode: response.status,
    metadata: { phase: "parse", action: "response", kind: "malformed_response" },
  });
}

export function getPublicClientRelease(): string {
  const configured = process.env.NEXT_PUBLIC_APP_RELEASE?.trim();
  const candidate = sanitizeSingleLine(configured === undefined || configured === "" ? "development" : configured, TOKEN_LIMIT);
  return RELEASE_PATTERN.test(candidate) ? candidate : "development";
}

export function sanitizePublicBrowserPathname(pathname: string): string | undefined {
  let candidate = pathname;
  try {
    candidate = new URL(pathname, "http://observability.invalid").pathname;
  } catch {
    candidate = pathname.split(/[?#]/u, 1)[0] ?? "/";
  }
  candidate = sanitizeSingleLine(candidate, PATHNAME_LIMIT);
  if (!candidate.startsWith("/") || candidate.startsWith("//")) return undefined;
  return candidate;
}

function normalizePublicError(error: unknown): Readonly<{ message: string; stack?: string }> {
  if (!(error instanceof Error)) return Object.freeze({ message: "Unexpected public browser error" });
  let rawName = "Error";
  let rawMessage = "";
  let rawStack: string | undefined;
  try {
    rawName = typeof error.name === "string" && error.name !== "" ? error.name : "Error";
    rawMessage = typeof error.message === "string" ? error.message : "";
    rawStack = typeof error.stack === "string" ? error.stack : undefined;
  } catch {
    return Object.freeze({ message: "Unexpected public browser error" });
  }
  const message = sanitizePublicText(rawMessage || rawName, MESSAGE_LIMIT);
  const stack = rawStack === undefined ? undefined : sanitizePublicStack(rawStack);
  return Object.freeze({ message, ...(stack === undefined || stack === "" ? {} : { stack }) });
}

async function deliver(
  clientEventId: string,
  error: Readonly<{ message: string; stack?: string }>,
  context: PublicClientErrorContext,
): Promise<PublicClientErrorReportReceipt | null> {
  const pathname = sanitizePublicBrowserPathname(window.location.pathname);
  const payload = {
    contractVersion: REPORT_CONTRACT_VERSION,
    clientEventId,
    occurredAt: new Date().toISOString(),
    release: getPublicClientRelease(),
    category: context.category,
    message: error.message,
    ...(error.stack === undefined ? {} : { stack: error.stack }),
    ...(pathname === undefined ? {} : { pathname }),
    ...optionalToken("boundary", context.boundary),
    ...optionalToken("operation", context.operation),
    ...(validUuid(context.requestId) === undefined ? {} : { requestId: context.requestId }),
    ...optionalToken("errorCode", context.errorCode),
    ...(validStatus(context.statusCode) ? { statusCode: context.statusCode } : {}),
    ...metadataPayload(context.metadata),
  };

  const response = await fetch(REPORT_PATH, {
    method: "POST",
    credentials: "omit",
    cache: "no-store",
    keepalive: true,
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.status !== 202) return null;
  const json: unknown = await response.json().catch(() => null);
  return parseReceipt(json);
}

function publicReportingEnabled(): boolean {
  return process.env.NEXT_PUBLIC_OBSERVABILITY_PUBLIC_REPORTING_ENABLED !== "false";
}

function admitLocalDelivery(now: number): boolean {
  while (deliveryTimes.length > 0 && (deliveryTimes[0] ?? now) <= now - CLIENT_BURST_WINDOW_MS) deliveryTimes.shift();
  if (deliveryTimes.length >= CLIENT_BURST_LIMIT) return false;
  deliveryTimes.push(now);
  return true;
}

function prune(now: number): void {
  for (const [key, value] of deliveries) if (value.expiresAt <= now) deliveries.delete(key);
}

function trimDeliveries(): void {
  while (deliveries.size > MAX_DELIVERIES) {
    const oldest = deliveries.keys().next().value as string | undefined;
    if (oldest === undefined) break;
    deliveries.delete(oldest);
  }
}

function resolveClientEventId(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    const existing = objectEventIds.get(error);
    if (existing !== undefined) return existing;
    const created = createUuid();
    objectEventIds.set(error, created);
    return created;
  }
  return createUuid();
}

function createUuid(): string {
  const browserCrypto = globalThis.crypto;
  if (typeof browserCrypto?.randomUUID === "function") return browserCrypto.randomUUID();
  const bytes = new Uint8Array(16);
  if (typeof browserCrypto?.getRandomValues === "function") {
    browserCrypto.getRandomValues(bytes);
  } else {
    // clientEventId only drives local/server dedupe and sampling; it is never an auth or trust primitive.
    for (let index = 0; index < bytes.length; index += 1) bytes[index] = Math.floor(Math.random() * 256);
  }
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40;
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80;
  const hex = [...bytes].map((value) => value.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
}

function redactClientSecrets(value: string): string {
  const doubleQuoted = new RegExp(`"(${SENSITIVE_KEY_SOURCE})"\\s*[:=]\\s*"[^"\\r\\n]*"`, "giu");
  const singleQuoted = new RegExp(`'(${SENSITIVE_KEY_SOURCE})'\\s*[:=]\\s*'[^'\\r\\n]*'`, "giu");
  return value
    .replace(doubleQuoted, (_match, key: string) => `"${key}":"[REDACTED]"`)
    .replace(singleQuoted, (_match, key: string) => `'${key}':'[REDACTED]'`)
    .replace(BEARER, "Bearer [REDACTED]")
    .replace(SECRET_ASSIGNMENT, (_match, key: string) => `${key}=[REDACTED]`)
    .replace(URL_CREDENTIALS, "$1[REDACTED]@")
    .replace(EMAIL, "[REDACTED_EMAIL]")
    .replace(URL_WITH_QUERY, (raw) => {
      try {
        const parsed = new URL(raw);
        return `${parsed.origin}${parsed.pathname}`;
      } catch {
        return raw.split(/[?#]/u, 1)[0] ?? raw;
      }
    });
}

function sanitizePublicText(value: string, maxLength: number): string {
  return redactClientSecrets(value).replace(CONTROL_SINGLE_LINE, " ").slice(0, maxLength).trim();
}

function sanitizePublicStack(value: string): string {
  return redactClientSecrets(value)
    .replace(CONTROL_MULTILINE, "")
    .split(/\r?\n/u)
    .slice(0, MAX_STACK_LINES)
    .map((line) => line.slice(0, 1_024))
    .join("\n")
    .slice(0, STACK_LIMIT)
    .trim();
}

function sanitizeSingleLine(value: string, maxLength: number): string {
  return value.replace(CONTROL_SINGLE_LINE, " ").slice(0, maxLength).trim();
}

function optionalToken<K extends "boundary" | "operation" | "errorCode">(
  key: K,
  value: string | undefined,
): Partial<Record<K, string>> {
  if (value === undefined) return {};
  const sanitized = sanitizeSingleLine(value, TOKEN_LIMIT);
  return SAFE_TOKEN_PATTERN.test(sanitized) ? { [key]: sanitized } as Partial<Record<K, string>> : {};
}

function metadataPayload(metadata: PublicClientErrorMetadata | undefined): Readonly<{ metadata?: PublicClientErrorMetadata }> {
  if (metadata === undefined) return {};
  const sanitized: Record<string, string> = {};
  for (const key of ["phase", "action", "kind"] as const) {
    const value = metadata[key];
    if (value === undefined) continue;
    const candidate = sanitizeSingleLine(value, TOKEN_LIMIT);
    if (SAFE_TOKEN_PATTERN.test(candidate)) sanitized[key] = candidate;
  }
  return Object.keys(sanitized).length === 0 ? {} : { metadata: Object.freeze(sanitized) };
}

function apiOperation(method: string, path: string): string {
  const pathname = sanitizePublicBrowserPathname(path) ?? "/api/unknown";
  const operation = `api.${method.toUpperCase()}.${pathname}`.slice(0, TOKEN_LIMIT);
  return SAFE_TOKEN_PATTERN.test(operation) ? operation : "api.request";
}

function isReporterPath(path: string): boolean {
  return sanitizePublicBrowserPathname(path) === REPORT_PATH;
}

function validUuid(value: string | null | undefined): string | undefined {
  return typeof value === "string" && UUID_PATTERN.test(value) ? value : undefined;
}

function validStatus(status: number | undefined): status is number {
  return typeof status === "number" && Number.isInteger(status) && status >= 100 && status <= 599;
}

function isTimeoutFailure(signal: AbortSignal | null | undefined, error: unknown): boolean {
  if (error instanceof DOMException && error.name === "TimeoutError") return true;
  const reason = signal?.reason;
  return reason instanceof DOMException && reason.name === "TimeoutError";
}

function parseReceipt(value: unknown): PublicClientErrorReportReceipt | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (record.accepted !== true || typeof record.requestId !== "string" || !UUID_PATTERN.test(record.requestId)) return null;
  if (record.sampled === false) {
    return Object.freeze({ accepted: true, sampled: false, requestId: record.requestId });
  }
  if (
    record.sampled !== true || typeof record.duplicate !== "boolean" ||
    typeof record.errorId !== "string" || !UUID_PATTERN.test(record.errorId)
  ) return null;
  return Object.freeze({
    accepted: true,
    sampled: true,
    duplicate: record.duplicate,
    errorId: record.errorId,
    requestId: record.requestId,
  });
}
