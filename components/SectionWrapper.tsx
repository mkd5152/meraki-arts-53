"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionWrapperProps = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionWrapper({
  eyebrow,
  title,
  intro,
  children,
  className = "",
  contentClassName = ""
}: SectionWrapperProps) {
  return (
    <section className={`px-4 py-14 sm:px-6 sm:py-16 lg:px-8 ${className}`}>
      <motion.div
        className={`mx-auto w-full max-w-6xl ${contentClassName}`}
        initial={{ opacity: 0.96, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {(eyebrow || title || intro) && (
          <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-11">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
