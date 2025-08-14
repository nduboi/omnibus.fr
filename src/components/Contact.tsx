"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageCircle } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nous Contacter</h2>
          <p className="text-xl text-foreground/80">
            Une question ? Une réservation ? N&apos;hésitez pas à nous contacter !
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Phone className="h-5 w-5 text-primary" />
                Téléphone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80 mb-2">Appelez-nous pour vos commandes et réservations</p>
              <a href="tel:+33981683400" className="text-primary font-semibold text-lg hover:underline">
                (0) 9 81 68 34 00
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Mail className="h-5 w-5 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80 mb-2">Écrivez-nous pour toute question</p>
              <a href="mailto:contact@lombinus.fr" className="text-primary font-semibold hover:underline">
                lomnibus.pizzeria.bar@outlook.com
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <MessageCircle className="h-5 w-5 text-primary" />
                Réseaux Sociaux
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/80 mb-4">Suivez-nous pour nos actualités</p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/lomnibus85/?locale=fr_FR" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    Facebook
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  Instagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
