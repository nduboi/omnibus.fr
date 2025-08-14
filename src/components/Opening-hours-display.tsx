"use client"

// Configuration des horaires (à synchroniser avec opening-status.tsx)
const OPENING_HOURS = {
  monday: { morning: [12.0, 14.0], evening: [19.0, 21.5] },
  tuesday: { morning: [12.0, 14.0], evening: [19.0, 21.5] },
  wednesday: null, // Fermé
  thursday: { morning: [12.0, 14.0], evening: [19.0, 21.5] },
  friday: { morning: [12.0, 14.0], evening: [19.0, 21.5] },
  saturday: { morning: null, evening: [19.0, 21.5] },
  sunday: { morning: [12.0, 14.0], evening: [19.0, 21.5] },
}

const DAYS_FR = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
}

function formatTime(decimalTime: number): string {
  const hours = Math.floor(decimalTime)
  const minutes = Math.round((decimalTime - hours) * 60)
  return `${hours}h${minutes.toString().padStart(2, "0")}`
}

function formatDayHours(hours: any): string {
  if (!hours) return "Fermé"

  const parts = []
  if (hours.morning) {
    parts.push(`${formatTime(hours.morning[0])}-${formatTime(hours.morning[1])}`)
  }
  if (hours.evening) {
    parts.push(`${formatTime(hours.evening[0])}-${formatTime(hours.evening[1])}`)
  }

  return parts.join(" • ")
}

interface OpeningHoursDisplayProps {
  variant?: "detailed" | "compact"
  textColor?: string // Ajout de la prop textColor pour personnaliser la couleur du texte
}

export function OpeningHoursDisplay({ variant = "detailed", textColor = "text-foreground" }: OpeningHoursDisplayProps) {
  const groupedHours = new Map<string, string[]>()

  Object.entries(OPENING_HOURS).forEach(([day, hours]) => {
    const key = formatDayHours(hours)

    if (!groupedHours.has(key)) {
      groupedHours.set(key, [])
    }
    groupedHours.get(key)!.push(DAYS_FR[day as keyof typeof DAYS_FR])
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
