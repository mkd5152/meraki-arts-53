import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BrandCursor } from "@/components/BrandCursor";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getContent } from "@/lib/getData";
import {
  buildMetadata,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  jsonLd,
  siteUrl
} from "@/lib/seo";
import "./globals.css";

const content = getContent();
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: content.artist.brandName,
    description: content.artist.intro,
    image: content.brand.logo.assets.socialCard
  }),
  metadataBase: new URL(siteUrl),
  title: {
    default: content.artist.brandName,
    template: `%s | ${content.artist.brandName}`
  },
  applicationName: content.artist.brandName,
  authors: [{ name: content.artist.brandName, url: siteUrl }],
  creator: content.artist.brandName,
  publisher: content.artist.brandName,
  category: "Handmade art and custom gifts",
  icons: {
    icon: "/icon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={montserrat.variable} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([
            buildOrganizationJsonLd(content),
            buildWebsiteJsonLd(content)
          ])}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var m=localStorage.getItem('meraki-theme')||'light';var d=m==='dark'||(m==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.dataset.theme=m}catch(e){}"
          }}
        />
        <ThemeProvider>
          <BrandCursor />
          <Navbar
            artist={content.artist}
            brand={content.brand}
            artForms={content.artForms}
            navigation={content.navigation}
          />
          {children}
          <Footer
            artist={content.artist}
            brand={content.brand}
            footer={content.footer}
            links={content.navigation.links}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
