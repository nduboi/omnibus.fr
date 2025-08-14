"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useState } from "react"

const reviews = [
  {
    name: "Linda Turquand",
    rating: 5,
    comment:
      "Nous avons été super bien accueilli, le personnel est adorable. Restaurant adaptée avec un bébé. La cuisine est très bonne avec des produits de qualités qui viennent de commerçant du coin.Je recommande!",
    date: "Il y a 1 mois",
  },
  {
    name: "Laura Crine",
    rating: 5,
    comment:
      "Un perfect ! En grande maniaque du service bien fait ; voilà un établissement exemplaire. Le repas enfant servie très rapidement, l'apéritif, les plats ont suivis, on commande un verre, on nous le sers en quelques minutes, on finit la carafe d'eau on la change instantanément, on nous demande si ça va, sans camper à la table non plus, c'était juste parfait. Et en prime évidement, tout le monde s'est régalés, très bonnes pizzas, dommage qu'on habite à 500km car on serait venu plus souvent, en attendant, aux personnes qui me lisent, venez ! Merci et félicitation à cet établissement, à son gérant et à son équipe 🫶",
    date: "Il y a 3 semaines",
  },
  {
    name: "Amelie Tetaud",
    rating: 5,
    comment:
      "Belle découverte! On ne m'en disant que du bien et je confirme. Personnel sympa et plat (pizza) très bon. Je vous le recommande.",
    date: "Il y a 1 semaine",
  },
  {
    name: "Justine Motti",
    rating: 5,
    comment:
      "Nous sommes de la haute Marne nous sommes de passage et nous avons été conquis par ce restaurant. Amabilité, service rapide, gustativement parlant c'est très bon. Nous sommes souvent dans le coin nous y retournerons !",
    date: "Il y a 1 semaine",
  },
  {
    name: "Maxx Mc",
    rating: 5,
    comment:
      "Excellent !! Très bonne pizzeria bien située facile pour se garer au parking de la gare. Accueil irréprochable, service impeccable, carte délicieuse et pizza savoureuses. Que dire de plus ?! Juste très satisfaisant !",
    date: "Il y a 2 mois",
  },
  {
    name: "Karine Mouchard",
    rating: 5,
    comment:
      "Moment très agréable, service parfait. Serveuse souriante et agréable. Apéro et tapas vraiment bon, ma pizza était excellente avec une pâte fine, au top 👍 Je reviendrais sans problème.",
    date: "Il y a 2 ans",
  },
]

function ReviewCard({ review, index }: { review: (typeof reviews)[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const maxLength = 150
  const shouldTruncate = review.comment.length > maxLength

  const displayComment = shouldTruncate && !isExpanded ? review.comment.slice(0, maxLength) + "..." : review.comment

  return (
    <Card key={index} className="bg-card border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Quote className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-card-foreground">{review.name}</h4>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-card-foreground/80 mb-3 leading-relaxed">
              {displayComment}
              {shouldTruncate && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2 text-primary hover:text-primary/80 font-medium text-sm underline"
                >
                  {isExpanded ? "Voir moins" : "Voir plus"}
                </button>
              )}
            </p>
            <p className="text-sm text-card-foreground/60">{review.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function Reviews() {
  const averageRating = 4.7

  return (
    <section id="reviews" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Avis de nos Clients</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${star <= averageRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-xl font-semibold text-foreground">4.7/5</span>
            <span className="text-foreground/60">(+770 avis)</span>
          </div>
          <p className="text-xl text-foreground/80">Découvrez ce que nos clients pensent de L'ombinus</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-foreground/80 mb-4">Vous avez dîné chez nous ? Partagez votre expérience !</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Laisser un avis Google
            </a>
            <a
              href="https://www.tripadvisor.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Avis TripAdvisor
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
