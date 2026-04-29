import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
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
  title: {
    default: content.artist.brandName,
    template: `%s | ${content.artist.brandName}`
  },
  description: content.artist.intro
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={montserrat.variable}>
        <Navbar
          artist={content.artist}
          artForms={content.artForms}
          navigation={content.navigation}
        />
        {children}
        <Footer
          artist={content.artist}
          footer={content.footer}
          links={content.navigation.links}
        />
      </body>
    </html>
  );
}
