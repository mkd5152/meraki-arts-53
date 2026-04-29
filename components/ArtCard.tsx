"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ArtCardProps = {
  title: string;
  description?: string;
  image: string;
  href?: string;
  onClick?: () => void;
  caption?: string;
  category?: string;
  categoryAccent?: string;
  actionLabel?: string;
  interactionLabel?: string;
  aspectClassName?: string;
  showLens?: boolean;
};

export function ArtCard({
  title,
  description,
  image,
  href,
  onClick,
  caption,
  category,
  categoryAccent,
  actionLabel,
  interactionLabel,
  aspectClassName = "aspect-[4/3]",
  showLens = false
}: ArtCardProps) {
  const [lens, setLens] = useState({ x: 50, y: 50 });
  const cardClassName = `group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-line bg-panel shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
    onClick ? "cursor-zoom-in" : ""
  }`;
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
          alt={caption || title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-70" />
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
        className="flex min-h-[122px] flex-1 flex-col border-t-4 p-5"
        style={{ borderColor: categoryAccent ?? "rgb(var(--color-line))" }}
      >
        {category && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sage">
            {category}
          </p>
        )}
        <h3 className="text-xl font-semibold leading-snug text-ink">{title}</h3>
        {description && (
          <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        )}
        {caption && !description && caption !== title && (
          <p className="mt-3 text-sm leading-6 text-muted">{caption}</p>
        )}
        {actionLabel && (
          <p className="mt-5 text-sm font-semibold text-clay">{actionLabel}</p>
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
        aria-label={interactionLabel ? `${interactionLabel}: ${title}` : title}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {cardBody}
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
