"use client";

import { track } from "@vercel/analytics";

type EventProperties = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const conversionTargets: Record<string, string | undefined> = {
  contact_form_submit: process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_CONVERSION,
  whatsapp_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION,
  instagram_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_INSTAGRAM_CONVERSION
};

const cleanProperties = (properties: EventProperties) =>
  Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined && value !== null)
  ) as Record<string, string | number | boolean>;

export function trackSiteEvent(
  eventName: string,
  properties: EventProperties = {}
) {
  const eventProperties = cleanProperties(properties);

  track(eventName, eventProperties);

  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", eventName, eventProperties);

  const conversionTarget = conversionTargets[eventName];

  if (conversionTarget) {
    window.gtag?.("event", "conversion", {
      send_to: conversionTarget
    });
  }
}
