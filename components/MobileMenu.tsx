"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ArtForm, NavigationContent } from "@/lib/getData";

type MobileMenuProps = {
  isOpen: boolean;
  artForms: ArtForm[];
  navigation: NavigationContent;
  onClose: () => void;
};

export function MobileMenu({
  isOpen,
  artForms,
  navigation,
  onClose
}: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto border-t border-stone-200 bg-white px-4 py-6 shadow-soft sm:top-16 lg:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
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
                    <div className="my-1 ml-3 grid gap-1 border-l border-stone-200 pl-3">
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
                                : "text-stone-600 hover:bg-soft hover:text-clay"
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
