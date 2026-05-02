import Link from "next/link";
import type {
  Artist,
  BrandContent,
  Content,
  NavigationContent
} from "@/lib/getData";
import { LogoMark } from "@/components/LogoMark";

type FooterProps = {
  artist: Artist;
  brand: BrandContent;
  footer: Content["footer"];
  links: NavigationContent["links"];
};

const isExternalHref = (href: string) => href.startsWith("http");

export function Footer({ brand, footer, links }: FooterProps) {
  return (
    <footer className="border-t border-line bg-panel px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.55fr_0.55fr]">
        <div>
          <Link href="/" className="inline-flex">
            <LogoMark logo={brand.logo} footer />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted">
            {footer.description}
          </p>
          <p className="mt-6 text-xs text-muted/70">
            {footer.copyrightYear} {footer.copyright}
          </p>
        </div>
        <div className="grid content-start gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {footer.linksTitle}
          </p>
          <div className="grid gap-2">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-clay"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {footer.socialTitle}
          </p>
          <div className="grid gap-2">
            {brand.social.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={isExternalHref(link.href) ? "_blank" : undefined}
                rel={isExternalHref(link.href) ? "noreferrer" : undefined}
                className="text-sm font-medium text-muted hover:text-clay"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href={footer.contactHref}
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-paper hover:bg-clay"
          >
            {footer.contactLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
