"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ArtCardProps = {
  title: string;
  description?: string;
  image: string;
  href?: string;
  onClick?: () => void;
  caption?: string;
  category?: string;
  actionLabel?: string;
  interactionLabel?: string;
};

export function ArtCard({
  title,
  description,
  image,
  href,
  onClick,
  caption,
  category,
  actionLabel,
  interactionLabel
}: ArtCardProps) {
  const cardClassName = `group h-full overflow-hidden rounded-lg border border-stone-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
    onClick ? "cursor-zoom-in" : ""
  }`;
  const cardBody = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Image
          src={image}
          alt={caption || title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        {category && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-sage">
            {category}
          </p>
        )}
        <h3 className="text-xl font-semibold leading-snug text-ink">{title}</h3>
        {description && (
          <p className="mt-3 text-sm leading-6 text-stone-600">{description}</p>
        )}
        {caption && !description && caption !== title && (
          <p className="mt-3 text-sm leading-6 text-stone-600">{caption}</p>
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
        className={`${cardClassName} block w-full p-0 text-left text-inherit outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2`}
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
