"use client"

import Image from "next/image";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#121619] border-b border-[#303030]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
          <Image
            src="/images/logo-complete.png"
            alt="L'Omnibus Logo"
            width={64}  // h-16/w-16 = 4rem = 64px
            height={64}
            className="h-16 w-16 object-contain"
          />
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("menu")} className="text-white hover:text-red-500 transition-colors">
              Menu
            </button>
            <button
              onClick={() => scrollToSection("engagement")}
              className="text-white hover:text-red-500 transition-colors"
            >
              Notre engagement
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="text-white hover:text-red-500 transition-colors"
            >
              Localisation
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-red-500 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="text-white hover:text-red-500 transition-colors"
            >
              Avis
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[#303030] pt-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("menu")}
                className="text-left text-white hover:text-red-500 transition-colors"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection("engagement")}
                className="text-left text-white hover:text-red-500 transition-colors"
              >
                Notre engagement
              </button>
              <button
                onClick={() => scrollToSection("location")}
                className="text-left text-white hover:text-red-500 transition-colors"
              >
                Localisation
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-white hover:text-red-500 transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-left text-white hover:text-red-500 transition-colors"
              >
                Avis
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
