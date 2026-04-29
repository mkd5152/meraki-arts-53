"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type {
  Artist,
  ArtForm,
  BrandContent,
  NavigationContent
} from "@/lib/getData";
import { LogoMark } from "@/components/LogoMark";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeProvider";

type NavbarProps = {
  artist: Artist;
  brand: BrandContent;
  artForms: ArtForm[];
  navigation: NavigationContent;
};

export function Navbar({ brand, artForms, navigation }: NavbarProps) {
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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-soft/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
          <Link
            href="/"
            className="min-w-0 shrink-0"
          >
            <LogoMark logo={brand.logo} />
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
                          : "text-muted hover:bg-panel hover:text-ink"
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isWorkOpen}
                    >
                      {link.label}
                    </Link>
                    {isWorkOpen && (
                      <div className="absolute left-0 top-full w-72 rounded-lg border border-line bg-panel p-2 shadow-soft">
                        <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                          {navigation.workDropdownLabel}
                        </p>
                        {artForms.map((artForm) => (
                          <Link
                            key={artForm.id}
                            href={`/art/${artForm.slug}`}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-soft hover:text-clay"
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
                      : "text-muted hover:bg-panel hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle theme={brand.theme} />
            </div>
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-panel text-ink shadow-sm lg:hidden"
              aria-label={isOpen ? navigation.closeMenuLabel : navigation.openMenuLabel}
              aria-expanded={isOpen}
            >
              <span className="grid gap-1.5">
                <span
                  className={`block h-0.5 w-5 rounded-full bg-ink transition ${
                    isOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-ink transition ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-ink transition ${
                    isOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        isOpen={isOpen}
        brand={brand}
        artForms={artForms}
        navigation={navigation}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
