"use client";

import Button from "@/components/ui/Button";
import { useCookies } from "@/providers/CookiesBannerProvider";

const CookiePreferencesButton = () => {
  const { resetCookieConsent } = useCookies();

  return (
    <Button
      color="blue"
      className="w-full sm:w-fit"
      onClick={resetCookieConsent}
    >
      <i className="bi bi-sliders" aria-hidden="true"></i>
      Cambiar preferencias de cookies
    </Button>
  );
};

export default CookiePreferencesButton;
