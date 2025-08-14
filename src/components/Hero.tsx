"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToMenu = () => {
    const element = document.getElementById("menu")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121619] to-[#303030]">
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6 md:mb-8">
          <img src="/images/logo-complete.png" alt="L'Omnibus" className="h-32 w-32 md:h-48 md:w-48 object-contain" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
          Bienvenue chez
          <span className="block text-red-500">L'Omnibus</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
          Découvrez nos pizzas artisanales et pâtes préparées avec des ingrédients frais et de qualité dans notre
          pizzeria au thème ferroviaire.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
          <Button
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto"
            onClick={scrollToMenu}
          >
            Découvrir notre menu
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-transparent w-full sm:w-auto"
            onClick={() => window.open("tel:+33123456789")}
          >
            Nous appeler
          </Button>
        </div>
      </div>
    </section>
  )
}
