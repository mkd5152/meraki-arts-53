import Link from "next/link";
import type { Artist, Content, NavigationContent } from "@/lib/getData";

type FooterProps = {
  artist: Artist;
  footer: Content["footer"];
  links: NavigationContent["links"];
};

export function Footer({ artist, footer, links }: FooterProps) {
  return (
    <footer className="border-t border-stone-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Link href="/" className="text-lg font-semibold text-ink">
            {artist.brandName}
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-stone-600">
            {footer.description}
          </p>
          <p className="mt-6 text-xs text-stone-400">
            {new Date().getFullYear()} {footer.copyright}
          </p>
        </div>
        <div className="grid gap-3 sm:justify-end">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
            {footer.linksTitle}
          </p>
          <div className="grid gap-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-clay"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href={footer.contactHref}
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-white hover:bg-clay"
          >
            {footer.contactLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
