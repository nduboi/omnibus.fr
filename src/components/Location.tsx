"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Clock, ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { OpeningHoursDisplay } from "./Opening-hours-display"

export function Location() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapError, setMapError] = useState(false)
  const [mapLoading, setMapLoading] = useState(true)

  const longitude = -1.0539832
  const latitude = 46.689520
  const address = "L'Omnibus Bar-restaurant-pizzeria, 85110 Chantonnay"

  useEffect(() => {
    if (map.current) return // Initialize map only once

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

    if (!mapboxToken || mapboxToken.includes("test-token")) {
      setMapError(true)
      setMapLoading(false)
      return
    }

    mapboxgl.accessToken = mapboxToken

    if (!mapboxgl.supported()) {
      setMapError(true)
      setMapLoading(false)
      return
    }

    if (mapContainer.current) {
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [longitude, latitude],
          zoom: 15,
        })

        map.current.on("load", () => {
          setMapLoading(false)
        })

        map.current.on("error", () => {
          setMapError(true)
          setMapLoading(false)
        })

        new mapboxgl.Marker({
          color: "#dc2626", // Rouge pour correspondre au thème
        })
          .setLngLat([longitude, latitude])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <div class="p-2">
                <h3 class="font-bold text-lg">L'Omnibus</h3>
                <p class="text-sm">Bar-Restaurant-Pizzeria</p>
                <p class="text-sm text-gray-600">1 bis Rue de la Gare<br>85110 Chantonnay</p>
              </div>
            `),
          )
          .addTo(map.current)
      } catch (error) {
        setMapError(true)
        setMapLoading(false)
      }
    }

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  return (
    <section id="location" className="py-8 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nous Trouver</h2>
          <p className="text-lg md:text-xl text-foreground/80 px-2">
            Venez nous rendre visite dans notre pizzeria au cœur de Chantonnay
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-card rounded-lg overflow-hidden border border-primary/20 relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] order-2 lg:order-1">
            {mapError ? (
              <div className="h-full w-full flex flex-col items-center justify-center bg-gray-100 text-center p-4 md:p-6">
                <MapPin className="h-8 w-8 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-2">Carte non disponible</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                  La carte interactive n&apos;est pas disponible pour le moment.
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                  Voir sur Google Maps
                </a>
              </div>
            ) : (
              <>
                {mapLoading && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-xs md:text-sm text-gray-600">Chargement de la carte...</p>
                    </div>
                  </div>
                )}
                <div ref={mapContainer} className="h-full w-full" />
              </>
            )}
          </div>

          <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
            <Card className="bg-card border-primary/20">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-card-foreground text-base md:text-lg">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Adresse
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-card-foreground/80 text-sm md:text-base leading-relaxed">
                  L&apos;Omnibus Bar-Restaurant-Pizzeria
                  <br />1 bis Rue de la Gare
                  <br />
                  85110 Chantonnay
                  <br />
                  France
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-xs md:text-sm mt-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  Ouvrir dans Google Maps
                </a>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-card-foreground text-base md:text-lg">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Horaires d&apos;ouverture
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <OpeningHoursDisplay variant="compact" textColor="text-card-foreground" />
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-card-foreground text-base md:text-lg">
                  <Navigation className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  Accès
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-card-foreground/80 text-sm md:text-base">
                  <p>
                    <strong>Voiture :</strong> Parking gratuit disponible
                  </p>
                  <p>
                    <strong>Train :</strong> Gare SNCF de Chantonnay à proximité
                  </p>
                  <p>
                    <strong>Centre-ville :</strong> À 2 minutes à pied
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
