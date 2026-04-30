"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Service } from "@/lib/getData";

type ServiceCardProps = {
  service: Service;
  index: number;
  includesLabel?: string;
};

export function ServiceCard({ service, index, includesLabel }: ServiceCardProps) {
  const image = "image" in service ? service.image : undefined;
  const includes = "includes" in service ? service.includes : undefined;
  const startingFrom =
    "startingFrom" in service ? service.startingFrom : undefined;

  return (
    <motion.article
      className="h-full overflow-hidden rounded-[1.35rem] border border-line bg-panel shadow-sm"
      initial={{ opacity: 0.96, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          <Image
            src={image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        </div>
      )}
      <div className="p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-clay/10 text-sm font-semibold text-clay">
            {String(index + 1).padStart(2, "0")}
          </div>
          {startingFrom && (
            <p className="rounded-full border border-line bg-soft px-3 py-1 text-xs font-semibold text-muted">
              {startingFrom}
            </p>
          )}
        </div>
        <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">
          {service.description}
        </p>
        {includesLabel && includes && includes.length > 0 && (
          <div className="mt-5 border-t border-line pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              {includesLabel}
            </p>
            <ul className="mt-3 grid gap-2">
              {includes.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-soft px-3 py-2 text-sm font-medium text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.article>
  );
}
