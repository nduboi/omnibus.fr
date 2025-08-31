// src/app/offline/page.tsx
"use client"
import Image from "next/image"
import Link from "next/link"

import { Geist, Geist_Mono, Bowlby_One } from 'next/font/google';

// Configuration des polices
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

export default function offlinePage() {
  return (
    <div className={`min-h-screen bg-[#191c1f] text-white flex flex-col items-center justify-center px-4 ${geistSans.variable} ${geistMono.variable} ${bowlbyOne.variable}`}>
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <Image 
          src="/images/logo-complete.png" 
          alt="Pizzeria Express" 
          width={120} 
          height={120} 
        />
      </div>

      <div className="text-center">
        <h1 className={`text-[120px] md:text-[180px] font-bold text-[#ff0028] mb-2 ${bowlbyOne.className}`}>
          Offline
        </h1>
        <p className={`text-xl mb-8 ${geistMono.className}`}>Vous êtes déconecter</p>
      </div>

      {/* Élément décoratif minimaliste - train */}
    </div>
  );
}
