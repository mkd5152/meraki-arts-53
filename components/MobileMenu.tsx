"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
                ? pathname.startsWith("/art/")
                : pathname === link.href;

              return (
                <div key={link.label}>
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
                  {link.hasDropdown && (
                    <div className="my-1 ml-3 grid gap-1 border-l border-line pl-3">
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
                </div>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
