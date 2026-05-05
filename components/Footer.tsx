import Link from "next/link";
import type {
  Artist,
  BrandContent,
  Content,
  NavigationContent
} from "@/lib/getData";
import { LogoMark } from "@/components/LogoMark";
import { TrackedLink } from "@/components/TrackedLink";

type FooterProps = {
  artist: Artist;
  brand: BrandContent;
  footer: Content["footer"];
  links: NavigationContent["links"];
};

const isExternalHref = (href: string) => href.startsWith("http");
const getContactTrackingEvent = (href: string, label: string) => {
  const normalized = `${href} ${label}`.toLowerCase();

  if (normalized.includes("wa.me") || normalized.includes("whatsapp")) {
    return "whatsapp_click";
  }

  if (normalized.includes("instagram")) {
    return "instagram_click";
  }

  if (normalized.includes("mailto:")) {
    return "email_click";
  }

  if (normalized.includes("tel:")) {
    return "phone_click";
  }

  return "outbound_click";
};

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
          <p className="mt-6 text-xs text-muted">
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
              <TrackedLink
                key={link.label}
                href={link.href}
                target={isExternalHref(link.href) ? "_blank" : undefined}
                rel={isExternalHref(link.href) ? "noreferrer" : undefined}
                className="text-sm font-medium text-muted hover:text-clay"
                trackingEvent={getContactTrackingEvent(link.href, link.label)}
                trackingProperties={{
                  source: "footer",
                  label: link.label,
                  href: link.href
                }}
              >
                {link.label}
              </TrackedLink>
            ))}
          </div>
          <TrackedLink
            href={footer.contactHref}
            className="mt-2 inline-flex min-h-11 items-center justify-center rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-paper hover:bg-clay"
            trackingEvent="contact_click"
            trackingProperties={{ source: "footer" }}
          >
            {footer.contactLabel}
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}
