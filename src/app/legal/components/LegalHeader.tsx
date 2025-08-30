"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function LegalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--card)]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Titre */}
        <div className="flex items-center gap-3">
          <img src="/images/logo-complete.png" alt="L'Omnibus Logo" className="h-16 w-16 object-contain" />
          <h1 className="text-xl md:text-2xl font-bold text-[var(--foreground)]">Mentions légales</h1>
        </div>

        {/* Desktop Right Button */}
        <div className="hidden md:flex">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-[var(--foreground)]"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
            Retour
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-[var(--foreground)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-2 pb-4 border-t border-[var(--card)] pt-2">
          <div className="flex flex-col gap-3 px-4">
            <Button
              variant="ghost"
              className="text-left text-[var(--foreground)]"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
