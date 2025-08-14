import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Menu } from "@/components/Menu"
import { Contact } from "@/components/Contact"
import { Location } from "@/components/Location"
import { OpeningStatus } from "@/components/Opening-status"
import { Quality } from "@/components/Quality"
import { Reviews } from "@/components/Reviews"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <OpeningStatus />
      <Menu />
      <Quality />
      <Location />
      <Contact />
      <Reviews />
      <Footer />
    </main>
  )
}
