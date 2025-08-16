"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useCategories, useBadges } from "@/hooks/use-firebase-data"

interface MenuItem {
  id: string
  name: string
  description: string
  ingredients: string[]
  price: number
  imageUrl?: string
  available: boolean
  badges?: string[]
}

export function Menu() {
  const { categories, loading, error } = useCategories()
  const { badges } = useBadges()
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [currentPageIndex, setCurrentPageIndex] = useState(1)

  console.log("[v0] Menu component - badges from hook:", badges)
  console.log("[v0] Menu component - categories:", categories)

  if (loading) {
    return (
      <section id="menu" className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#121619] mb-4">Notre Menu</h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            <span className="ml-2 text-gray-600">Chargement du menu...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || categories.length === 0) {
    return (
      <section id="menu" className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#121619] mb-4">Notre Menu</h2>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">{error || "Aucune catégorie disponible pour le moment."}</p>
          </div>
        </div>
      </section>
    )
  }

  const currentCategory = categories[activeCategory]
  const menuItems = currentCategory.menuItems
  const totalItems = menuItems.length

  const itemsPerPage = 3
  const getCurrentItems = () => {
    if (totalItems <= itemsPerPage) {
      return menuItems
    }

    const items = []
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentItemIndex + i) % totalItems
      items.push(menuItems[index])
    }
    return items
  }

  const currentItems = getCurrentItems()

  const nextItem = () => {
    if (currentItemIndex < totalItems - itemsPerPage) {
      setCurrentItemIndex(currentItemIndex + 1)
      setCurrentPageIndex(currentPageIndex + 1)
    }
  }

  const prevItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1)
      setCurrentPageIndex(currentPageIndex - 1)
    }
  }

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index)
    setCurrentItemIndex(0)
  }

  const getCategoryDescription = (categoryName: string) => {
    if (categoryName.toLowerCase().includes("pizza")) {
      return "Découvrez nos pizzas artisanales préparées avec des ingrédients frais et de qualité"
    } else if (categoryName.toLowerCase().includes("pâte")) {
      return "Découvrez nos pâtes préparées avec des ingrédients frais et de qualité"
    } else if (categoryName.toLowerCase().includes("éphémère")) {
      return "Découvrez nos créations temporaires préparées avec des ingrédients frais et de qualité"
    }
    return "Découvrez nos spécialités préparées avec des ingrédients frais et de qualité"
  }

  const formatPrice = (price: number) => {
    return price.toFixed(2)
  }

  const getItemBadges = (itemBadges?: string[]) => {
    console.log("[v0] Getting badges for item with badge names:", itemBadges)
    console.log("[v0] Available badges:", badges)

    if (!itemBadges || itemBadges.length === 0) {
      console.log("[v0] No badge names for this item")
      return []
    }

    const matchedBadges = itemBadges
      .map((badgeName) => {
        const badge = badges.find((badge) => badge.name === badgeName)
        console.log("[v0] Looking for badge name:", badgeName, "Found:", badge)
        return badge
      })
      .filter((badge) => badge !== undefined)

    console.log("[v0] Matched badges for item:", matchedBadges)
    return matchedBadges
  }

  return (
    <section id="menu" className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#121619] mb-4">Notre Menu</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {getCategoryDescription(currentCategory.name)}
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          <div className="w-full">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
              {categories.map((category, index) => (
                <Button
                  key={category.id}
                  onClick={() => handleCategoryChange(index)}
                  variant={activeCategory === index ? "default" : "outline"}
                  className={`
                    px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200
                    ${
                      activeCategory === index
                        ? "bg-red-500 text-white hover:bg-red-600 shadow-lg"
                        : "bg-white text-[#121619] border-2 border-gray-300 hover:border-red-500 hover:text-red-500"
                    }
                  `}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-red-500">{currentCategory.name}</h3>
              </div>

              {totalItems > itemsPerPage && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevItem}
                    disabled={currentItemIndex === 0}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600 px-2">
                    {Math.floor(currentPageIndex)} / {Math.ceil(totalItems / itemsPerPage)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextItem}
                    disabled={currentItemIndex >= totalItems - itemsPerPage}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {totalItems > 0 && currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((item, index) => {
                  console.log("[v0] Rendering item:", item.name, "with badges:", item.badges)
                  const itemBadges = getItemBadges(item.badges)

                  return (
                    <Card
                      key={`${item.id}-${currentItemIndex}-${index}`}
                      className={`bg-zinc-100 border-slate-300 hover:border-red-500 transition-colors shadow-lg hover:shadow-xl ${index === 0 ? "ring-2 ring-red-500" : ""}`}
                    >
                      <div className="relative">
                        <img
                          src={item.imageUrl || "/images/pizza-banner.png"}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {itemBadges.length > 0 && (
                          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                            {itemBadges.map((badge) => (
                              <span
                                key={badge.id}
                                className="px-2 py-1 text-xs font-medium rounded-full text-white shadow-sm"
                                style={{ backgroundColor: badge.color }}
                              >
                                {badge.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start gap-2">
                          <CardTitle className="text-slate-800 text-lg leading-tight">{item.name}</CardTitle>
                          <span className="text-xl font-bold text-red-500 shrink-0">{formatPrice(item.price)}€</span>
                        </div>
                      </CardHeader>

                      <CardContent className="p-4 pt-0">
                        <p className="text-slate-600 text-center leading-relaxed mb-3">{item.description}</p>

                        {item.ingredients && item.ingredients.length > 0 && (
                          <div className="text-center">
                            <p className="text-sm text-slate-500 italic">{item.ingredients.join(", ")}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Aucun plat disponible dans cette catégorie.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
