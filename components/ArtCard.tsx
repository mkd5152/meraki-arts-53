"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ArtCardProps = {
  title: string;
  description?: string;
  image: string;
  altText?: string;
  href?: string;
  onClick?: () => void;
  caption?: string;
  category?: string;
  categoryAccent?: string;
  referenceId?: string;
  actionLabel?: string;
  interactionLabel?: string;
  aspectClassName?: string;
  showLens?: boolean;
  stableBody?: boolean;
};

export function ArtCard({
  title,
  description,
  image,
  altText,
  href,
  onClick,
  caption,
  category,
  categoryAccent,
  referenceId,
  actionLabel,
  interactionLabel,
  aspectClassName = "aspect-[4/3]",
  showLens = false,
  stableBody = false
}: ArtCardProps) {
  const [lens, setLens] = useState({ x: 50, y: 50 });
  const cardClassName = `group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-line bg-panel shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
    onClick ? "cursor-zoom-in" : ""
  }`;
  const detailText = description ?? (caption && caption !== title ? caption : "");
  const cardBody = (
    <>
      <div
        className={`relative shrink-0 overflow-hidden bg-mist ${aspectClassName}`}
        onPointerMove={(event) => {
          if (!showLens) {
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();
          setLens({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100
          });
        }}
      >
        <Image
          src={image}
          alt={altText || caption || title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-70" />
        {referenceId && (
          <span className="absolute left-3 top-3 z-10 rounded-full border border-paper/35 bg-ink/72 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-paper shadow-sm backdrop-blur">
            {referenceId}
          </span>
        )}
        {stableBody && detailText && (
          <p className="pointer-events-none absolute inset-x-3 bottom-3 z-20 line-clamp-3 translate-y-2 rounded-2xl border border-paper/20 bg-ink/82 px-4 py-3 text-left text-sm leading-6 text-paper opacity-0 shadow-soft backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {detailText}
          </p>
        )}
        {showLens && (
          <div
            className="pointer-events-none absolute hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/80 bg-cover bg-no-repeat opacity-0 shadow-frame ring-4 ring-ink/10 transition group-hover:opacity-100 lg:block"
            style={{
              left: `${lens.x}%`,
              top: `${lens.y}%`,
              backgroundImage: `url(${image})`,
              backgroundPosition: `${lens.x}% ${lens.y}%`,
              backgroundSize: "230%"
            }}
            aria-hidden="true"
          />
        )}
      </div>
      <div
        className={`flex flex-col overflow-hidden border-t-4 p-5 ${
          stableBody
            ? "h-[9.75rem] shrink-0 sm:h-[9.25rem]"
            : "min-h-[122px] flex-1"
        }`}
        style={{ borderColor: categoryAccent ?? "rgb(var(--color-line))" }}
      >
        {category && (
          <p className="mb-2 shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-sage">
            {category}
          </p>
        )}
        <h3
          className={`shrink-0 text-xl font-semibold leading-snug text-ink ${
            stableBody ? "line-clamp-2 min-h-[3.5rem]" : ""
          }`}
        >
          {title}
        </h3>
        {stableBody ? (
          <span className="sr-only">{detailText}</span>
        ) : (
          <>
            {description && (
              <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
            )}
            {caption && !description && caption !== title && (
              <p className="mt-3 text-sm leading-6 text-muted">{caption}</p>
            )}
          </>
        )}
        {actionLabel && (
          <p
            className={`text-sm font-semibold text-clay ${
              stableBody ? "mt-auto" : "mt-5"
            }`}
          >
            {actionLabel}
          </p>
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className={`${cardClassName} block w-full p-0 text-left text-inherit outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-paper`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {cardBody}
        {interactionLabel && (
          <span className="sr-only">{interactionLabel}</span>
        )}
      </motion.button>
    );
  }

  const content = (
    <motion.article
      className={cardClassName}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {cardBody}
    </motion.article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
