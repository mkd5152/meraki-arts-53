"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/getData";

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.article
      className="h-full rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
      initial={{ opacity: 0.96, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-clay/10 text-sm font-semibold text-clay">
        {String(index + 1).padStart(2, "0")}
      </div>
      <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        {service.description}
      </p>
    </motion.article>
  );
}
