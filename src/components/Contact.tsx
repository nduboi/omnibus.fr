"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { TbLoader3 } from "react-icons/tb"
import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

type Props = {
  username: string;
  className?: string;
};

function InstagramFollowButton({ username, className }: Props) {
  const handleClick = () => {
    window.open(`https://www.instagram.com/${username}/`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-full hover:opacity-90 transition ${className}`}
    >
      Follow @{username}
    </button>
  );
}

function FacebookPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Vérifie si le SDK FB est chargé et parse le div
    if (window.FB) {
      window.FB.XFBML.parse();
      setLoaded(true);
    } else {
      // On écoute le chargement du SDK
      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: "v17.0",
        });
        setLoaded(true);
      };
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Loader affiché tant que le plugin n'est pas chargé */}
      {!loaded && (
        <div className="flex flex-col items-center justify-center py-8">
          <TbLoader3 className="animate-spin h-10 w-10 text-primary mb-2" />
          <span className="text-gray-500 text-sm">Chargement du fil Facebook...</span>
        </div>
      )}

      {/* SDK Script */}
      <Script
        strategy="afterInteractive"
        src="https://connect.facebook.net/fr_FR/sdk.js"
      />

      {/* Plugin Facebook */}
      <div id="fb-root"></div>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/lomnibus85/"
        data-tabs="timeline"
        data-width=""
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/lomnibus85/"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/lomnibus85/">L'Omnibus</a>
        </blockquote>
      </div>
    </div>
  );
}

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

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-card border-primary/20 md:row-span-1 md:col-start-1 md:row-start-1">
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

          <Card className="bg-card border-primary/20 md:row-span-1 md:col-start-1 md:row-start-2">
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

          <Card className="bg-card border-primary/20 md:row-span-1 md:col-start-1 md:row-start-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <FaInstagram className="h-7 w-7 text-primary drop-shadow" />
                <p>Instagram</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InstagramFollowButton className="cursor-pointer w-full max-w-xs" username="lomnibus85"/>
            </CardContent>
          </Card>

          <Card className="bg-secondary border-1 border-primary/30 rounded-xl md:row-span-3 md:col-span-2 md:col-start-2 md:row-start-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex flex-col items-center gap-2 text-card-foreground text-xl font-bold">
                <span className="flex items-center gap-2 mb-2">
                  <FaFacebook className="h-7 w-7 text-primary drop-shadow" />
                  <span>Facebook</span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
              <div className="flex justify-center w-full mt-2">
                <div className="max-w-lg w-full">
                  <FacebookPage />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
