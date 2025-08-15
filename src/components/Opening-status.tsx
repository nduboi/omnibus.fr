"use client"

import { Clock, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OpeningHoursDisplay } from "./Opening-hours-display"
import { useRestaurantStatus } from "@/hooks/use-firebase-data"
import { useState } from "react"

export function OpeningStatus() {
  const { isOpen, status, isOnVacation, vacationMessage, activePeriodReason, loading } = useRestaurantStatus() // Ajout activePeriodReason
  const [showSettings, setShowSettings] = useState(false)

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto bg-white border-gray-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-red-500" />
              <h3 className="text-xl font-semibold text-[#121619]">Statut du restaurant</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)} className="ml-auto">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-4">
              <div
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold ${
                  isOnVacation ? "bg-red-500" : isOpen ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>{loading ? "CHARGEMENT..." : isOnVacation ? "FERMÉ" : status.toUpperCase()}</span>
              </div>
            </div>

            {isOnVacation ? (
              <div className="text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="font-medium text-yellow-800">{vacationMessage}</p>
                {activePeriodReason && (
                  <p className="mt-2 text-sm text-yellow-700 italic">Motif : {activePeriodReason}</p>
                )}
              </div>
            ) : (
              <div className="text-sm bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-3 text-[#121619]">Horaires d&apos;ouverture :</p>
                <div className="max-w-xs mx-auto">
                  <OpeningHoursDisplay variant="detailed" textColor="text-[#121619]" />
                </div>
              </div>
            )}

            {showSettings && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-left">
                <h4 className="font-medium text-blue-800 mb-2">Configuration Firebase :</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• Horaires : Collection &quot;settings&quot; → Document &quot;openingHours&quot;</p>
                  <p>• Vacances : Collection &quot;settings&quot; → Document &quot;vacations&quot;</p>
                  <p>• Format horaire : &quot;11:30&quot;, &quot;14:00&quot;, avec breakStart/breakEnd</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
