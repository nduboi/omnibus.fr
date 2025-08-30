// src/app/privacy/page.tsx
"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { PrivacyHeader } from "./components/PrivacyHeader"

export default function PrivacyPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <PrivacyHeader />

      <main className="max-w-3xl mx-auto p-6 md:p-12 bg-[var(--card)] rounded-[var(--radius)] shadow-lg mt-6 md:mt-12">
        <p className="mb-6">
          La présente politique de confidentialité décrit la manière dont nous collectons, utilisons et protégeons vos informations lors de l&apos;utilisation de notre site Internet <strong>L'Omnibus Bar-Restaurant-Pizzeria</strong>.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">Utilisation de services tiers</h2>

        <h3 className="text-xl font-medium mb-2">Firebase (Google LLC)</h3>
        <p className="mb-4">
          Nous utilisons Firebase, un service fourni par Google LLC, pour l&apos;hébergement et la gestion de données via Firestore Database.  
          Les données stockées dans Firebase peuvent être hébergées sur des serveurs situés en dehors de l&apos;Union Européenne.  
          Pour plus d&apos;informations, veuillez consulter la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">politique de confidentialité de Google</a>.
        </p>

        <h3 className="text-xl font-medium mb-2">Mapbox</h3>
        <p className="mb-4">
          Nous utilisons Mapbox pour l&apos;affichage de cartes interactives.  
          Lorsque vous consultez une carte, certaines informations techniques (comme votre adresse IP et vos interactions avec la carte) peuvent être collectées par Mapbox.  
          Pour plus d&apos;informations, veuillez consulter la <a href="https://www.mapbox.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">politique de confidentialité de Mapbox</a>.
        </p>

        <h3 className="text-xl font-medium mb-2">Avis Google</h3>
        <p className="mb-6">
          Nous affichons sur notre site des avis issus de Google.  
          Ces avis proviennent de la plateforme Google Maps et restent la propriété de leurs auteurs et de Google.  
          Nous ne modifions pas le contenu de ces avis et ne garantissons pas leur exactitude ou leur exhaustivité.
        </p>

        <h2 className="text-2xl font-semibold mb-4 text-[var(--primary)]">Droits des utilisateurs</h2>
        <p className="mb-2">
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Droit d&apos;accès à vos données</li>
          <li>Droit de rectification</li>
          <li>Droit à l&apos;effacement</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit d&apos;opposition</li>
        </ul>
        <p>
          Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse suivante : <a href="mailto:contact@lomnibus.fr" className="text-[var(--accent)] hover:underline">contact@lomnibus.fr</a>.
        </p>
      </main>

      <footer className="text-center py-6 mt-12 text-[var(--muted)]">
        &copy; 2025 L'Omnibus – Politique de confidentialité
      </footer>
    </div>
  )
}
