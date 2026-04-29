import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
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
  title: {
    default: content.artist.brandName,
    template: `%s | ${content.artist.brandName}`
  },
  description: content.artist.intro,
  openGraph: {
    title: content.artist.brandName,
    description: content.artist.intro,
    type: "website"
  }
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
