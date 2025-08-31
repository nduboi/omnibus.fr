import type { Metadata } from "next";
import Script from "next/script";
import Watermark from "@/components/Watermark";
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
  title: "L'omnibus",
  description: "Bienvenu(e) à l'omnibus, bar-restaurant-pizzeria à Chantonnay, France. Découvrez notre menu, réservez une table et contactez-nous.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="fr">
      <head>
        <meta name="apple-mobile-web-app-title" content="L'omnibus" />
        <Script id="serviceWorker">
            {`
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                  .then((reg) => console.log('Service Worker registered:', reg))
                  .catch((err) => console.log('Service Worker registration failed:', err));
              }
            `}
        </Script>
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
        <Watermark />
      </body>
    </html>
  );
}