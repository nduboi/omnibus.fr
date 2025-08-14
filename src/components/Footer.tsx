import { Phone, Mail, MapPin } from "lucide-react"
import { OpeningHoursDisplay } from "@/components/Opening-hours-display"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo-complete.png" alt="L'ombinus Logo" className="h-16 w-16 object-contain" />
              <div>
                <h3 className="text-xl font-bold text-foreground">L'ombinus</h3>
                <p className="text-sm text-foreground/60">Pizzeria</p>
              </div>
            </div>
            <p className="text-foreground/80 mb-4 max-w-md">
              Découvrez nos pizzas artisanales et pâtes préparées avec des ingrédients frais et de qualité dans un cadre
              ferroviaire unique.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/lomnibus85/?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                Facebook
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                TripAdvisor
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+33981683400" className="text-foreground/80 hover:text-primary transition-colors">
                  (0) 9 81 68 34 00
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:contact@lombinus.fr"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  lomnibus.pizzeria.bar@outlook.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <div className="text-foreground/80">
                  <p>1 bis Rue de la Gare</p>
                  <p>85110 Chantonnay</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Horaires</h4>
            <OpeningHoursDisplay variant="compact" textColor="text-foreground/80" />
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="text-foreground/60">
            © 2024 Pizzeria L'ombinus. Tous droits réservés. |
            <a href="#" className="hover:text-primary transition-colors ml-1">
              Mentions légales
            </a>{" "}
            |
            <a href="#" className="hover:text-primary transition-colors ml-1">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
