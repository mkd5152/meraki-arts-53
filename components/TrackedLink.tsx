"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { trackSiteEvent } from "@/lib/trackEvent";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href"> & {
    trackingEvent?: string;
    trackingProperties?: Record<string, string | number | boolean | null | undefined>;
  };

export function TrackedLink({
  trackingEvent,
  trackingProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (trackingEvent) {
      trackSiteEvent(trackingEvent, trackingProperties);
    }

    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}
