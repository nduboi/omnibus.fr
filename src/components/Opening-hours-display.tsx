"use client"

import { useOpeningHours } from "@/hooks/use-firebase-data"
import { Loader2 } from "lucide-react"
import type { DaySchedule } from "@/lib/firebase-service"

const DAYS_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const

const DAYS_FR = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
}

function formatDayHours(daySchedule: DaySchedule): string {
  if (!daySchedule.isOpen || !daySchedule.openTime || !daySchedule.closeTime) {
    return "Fermé"
  }

  const parts = []

  // Check if there's a break period
  if (daySchedule.breakStart && daySchedule.breakEnd) {
    // Morning service
    parts.push(`${daySchedule.openTime} - ${daySchedule.breakStart}`)
    // Evening service
    parts.push(`${daySchedule.breakEnd} - ${daySchedule.closeTime}`)
  } else {
    // Continuous service
    parts.push(`${daySchedule.openTime} - ${daySchedule.closeTime}`)
  }

  return parts.join(" • ")
}

interface OpeningHoursDisplayProps {
  variant?: "detailed" | "compact"
  textColor?: string
}

export function OpeningHoursDisplay({ variant = "detailed", textColor = "text-foreground" }: OpeningHoursDisplayProps) {
  const { openingHours, loading, error } = useOpeningHours()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin text-red-500" />
        <span className="ml-2 text-sm text-gray-600">Chargement...</span>
      </div>
    )
  }

  if (error || !openingHours) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-600">{error || "Horaires non disponibles"}</p>
      </div>
    )
  }

  const groupedHours = new Map<string, string[]>()

  DAYS_ORDER.forEach((day) => {
    const daySchedule = openingHours[day]
    if (daySchedule) {
      const key = formatDayHours(daySchedule)

      if (!groupedHours.has(key)) {
        groupedHours.set(key, [])
      }
      groupedHours.get(key)!.push(DAYS_FR[day])
    }
  })

  if (variant === "compact") {
    return (
      <div className="space-y-2">
        {Array.from(groupedHours.entries()).map(([timeRange, days]) => {
          const dayRange = days.length > 1 ? `${days[0]} - ${days[days.length - 1]}` : days[0]

          if (timeRange === "Fermé") {
            return (
              <div key={timeRange} className="flex justify-between items-center">
                <span className={textColor}>{dayRange}</span>
                <span className="text-red-500">Fermé</span>
              </div>
            )
          }

          const timeParts = timeRange.split(" • ")
          return (
            <div key={timeRange}>
              <div className="flex justify-between items-center">
                <span className={textColor}>{dayRange}</span>
                <span className={textColor}>{timeParts[0]}</span>
              </div>
              {timeParts[1] && (
                <div className="flex justify-between items-center">
                  <span></span>
                  <span className={textColor}>{timeParts[1]}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {Array.from(groupedHours.entries()).map(([timeRange, days]) => {
        const dayRange = days.length > 1 ? `${days[0]} - ${days[days.length - 1]}` : days[0]

        if (timeRange === "Fermé") {
          return (
            <div key={timeRange} className="flex justify-between items-center">
              <span className={`font-medium ${textColor}`}>{dayRange} :</span>
              <span className="text-red-500">Fermé</span>
            </div>
          )
        }

        const timeParts = timeRange.split(" • ")
        return (
          <div key={timeRange} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className={`font-medium ${textColor}`}>{dayRange} :</span>
              <span className={textColor}>{timeParts[0]}</span>
            </div>
            {timeParts[1] && (
              <div className="flex justify-between items-center">
                <span></span>
                <span className={textColor}>{timeParts[1]}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
