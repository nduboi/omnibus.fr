"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { LegalHeader } from "./components/LegalHeader"

export default function LegalPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <LegalHeader />

      {/* Main content */}
      <main className="max-w-3xl mx-auto p-6 md:p-12 bg-[var(--card)] rounded-[var(--radius)] shadow-lg mt-6 md:mt-12 space-y-6">
        {/* Éditeur */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">Éditeur du site</h2>
          <p><strong>Nom :</strong> L'OMNIBUS</p>
          <p><strong>Forme juridique :</strong> Société à responsabilité limitée (SARL)</p>
          <p><strong>SIREN :</strong> 851 207 704</p>
          <p><strong>SIRET :</strong> 851 207 704 00012</p>
          <p><strong>TVA intracommunautaire :</strong> FR57851207704</p>
          <p><strong>Date de création :</strong> 18 juillet 2019</p>
          <p><strong>Code NAF/APE :</strong> 5610A - Restauration traditionnelle</p>
          <p><strong>Dirigeants :</strong> Mylène GIRAUD, Charlène GRELLIER, Julien GIRAUD</p>
          <p><strong>Adresse :</strong> 1 B RUE DE LA GARE, 85110 CHANTONNAY, France</p>
          <p><strong>Email :</strong> <a href="mailto:lomnibus.pizzeria.bar@outlook.com" className="text-[var(--accent)] hover:underline">lomnibus.pizzeria.bar@outlook.com</a></p>
          <p><strong>Téléphone :</strong> 09 81 68 34 00</p>
        </section>

        {/* Hébergement */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">Hébergement</h2>
          <p>
            Le code source de ce site est hébergé et déployé via <strong>GitHub Pages</strong>.  
            L&apos;hébergement et la gestion du dépôt se font par GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.
          </p>
        </section>

        {/* Propriété intellectuelle */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">Propriété intellectuelle</h2>
          <p>
            Tous les contenus présents sur ce site (textes, images, logos, design, code) sont la propriété exclusive de L'OMNIBUS ou de leurs auteurs respectifs.  
            Toute reproduction, modification, distribution ou utilisation sans autorisation est strictement interdite.
          </p>
        </section>

        {/* Responsabilité */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">Responsabilité</h2>
          <p>
            L&apos;OMNIBUS ne saurait être tenu responsable des dommages directs ou indirects pouvant résulter de l&apos;accès ou de l&apos;utilisation de ce site.  
            Les informations fournies sont à titre indicatif et peuvent être modifiées sans préavis.
          </p>
        </section>

        {/* Services tiers */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">Services tiers</h2>
          <p>
            Ce site utilise des services tiers pour son fonctionnement :  
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Firebase (Google LLC)</strong> pour la gestion de certaines données via Firestore Database.</li>
            <li><strong>Mapbox</strong> pour l&apos;affichage de cartes interactives.</li>
          </ul>
          <p>
            Pour plus d&apos;informations, veuillez consulter les politiques de confidentialité des services tiers :
            <br />
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Politique Google</a> |  
            <a href="https://www.mapbox.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline ml-2">Politique Mapbox</a>
          </p>
        </section>
      </main>

      <footer className="text-center py-6 mt-12 text-[var(--muted)]">
        &copy; 2025 L'OMNIBUS – Mentions légales
      </footer>
    </div>
  )
}
