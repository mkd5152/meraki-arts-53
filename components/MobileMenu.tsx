"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ArtForm, BrandContent, NavigationContent } from "@/lib/getData";
import { LogoMark } from "@/components/LogoMark";
import { ThemeToggle } from "@/components/ThemeProvider";

type MobileMenuProps = {
  isOpen: boolean;
  brand: BrandContent;
  artForms: ArtForm[];
  navigation: NavigationContent;
  onClose: () => void;
};

export function MobileMenu({
  isOpen,
  brand,
  artForms,
  navigation,
  onClose
}: MobileMenuProps) {
  const pathname = usePathname();
  const workLinkLabel =
    navigation.links.find((link) => link.hasDropdown)?.label ?? null;
  const [openDropdown, setOpenDropdown] = useState<string | null>(
    pathname.startsWith("/art/") ? workLinkLabel : null
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-paper px-4 py-5 shadow-soft sm:top-[4.5rem] lg:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <div className="mx-auto mb-5 flex max-w-6xl items-center justify-between gap-4 rounded-lg border border-line bg-panel p-3">
            <LogoMark logo={brand.logo} compact />
            <ThemeToggle theme={brand.theme} />
          </div>
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 pb-10">
            {navigation.links.map((link) => {
              const isActive = link.hasDropdown
                ? pathname === link.href ||
                  pathname.startsWith(`${link.href}/`) ||
                  pathname.startsWith("/art/")
                : link.href === "/"
                  ? pathname === link.href
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown((current) =>
                            current === link.label ? null : link.label
                          )
                        }
                        className={`flex min-h-12 w-full items-center justify-between rounded-lg px-3 text-left text-base font-semibold transition ${
                          isActive
                            ? "bg-soft text-clay"
                            : "text-ink hover:bg-soft"
                        }`}
                        aria-expanded={openDropdown === link.label}
                      >
                        <span>{link.label}</span>
                        <span
                          aria-hidden="true"
                          className={`text-sm transition ${
                            openDropdown === link.label ? "rotate-180" : ""
                          }`}
                        >
                          v
                        </span>
                      </button>
                      {openDropdown === link.label && (
                        <div className="my-1 ml-3 grid gap-1 border-l border-line pl-3">
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className={`flex min-h-10 items-center rounded-lg px-3 text-sm font-semibold transition ${
                              pathname === link.href
                                ? "bg-soft text-clay"
                                : "text-ink hover:bg-soft hover:text-clay"
                            }`}
                          >
                            {navigation.allWorkLabel}
                          </Link>
                          <div className="my-1 h-px bg-line" />
                          {artForms.map((artForm) => {
                            const artHref = `/art/${artForm.slug}`;
                            const isArtActive = pathname === artHref;

                            return (
                              <Link
                                key={artForm.id}
                                href={artHref}
                                onClick={onClose}
                                className={`flex min-h-10 items-center rounded-lg px-3 text-sm font-medium transition ${
                                  isArtActive
                                    ? "bg-soft text-clay"
                                    : "text-muted hover:bg-soft hover:text-clay"
                                }`}
                              >
                                {artForm.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`flex min-h-12 items-center rounded-lg px-3 text-base font-semibold transition ${
                        isActive
                          ? "bg-soft text-clay"
                          : "text-ink hover:bg-soft"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
