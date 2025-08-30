"use client"

import { Phone, Mail, MapPin, AlertTriangle } from "lucide-react"
import { OpeningHoursDisplay } from "./Opening-hours-display"
import { useVacations } from "@/hooks/use-firebase-data"

export function Footer() {
  const { vacationSettings, isOnVacation } = useVacations()
  const currentVacation = vacationSettings?.periods.find(period => period.isActive) || null

  return (
    <footer className="bg-secondary border-t border-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo-complete.png" alt="L'ombinus Logo" className="h-16 w-16 object-contain" />
              <div>
                <h3 className="text-xl font-bold text-foreground">L&apos;ombinus</h3>
                <p className="text-sm text-foreground/60">Pizzeria</p>
              </div>
            </div>
            <p className="text-foreground/80 mb-4 max-w-md">
              Découvrez nos pizzas artisanales et pâtes préparées avec des ingrédients frais et de qualité dans un cadre
              ferroviaire unique.
            </p>

            {isOnVacation && currentVacation && (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-yellow-800 font-medium text-sm">{currentVacation.reason}</span>
                </div>
                <p className="text-yellow-700 text-xs mt-1">
                  Du {new Date(currentVacation.startDate).toLocaleDateString("fr-FR")} au{" "}
                  {new Date(currentVacation.endDate).toLocaleDateString("fr-FR")}
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/lomnibus85/?locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/lomnibus85/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.tripadvisor.fr/Restaurant_Review-g672996-d19786985-Reviews-L_Omnibus-Chantonnay_Vendee_Pays_de_la_Loire.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
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
            {isOnVacation ? (
              <div className="text-center py-4">
                <p className="text-red-500 font-medium">Fermé pour vacances</p>
                <p className="text-foreground/60 text-sm mt-1">
                  Retour le {new Date(currentVacation?.endDate || "").toLocaleDateString("fr-FR")}
                </p>
              </div>
            ) : (
              <OpeningHoursDisplay variant="compact" textColor="text-foreground/80" />
            )}
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="text-foreground/60">
            © 2024 Pizzeria L&apos;ombinus. Tous droits réservés. |
            <a href="/legal" className="hover:text-primary transition-colors ml-1">
              Mentions légales
            </a>{" "}
            |
            <a href="/privacy" className="hover:text-primary transition-colors ml-1">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
