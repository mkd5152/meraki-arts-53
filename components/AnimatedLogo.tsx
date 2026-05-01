"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { BrandContent } from "@/lib/getData";

type AnimatedLogoProps = {
  logo: BrandContent["logo"];
  className?: string;
};

function LogoImages({
  logo,
  className
}: {
  logo: BrandContent["logo"];
  className: string;
}) {
  const assets = "assets" in logo ? logo.assets : undefined;

  if (!assets) {
    return null;
  }

  return (
    <>
      <img
        src={assets.wordmarkDark}
        alt=""
        className={`${className} dark:hidden`}
        aria-hidden="true"
        decoding="sync"
        loading="eager"
      />
      <img
        src={assets.wordmark}
        alt=""
        className={`${className} hidden dark:block`}
        aria-hidden="true"
        decoding="sync"
        loading="eager"
      />
    </>
  );
}

export function AnimatedLogo({ logo, className = "" }: AnimatedLogoProps) {
  const shouldReduceMotion = useReducedMotion();
  const assets = "assets" in logo ? logo.assets : undefined;

  if (!assets || shouldReduceMotion) {
    return (
      <span
        className={`relative block aspect-[2400/1395] w-full ${className}`}
        aria-hidden="true"
      >
        <LogoImages
          logo={logo}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={`relative block aspect-[2400/1395] w-full ${className}`}
      aria-hidden="true"
    >
      <motion.span
        className="absolute inset-0 overflow-hidden will-change-[clip-path]"
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ delay: 0.12, duration: 2.15, ease: [0.4, 0, 0.2, 1] }}
      >
        <LogoImages
          logo={logo}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </motion.span>
    </span>
  );
}
