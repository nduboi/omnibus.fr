import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Bowlby_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bowlbyOne = Bowlby_One({
  variable: "--font-bowlby-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Omnibus",
  description: "Bienvenu(e) à l'Omnibus",
  icons: {
    icon: "/favicon.ico?favicon.48e434e3.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-F4PW7S6YSX"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F4PW7S6YSX');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bowlbyOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}