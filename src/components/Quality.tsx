import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import { Award, Leaf, Clock, Heart } from "lucide-react"

const qualityFeatures = [
  {
    icon: Award,
    title: "Ingrédients Premium",
    description: "Nous sélectionnons uniquement les meilleurs ingrédients italiens authentiques pour nos pizzas.",
  },
  {
    icon: Leaf,
    title: "Produits Frais",
    description: "Légumes frais du jour, mozzarella artisanale et herbes aromatiques cultivées localement.",
  },
  {
    icon: Clock,
    title: "Pâte Traditionnelle",
    description: "Notre pâte fermente 24h selon la tradition napolitaine pour une texture parfaite.",
  },
  {
    icon: Heart,
    title: "Fait avec Passion",
    description: "Chaque pizza est préparée avec amour par nos pizzaiolos expérimentés.",
  },
]

export function Quality() {
  return (
    <section id="engagement" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#121619] mb-4">Notre Engagement</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nous nous engageons à vous offrir une expérience culinaire d&apos;exception avec des produits de qualité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {qualityFeatures.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border-gray-200 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-[#121619] mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#121619] mb-4">L&apos;Art de la Pizza Authentique</h3>
              <p className="text-gray-600 mb-4">
                Chez L&apos;Omnibus, nous perpétuons la tradition italienne avec des techniques artisanales transmises de
                génération en génération. Notre four à bois cuit nos pizzas à la perfection.
              </p>
              <p className="text-gray-600">
                Chaque pizza raconte une histoire, celle de notre passion pour la gastronomie italienne et notre
                engagement envers l&apos;excellence culinaire.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/pizza-banner.png"
                alt="Pizza L'Omnibus"
                width={800}
                height={256}
                className="w-full h-64 object-cover rounded-lg"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
