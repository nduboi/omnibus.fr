"use client"

import { useState, useEffect } from "react"
import { Clock, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OpeningHoursDisplay } from "@/components/Opening-hours-display"

const OPENING_HOURS = {
  monday: { morning: [11.5, 14.5], evening: [18.5, 22.5] }, // Fermé
  tuesday: { morning: [11.5, 14.5], evening: [18.5, 22.5] },
  wednesday: { morning: null, evening: [18.5, 22.5] },
  thursday: { morning: [11.5, 14.5], evening: [18.5, 22.5] },
  friday: { morning: [11.5, 14.5], evening: [18.5, 22.5] },
  saturday: { morning: [11.5, 14.5], evening: [18.5, 22.5] },
  sunday: { morning: [11.5, 14.5], evening: [18.5, 22.5] },
}

const VACATION_PERIOD = {
  enabled: false, // Mettre à true pour activer les vacances
  startDate: "2025-08-01", // Format YYYY-MM-DD
  endDate: "2026-08-15", // Format YYYY-MM-DD
  message: "L'omnibus est en vacances !",
}

export function OpeningStatus() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOnVacation, setIsOnVacation] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date()
      const hour = now.getHours() + now.getMinutes() / 60
      const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
      const currentDay = dayNames[now.getDay()]

      if (VACATION_PERIOD.enabled) {
        const today = now.toISOString().split("T")[0]
        const isInVacationPeriod = today >= VACATION_PERIOD.startDate && today <= VACATION_PERIOD.endDate
        setIsOnVacation(isInVacationPeriod)
        if (isInVacationPeriod) {
          setIsOpen(false)
          return
        }
      }

      const daySchedule = OPENING_HOURS[currentDay as keyof typeof OPENING_HOURS]
      if (!daySchedule) {
        setIsOpen(false)
        return
      }

      let isOpenNow = false

      // Vérifier le service du matin
      if (daySchedule.morning && Array.isArray(daySchedule.morning)) {
        isOpenNow = isOpenNow || (hour >= daySchedule.morning[0] && hour < daySchedule.morning[1])
      }

      // Vérifier le service du soir
      if (daySchedule.evening && Array.isArray(daySchedule.evening)) {
        isOpenNow = isOpenNow || (hour >= daySchedule.evening[0] && hour < daySchedule.evening[1])
      }

      setIsOpen(isOpenNow)
    }

    updateStatus()
    const interval = setInterval(updateStatus, 60000)

    return () => clearInterval(interval)
  }, [])

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
                  isOpen ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>{isOnVacation ? "EN VACANCES" : isOpen ? "OUVERT" : "FERMÉ"}</span>
              </div>
            </div>

            {isOnVacation ? (
              <div className="text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="font-medium text-yellow-800">{VACATION_PERIOD.message}</p>
                <p className="text-yellow-700 mt-1">
                  Du {new Date(VACATION_PERIOD.startDate).toLocaleDateString("fr-FR")} au{" "}
                  {new Date(VACATION_PERIOD.endDate).toLocaleDateString("fr-FR")}
                </p>
              </div>
            ) : (
              <div className="text-sm bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-3 text-[#121619]">Horaires d'ouverture :</p>
                <div className="max-w-xs mx-auto">
                  <OpeningHoursDisplay variant="detailed" textColor="text-[#121619]" />
                </div>
              </div>
            )}

            {showSettings && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-left">
                <h4 className="font-medium text-blue-800 mb-2">Configuration rapide :</h4>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>• Modifiez OPENING_HOURS dans opening-hours-display.tsx pour changer les horaires</p>
                  <p>• Activez VACATION_PERIOD.enabled pour les vacances</p>
                  <p>• Format horaire : 11.5 = 11h30, 14.5 = 14h30</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
