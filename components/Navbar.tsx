"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Artist, ArtForm, NavigationContent } from "@/lib/getData";
import { MobileMenu } from "@/components/MobileMenu";

type NavbarProps = {
  artist: Artist;
  artForms: ArtForm[];
  navigation: NavigationContent;
};

export function Navbar({ artist, artForms, navigation }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/70 bg-soft/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-base font-semibold tracking-wide text-ink"
          >
            {artist.brandName}
          </Link>

          <nav className="hidden items-center gap-2 lg:flex xl:gap-3">
            {navigation.links.map((link) => {
              const isActive = link.hasDropdown
                ? pathname.startsWith("/art/")
                : pathname === link.href;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsWorkOpen(true)}
                    onMouseLeave={() => setIsWorkOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-semibold transition ${
                        isActive
                          ? "text-clay"
                          : "text-stone-700 hover:bg-white hover:text-ink"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isWorkOpen}
                    >
                      {link.label}
                    </Link>
                    {isWorkOpen && (
                      <div className="absolute left-0 top-full w-64 rounded-lg border border-stone-200 bg-white p-2 shadow-soft">
                        <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                          {navigation.workDropdownLabel}
                        </p>
                        {artForms.map((artForm) => (
                          <Link
                            key={artForm.id}
                            href={`/art/${artForm.slug}`}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-700 hover:bg-soft hover:text-clay"
                          >
                            {artForm.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-semibold transition ${
                    isActive
                      ? "text-clay"
                      : "text-stone-700 hover:bg-white hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-ink bg-ink text-white shadow-sm lg:hidden"
            aria-label={isOpen ? navigation.closeMenuLabel : navigation.openMenuLabel}
            aria-expanded={isOpen}
          >
            <span className="grid gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-white transition ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>
      <MobileMenu
        isOpen={isOpen}
        artForms={artForms}
        navigation={navigation}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
