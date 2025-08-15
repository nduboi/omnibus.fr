"use client"

import { useState, useEffect, useCallback } from "react"
import {
  getCategories,
  getOpeningHours,
  getVacationSettings,
  isCurrentlyOpen,
  isOnVacation,
  getActivePeriodReason, // Ajout import pour la raison de période
} from "@/lib/firebase-service"
import type { Category, OpeningHours, VacationSettings } from "@/lib/firebase-service"

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getCategories()
      setCategories(data)
      setError(null)
    } catch (err) {
      setError("Erreur lors du chargement des catégories")
      console.error("Error fetching categories:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return { categories, loading, error, refetch: fetchCategories }
}

export function useOpeningHours() {
  const [openingHours, setOpeningHours] = useState<OpeningHours | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOpeningHours = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getOpeningHours()
      setOpeningHours(data)
      setError(null)
    } catch (err) {
      setError("Erreur lors du chargement des horaires")
      console.error("Error fetching opening hours:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOpeningHours()
  }, [fetchOpeningHours])

  return { openingHours, loading, error, refetch: fetchOpeningHours }
}

export function useVacations() {
  const [vacationSettings, setVacationSettings] = useState<VacationSettings | null>(null)
  const [isOnVacationStatus, setIsOnVacationStatus] = useState(false)
  const [activePeriodReason, setActivePeriodReason] = useState<string | null>(null) // Ajout état pour la raison
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVacations = useCallback(async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching vacation data...")
      const data = await getVacationSettings()
      console.log("[v0] Vacation settings received:", data)
      setVacationSettings(data)
      const vacationStatus = await isOnVacation()
      console.log("[v0] Vacation status:", vacationStatus)
      setIsOnVacationStatus(vacationStatus)

      const periodReason = await getActivePeriodReason()
      setActivePeriodReason(periodReason)

      setError(null)
    } catch (err) {
      setError("Erreur lors du chargement des vacances")
      console.error("Error fetching vacations:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVacations()
  }, [fetchVacations])

  return {
    vacationSettings,
    isOnVacation: isOnVacationStatus,
    vacationMessage: vacationSettings?.currentMessage || "",
    activePeriodReason, // Ajout de la raison dans le retour
    loading,
    error,
    refetch: fetchVacations,
  }
}

export function useRestaurantStatus() {
  const { openingHours, loading: hoursLoading } = useOpeningHours()
  const { isOnVacation, vacationMessage, activePeriodReason, loading: vacationLoading } = useVacations() // Ajout activePeriodReason
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<string>("Chargement...")

  useEffect(() => {
    if (hoursLoading || vacationLoading) {
      setStatus("Chargement...")
      return
    }

    if (isOnVacation) {
      setIsOpen(false)
      setStatus(vacationMessage || "Fermé pour vacances")
      return
    }

    if (!openingHours) {
      setStatus("Horaires non disponibles")
      return
    }

    const checkStatus = async () => {
      try {
        const currentlyOpen = await isCurrentlyOpen()
        setIsOpen(currentlyOpen)
        setStatus(currentlyOpen ? "Ouvert" : "Fermé")
      } catch (error) {
        console.error("Error checking restaurant status:", error)
        setIsOpen(false)
        setStatus("Statut indisponible")
      }
    }

    checkStatus()
  }, [openingHours, isOnVacation, vacationMessage, hoursLoading, vacationLoading])

  return {
    isOpen,
    status,
    isOnVacation,
    vacationMessage,
    activePeriodReason, // Ajout de la raison dans le retour
    loading: hoursLoading || vacationLoading,
  }
}
