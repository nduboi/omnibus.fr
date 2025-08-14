"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const menuCategories = [
  {
    name: "Pizzas Classiques",
    description: "Découvrez nos pizzas artisanales préparées avec des ingrédients frais et de qualité",
    items: [
      {
        name: "Margherita Express",
        description: "Tomate, mozzarella, basilic frais - Le voyage commence ici",
        price: "12€",
        image: "/images/pizza-banner.png",
      },
      {
        name: "Locomotive Pepperoni",
        description: "Tomate, mozzarella, pepperoni, origan",
        price: "14€",
        image: "/images/pizza-banner.png",
      },
      {
        name: "Wagon Quatre Fromages",
        description: "Mozzarella, gorgonzola, parmesan, chèvre",
        price: "15€",
        image: "/images/pizza-banner.png",
      },
      {
        name: "Regina du Rail",
        description: "Tomate, mozzarella, jambon, champignons",
        price: "14€",
        image: "/images/pizza-banner.png",
      },
      {
        name: "Napolitaine Express",
        description: "Tomate, mozzarella, anchois, olives, câpres",
        price: "15€",
        image: "/images/pizza-banner.png",
      },
    ],
  },
  {
    name: "Spécialités L'Omnibus",
    description: "Découvrez nos pizzas artisanales préparées avec des ingrédients frais et de qualité",
    items: [
      {
        name: "Orient Express",
        description: "Tomate, mozzarella, jambon de Parme, roquette, tomates cerises",
        price: "17€",
        image: "/images/pizza-banner.png",
        special: true,
      },
      {
        name: "Trans-Alpin",
        description: "Crème fraîche, mozzarella, saumon fumé, aneth, câpres",
        price: "19€",
        image: "/images/pizza-banner.png",
        special: true,
      },
      {
        name: "Cargo Végétarien",
        description: "Tomate, mozzarella, courgettes, aubergines, poivrons, olives",
        price: "16€",
        image: "/images/pizza-banner.png",
      },
      {
        name: "Locomotive Spicy",
        description: "Tomate, mozzarella, chorizo, poivrons, piment d'Espelette",
        price: "16€",
        image: "/images/pizza-banner.png",
        special: true,
      },
    ],
  },
  {
    name: "Pâtes du Chef",
    description: "Découvrez nos pâtes préparées avec des ingrédients frais et de qualité",
    items: [
      {
        name: "Carbonara du Conducteur",
        description: "Spaghettis, lardons, œuf, parmesan, crème fraîche",
        price: "13€",
        image: "/images/pizza-banner.png",
      },
      {
        name: "Bolognaise Express",
        description: "Tagliatelles, sauce bolognaise maison, parmesan",
        price: "12€",
        image: "/images/pizza-banner.png",
      },
      {
        name: "Penne all'Arrabbiata",
        description: "Penne, tomates, ail, piment, basilic",
        price: "11€",
        image: "/images/pizza-banner.png",
      },
      {
        name: "Lasagnes du Wagon",
        description: "Lasagnes maison, bœuf, béchamel, mozzarella",
        price: "14€",
        image: "/images/pizza-banner.png",
      },
    ],
  },
  {
    name: "Plats Éphémères",
    description: "Découvrez nos créations temporaires préparées avec des ingrédients frais et de qualité",
    items: [
      {
        name: "Pizza du Mois",
        description: "Création unique du chef - Demandez-nous !",
        price: "18€",
        image: "/images/pizza-banner.png",
        special: true,
        ephemeral: true,
      },
      {
        name: "Risotto de Saison",
        description: "Risotto aux légumes de saison et parmesan",
        price: "15€",
        image: "/images/pizza-banner.png",
        ephemeral: true,
      },
      {
        name: "Suggestion du Chef",
        description: "Plat surprise selon l'inspiration du moment",
        price: "16€",
        image: "/images/pizza-banner.png",
        ephemeral: true,
      },
    ],
  },
]

export function Menu() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const currentCategory = menuCategories[activeCategory]
  const itemsPerPage = 3
  const totalPages = Math.ceil(currentCategory.items.length / itemsPerPage)
  const currentItems = currentCategory.items.slice(currentItemIndex, currentItemIndex + itemsPerPage)

  const nextItems = () => {
    if (currentItemIndex + itemsPerPage < currentCategory.items.length) {
      setCurrentItemIndex(currentItemIndex + itemsPerPage)
    }
  }

  const prevItems = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(Math.max(0, currentItemIndex - itemsPerPage))
    }
  }

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index)
    setCurrentItemIndex(0)
    setIsMobileMenuOpen(false)
  }

  return (
    <section id="menu" className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#121619] mb-4">Notre Menu</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">{currentCategory.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          <div className="lg:w-1/4">
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full bg-[#121619] text-white hover:bg-[#303030] justify-between"
              >
                <span>{currentCategory.name}</span>
                <ChevronRight className={`h-4 w-4 transition-transform ${isMobileMenuOpen ? "rotate-90" : ""}`} />
              </Button>
            </div>

            <div
              className={`bg-[#121619] rounded-lg p-4 ${isMobileMenuOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-24`}
            >
              <h3 className="text-white font-semibold mb-4 hidden lg:block">Catégories</h3>
              <div className="space-y-2">
                {menuCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategoryChange(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors text-sm md:text-base ${
                      activeCategory === index
                        ? "bg-red-500 text-white"
                        : "text-gray-300 hover:bg-[#303030] hover:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <h3 className="text-xl md:text-2xl font-semibold text-red-500">{currentCategory.name}</h3>

              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevItems}
                  disabled={currentItemIndex === 0}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600 px-2">
                  {Math.floor(currentItemIndex / itemsPerPage) + 1} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextItems}
                  disabled={currentItemIndex + itemsPerPage >= currentCategory.items.length}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {currentItems.map((item, itemIndex) => (
                <Card
                  key={itemIndex}
                  className="bg-zinc-100 border-slate-300 hover:border-red-500 transition-colors shadow-lg hover:shadow-xl"
                >
                  <div className="relative">
                    <img
                      src={item.image || "/images/pizza-banner.png"}
                      alt={item.name}
                      className="w-full h-40 md:h-48 object-cover rounded-t-lg"
                    />
                    {item.special && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">Spécialité</Badge>
                    )}
                    {item.ephemeral && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-xs">Éphémère</Badge>
                    )}
                  </div>

                  <CardHeader className="p-3 md:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <CardTitle className="text-slate-800 text-base md:text-lg leading-tight">{item.name}</CardTitle>
                      <span className="text-lg md:text-xl font-bold text-red-500 shrink-0">{item.price}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-3 md:p-4 pt-0">
                    <p className="text-slate-600 text-center leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
