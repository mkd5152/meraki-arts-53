"use client";

import { useEffect, useState } from "react";

export function BrandCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-clay/50 bg-gold/15 mix-blend-multiply transition-transform duration-75 lg:block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
      }}
      aria-hidden="true"
    />
  );
}
