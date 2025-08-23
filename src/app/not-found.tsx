"use client";

import Link from 'next/link';
import Image from 'next/image';
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

export default function Custom404() {
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
          404
        </h1>
        <p className={`text-xl mb-8 ${geistMono.className}`}>Page non trouvée</p>
        
        <div className="mt-12">
          <Link 
            href="/" 
            className={`bg-[#ff0028] hover:bg-[#e50023] text-white font-medium py-3 px-6 rounded-full transition duration-300 ${geistSans.className}`}
          >
            Retour au menu
          </Link>
        </div>
      </div>

      {/* Élément décoratif minimaliste - train */}
    </div>
  );
}