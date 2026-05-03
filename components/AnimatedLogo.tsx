"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { BrandContent } from "@/lib/getData";

type AnimatedLogoProps = {
  logo: BrandContent["logo"];
  className?: string;
};

const imageSizes =
  "(min-width: 1024px) 544px, (min-width: 640px) 464px, 288px";

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
      <Image
        src={assets.wordmarkDark}
        alt=""
        fill
        quality={62}
        sizes={imageSizes}
        className={`${className} dark:hidden`}
        aria-hidden="true"
        loading="eager"
      />
      <Image
        src={assets.wordmark}
        alt=""
        fill
        quality={62}
        sizes={imageSizes}
        className={`${className} hidden dark:block`}
        aria-hidden="true"
      />
    </>
  );
}

export function AnimatedLogo({ logo, className = "" }: AnimatedLogoProps) {
  const shouldReduceMotion = useReducedMotion();
  const assets = "assets" in logo ? logo.assets : undefined;
  const transitionSrc =
    assets && "transition" in assets ? assets.transition : undefined;

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

  if (!transitionSrc) {
    return (
      <span
        className={`relative block aspect-[2400/1395] w-full ${className}`}
        aria-hidden="true"
      >
        <span className="meraki-logo-clip absolute inset-0 overflow-hidden will-change-[clip-path]">
          <LogoImages
            logo={logo}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </span>
      </span>
    );
  }

  return (
    <span
      className={`relative block aspect-[2400/1395] w-full ${className}`}
      aria-hidden="true"
    >
      <span className="meraki-logo-final absolute inset-0 dark:hidden">
        <Image
          src={assets.wordmarkDark}
          alt=""
          fill
          quality={62}
          sizes={imageSizes}
          className="absolute inset-0 h-full w-full object-contain"
          aria-hidden="true"
        />
      </span>
      <img
        src={transitionSrc}
        alt=""
        className="meraki-logo-transition absolute inset-0 h-full w-full object-contain dark:hidden"
        aria-hidden="true"
        decoding="async"
        loading="eager"
      />
      <span className="meraki-logo-clip absolute inset-0 hidden overflow-hidden will-change-[clip-path] dark:block">
        <LogoImages
          logo={logo}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </span>
    </span>
  );
}
