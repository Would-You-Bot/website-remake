"use client"

import { useIsClient } from "@/hooks/use-client"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useMemo } from "react"

/**
 * Hook to access and parse cookies
 *
 * Parses the document.cookie string into a Map of key-value pairs.
 * Uses the useIsClient hook to ensure it only runs on the client side.
 *
 * @returns Map of cookie names to their values
 */
export function useCookies() {
  const isClient = useIsClient()
  const cookies_ = isClient ? window?.document?.cookie : ""

  return useMemo(() => {
    return cookies_.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=")
      acc.set(key.trim(), value)
      return acc
    }, new Map<string, string>())
  }, [cookies_])
}

/**
 * Interface representing cookie preferences
 */
export interface CookiePreferences {
  /** Whether necessary cookies are accepted (always true) */
  necessary: boolean
  /** Whether analytics cookies are accepted */
  analytics: boolean
}

/**
 * Hook to manage cookie preferences
 *
 * Handles reading, saving, and managing cookie preferences.
 * Provides functions to set preferences and check if analytics are enabled.
 *
 * @returns Object containing preference data and utility functions
 */
export const useCookiePreferences = () => {
  // Get cookies from document
  const cookies = useCookies()

  // State for cookie preferences
  const [data, setData] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
  })

  // State for displaying the cookie banner
  const [showBanner, setShowBanner] = useState(true)

  /**
   * Load saved preferences from cookies on mount
   */
  useEffect(() => {
    const savedPreferences = cookies.get("cookiePreferences")
    if (savedPreferences) {
      try {
        setData(JSON.parse(savedPreferences))
        setShowBanner(false)
      } catch (error) {
        console.error("Failed to parse cookie preferences:", error)
      }
    }
  }, [cookies])

  /**
   * Save cookie preferences to a cookie
   *
   * Sets the preferences in state and saves them as a cookie
   * with an expiration of 31 days.
   *
   * @param preferences - Cookie preferences to save
   */
  const savePreferences = (preferences: CookiePreferences) => {
    setData(preferences)
    const expirationDate: Date = new Date(Date.now() + 31 * 864e5)
    Cookies.set("cookiePreferences", JSON.stringify(preferences), {
      expires: expirationDate,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  }

  /**
   * Check if analytics cookies are enabled
   *
   * @returns True if analytics cookies are accepted, false otherwise
   */
  const hasAnalytics = () => {
    return data.analytics
  }

  return {
    /** Current cookie preferences */
    data,
    /** Function to update cookie preferences (without saving to cookie) */
    setData,
    /** Whether the cookie banner should be shown */
    showBanner,
    /** Function to set whether the cookie banner should be shown */
    setShowBanner,
    /** Function to save cookie preferences (updates state and saves to cookie) */
    savePreferences,
    /** Function to check if analytics cookies are enabled */
    hasAnalytics,
  }
}
