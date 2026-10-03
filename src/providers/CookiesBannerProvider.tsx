"use client";

import CookiesBanner from "@/components/ui/CookiesBanner";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type CookieConsentStatus = "accepted" | "rejected" | null;

type CookiesContextValue = {
  consent: CookieConsentStatus;
  hasResponded: boolean;
  canUseOptionalCookies: boolean;
  acceptCookies: () => void;
  rejectCookies: () => void;
  resetCookieConsent: () => void;
};

type Props = {
  children: React.ReactNode;
};

const CONSENT_COOKIE_NAME = "proyecta-konscio-cookie-consent";
const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const CookiesContext = createContext<CookiesContextValue | null>(null);
const consentListeners = new Set<() => void>();

const subscribeToConsent = (listener: () => void) => {
  consentListeners.add(listener);

  return () => {
    consentListeners.delete(listener);
  };
};

const notifyConsentListeners = () => {
  consentListeners.forEach((listener) => {
    listener();
  });
};

const subscribeToHydration = () => () => {};
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

const readConsentCookie = (): CookieConsentStatus => {
  const consentCookie = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!consentCookie) return null;

  const value = decodeURIComponent(consentCookie.split("=")[1] ?? "");
  return value === "accepted" || value === "rejected" ? value : null;
};

const writeConsentCookie = (value: Exclude<CookieConsentStatus, null>) => {
  const secureAttribute =
    window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax${secureAttribute}`;
};

const deleteConsentCookie = () => {
  const secureAttribute =
    window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${CONSENT_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secureAttribute}`;
};

const CookiesBannerProvider = (props: Props) => {
  const { children } = props;
  const consent = useSyncExternalStore(
    subscribeToConsent,
    readConsentCookie,
    () => null,
  );
  const isInitialized = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );

  const acceptCookies = useCallback(() => {
    writeConsentCookie("accepted");
    notifyConsentListeners();
  }, []);

  const rejectCookies = useCallback(() => {
    writeConsentCookie("rejected");
    notifyConsentListeners();
  }, []);

  const resetCookieConsent = useCallback(() => {
    deleteConsentCookie();
    notifyConsentListeners();
  }, []);

  const value = useMemo<CookiesContextValue>(
    () => ({
      consent,
      hasResponded: consent !== null,
      canUseOptionalCookies: consent === "accepted",
      acceptCookies,
      rejectCookies,
      resetCookieConsent,
    }),
    [acceptCookies, consent, rejectCookies, resetCookieConsent],
  );

  return (
    <CookiesContext.Provider value={value}>
      {children}
      {isInitialized && consent === null ? (
        <CookiesBanner
          onAccept={acceptCookies}
          onReject={rejectCookies}
        />
      ) : null}
    </CookiesContext.Provider>
  );
};

export const useCookies = () => {
  const context = useContext(CookiesContext);

  if (!context) {
    throw new Error(
      "useCookies must be used within CookiesBannerProvider.",
    );
  }

  return context;
};

export default CookiesBannerProvider;
