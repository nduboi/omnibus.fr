import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import {db} from "./firebase"

// Types
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  ingredients: string[]
  imageUrl: string
  available: boolean
  category: string
}

export interface Category {
  id: string
  name: string
  active: boolean
  order: number
  menuItems: MenuItem[]
}

export interface DaySchedule {
  isOpen: boolean
  openTime: string | null
  closeTime: string | null
  breakStart: string | null
  breakEnd: string | null
}

export interface OpeningHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface VacationSettings {
  isVacationMode: boolean
  currentMessage: string
  periods: Array<{
    id: string
    startDate: string
    endDate: string
    reason: string
    isActive: boolean
  }>
}

// Fallback data
const FALLBACK_CATEGORIES: Category[] = [
  {
    id: "pizzas",
    name: "Pizzas du Moment",
    active: true,
    order: 0,
    menuItems: [
      {
        id: "margherita",
        name: "Margherita",
        description: "Pizza classique",
        price: 12.5,
        ingredients: ["Tomate", "Mozzarella", "Basilic"],
        imageUrl: "/images/pizza-banner.png",
        available: true,
        category: "Pizzas du Moment",
      },
    ],
  },
]

const FALLBACK_OPENING_HOURS: OpeningHours = {
  monday: { isOpen: false, openTime: null, closeTime: null, breakStart: null, breakEnd: null },
  tuesday: { isOpen: true, openTime: "11:30", closeTime: "22:30", breakStart: "14:30", breakEnd: "18:30" },
  wednesday: { isOpen: true, openTime: "18:30", closeTime: "22:30", breakStart: null, breakEnd: null },
  thursday: { isOpen: true, openTime: "11:30", closeTime: "22:30", breakStart: "14:30", breakEnd: "18:30" },
  friday: { isOpen: true, openTime: "11:30", closeTime: "22:30", breakStart: "14:30", breakEnd: "18:30" },
  saturday: { isOpen: true, openTime: "11:30", closeTime: "22:30", breakStart: "14:30", breakEnd: "18:30" },
  sunday: { isOpen: true, openTime: "11:30", closeTime: "22:30", breakStart: "14:30", breakEnd: "18:30" },
}

const FALLBACK_VACATION_SETTINGS: VacationSettings = {
  isVacationMode: false,
  currentMessage: "",
  periods: [],
}

// Helper function to check if Firebase is configured
function isFirebaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  )
}

export async function getCategories(): Promise<Category[]> {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured, using fallback categories")
    return FALLBACK_CATEGORIES
  }

  try {
    const categoriesRef = collection(db, "categories")
    const categoriesSnap = await getDocs(categoriesRef)

    const menuItemsRef = collection(db, "menuItems")
    const menuItemsSnap = await getDocs(menuItemsRef)

    const menuItemsData: MenuItem[] = []
    menuItemsSnap.forEach((doc) => {
      const data = doc.data()
      if (data.available) {
        menuItemsData.push({
          id: doc.id,
          ...data,
        } as MenuItem)
      }
    })

    const categories: Category[] = []
    categoriesSnap.forEach((doc) => {
      const data = doc.data()
      if (data.active) {
        const categoryMenuItems = menuItemsData.filter((item) => item.category === data.name)
        categories.push({
          id: doc.id,
          name: data.name,
          active: data.active,
          order: data.order,
          menuItems: categoryMenuItems,
        })
      }
    })

    return categories.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error("Error fetching categories:", error)
    console.warn("Using fallback categories data")
    return FALLBACK_CATEGORIES
  }
}

export async function getOpeningHours(): Promise<OpeningHours> {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured, using fallback opening hours")
    return FALLBACK_OPENING_HOURS
  }

  try {
    const docRef = doc(db, "settings", "schedule")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const scheduleData = docSnap.data()
      return scheduleData as OpeningHours
    }
    return FALLBACK_OPENING_HOURS
  } catch (error) {
    console.error("Error fetching opening hours:", error)
    console.warn("Using fallback opening hours data")
    return FALLBACK_OPENING_HOURS
  }
}

export async function getVacationSettings(): Promise<VacationSettings> {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured, using fallback vacation settings")
    return FALLBACK_VACATION_SETTINGS
  }

  try {
    const docRef = doc(db, "settings", "vacation")
    const docSnap = await getDoc(docRef)

    console.log("[v0] Fetching vacation settings from settings/vacation")

    if (docSnap.exists()) {
      const vacationData = docSnap.data()
      console.log("[v0] Vacation data from Firebase:", vacationData)
      return vacationData as VacationSettings
    } else {
      console.log("[v0] No vacation document found, using fallback")
    }
    return FALLBACK_VACATION_SETTINGS
  } catch (error) {
    console.error("Error fetching vacation settings:", error)
    console.warn("Using fallback vacation settings data")
    return FALLBACK_VACATION_SETTINGS
  }
}

export async function isOnVacation(): Promise<boolean> {
  const vacationSettings = await getVacationSettings()
  console.log("[v0] Checking vacation status with settings:", vacationSettings)

  const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD format
  console.log("[v0] Today's date:", today)

  for (const period of vacationSettings.periods) {
    console.log("[v0] Checking period:", period)
    if (period.isActive && today >= period.startDate && today <= period.endDate) {
      console.log("[v0] Found active vacation period:", period.reason)
      return true
    }
  }

  if (vacationSettings.isVacationMode) {
    console.log("[v0] Global vacation mode is active")
    return true
  }

  console.log("[v0] Not on vacation")
  return false
}

export async function isCurrentlyOpen(): Promise<boolean> {
  const onVacation = await isOnVacation()
  if (onVacation) {
    return false
  }

  const openingHours = await getOpeningHours()

  const now = new Date()
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const dayName = dayNames[now.getDay()] as keyof OpeningHours

  const daySchedule = openingHours[dayName]

  if (!daySchedule.isOpen) {
    return false
  }

  const currentTime = now.getHours() + now.getMinutes() / 60

  if (daySchedule.openTime && daySchedule.closeTime) {
    const [openHour, openMin] = daySchedule.openTime.split(":").map(Number)
    const [closeHour, closeMin] = daySchedule.closeTime.split(":").map(Number)

    const openTime = openHour + openMin / 60
    const closeTime = closeHour + closeMin / 60

    if (daySchedule.breakStart && daySchedule.breakEnd) {
      const [breakStartHour, breakStartMin] = daySchedule.breakStart.split(":").map(Number)
      const [breakEndHour, breakEndMin] = daySchedule.breakEnd.split(":").map(Number)

      const breakStart = breakStartHour + breakStartMin / 60
      const breakEnd = breakEndHour + breakEndMin / 60

      if (currentTime >= breakStart && currentTime < breakEnd) {
        return false
      }
    }

    return currentTime >= openTime && currentTime < closeTime
  }

  return false
}

export async function getActivePeriodReason(): Promise<string | null> {
  const vacationSettings = await getVacationSettings()

  const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD format

  for (const period of vacationSettings.periods) {
    if (period.isActive && today >= period.startDate && today <= period.endDate) {
      console.log("[v0] Found active period reason:", period.reason)
      return period.reason
    }
  }

  return null
}
