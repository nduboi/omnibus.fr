import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bowlbyOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
