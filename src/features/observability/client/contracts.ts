export type PublicClientErrorCategory =
  | "render"
  | "unhandled_error"
  | "unhandled_rejection"
  | "network"
  | "api"
  | "unknown";

export type PublicClientErrorMetadata = Readonly<{
  phase?: string;
  action?: string;
  kind?: string;
}>;

export type PublicClientErrorContext = Readonly<{
  category: PublicClientErrorCategory;
  boundary?: string;
  operation?: string;
  requestId?: string;
  errorCode?: string;
  statusCode?: number;
  metadata?: PublicClientErrorMetadata;
}>;

export type PublicClientErrorReportReceipt =
  | Readonly<{
      accepted: true;
      sampled: false;
      requestId: string;
    }>
  | Readonly<{
      accepted: true;
      sampled: true;
      duplicate: boolean;
      errorId: string;
      requestId: string;
    }>;
