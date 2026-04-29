import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { BrandCursor } from "@/components/BrandCursor";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getContent } from "@/lib/getData";
import "./globals.css";

const content = getContent();
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meraki-arts-53.vercel.app"),
  title: {
    default: content.artist.brandName,
    template: `%s | ${content.artist.brandName}`
  },
  description: content.artist.intro,
  icons: {
    icon: "/icon.png"
  },
  openGraph: {
    title: content.artist.brandName,
    description: content.artist.intro,
    type: "website",
    images: [
      {
        url: content.brand.logo.assets.socialCard,
        width: 3400,
        height: 1500,
        alt: content.artist.brandName
      }
    ]
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
      <body className={montserrat.variable}>
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
      </body>
    </html>
  );
}
