"use client"

import { CookieDialog } from "@/components/cookies/cookie-dialog"
import { useCookieContext } from "@/components/cookies/cookie-provider"
import { Button } from "@/components/ui/button"
import type { CookiePreferences } from "@/hooks/use-cookies"
import { useCallback, useEffect, useState } from "react"

/**
 * Cookie consent banner component
 *
 * Displays a banner at the bottom of the page to inform users about
 * cookie usage and allow them to manage their preferences.
 *
 * @returns Cookie banner component or null if necessary cookies are not accepted
 */
export function CookieBanner() {
  const { setShowBanner, state, setPreferences } = useCookieContext()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const checkCookiePreferences = () => {
      const cookieString = document.cookie
      const isCookiesSet = cookieString.includes("cookiePreferences=")
      setShowBanner(!isCookiesSet)
    }

    checkCookiePreferences()
  }, [setShowBanner])

  /**
   * Update cookie preferences and hide the banner
   *
   * @param preferences - New cookie preferences
   */
  const updatePreferences = useCallback(
    (preferences: CookiePreferences) => {
      setPreferences(preferences)
      setShowBanner(false)
    },
    [setPreferences, setShowBanner],
  )

  const handleAcceptAll = useCallback(() => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
    }
    updatePreferences(allPreferences)
  }, [updatePreferences])

  const handleRequiredOnly = useCallback(() => {
    const requiredPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
    }
    updatePreferences(requiredPreferences)
  }, [updatePreferences])

  const handleOpenModal = useCallback(() => {
    setShowModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
  }, [])

  // Early return if necessary cookies are not accepted
  if (!state.preferences.necessary) {
    return null
  }

  return (
    <>
      <dialog
        className="fixed inset-x-0 bottom-0 z-50 bg-hover-light shadow-md"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="mx-auto flex max-w-8xl flex-col items-center justify-between gap-4 px-8 py-4 sm:flex-row">
          <div
            className="text-sm"
            id="cookie-banner-description"
          >
            <span
              id="cookie-banner-title"
              className="sr-only"
            >
              Cookie Consent
            </span>
            We use cookies to enhance your browsing experience and analyze our
            traffic.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:flex-nowrap">
            <Button
              variant="ghost"
              className="h-10 hover:bg-foreground/5"
              onClick={handleOpenModal}
              aria-haspopup="dialog"
              type="button"
            >
              Customize
            </Button>
            <Button
              variant="secondary"
              className="h-10 bg-foreground/10 hover:bg-foreground/5"
              onClick={handleRequiredOnly}
              type="button"
            >
              Required Only
            </Button>
            <Button
              className="h-10 bg-brand-blue-100 text-white hover:bg-brand-blue-200"
              onClick={handleAcceptAll}
              type="button"
            >
              Accept All
            </Button>
          </div>
        </div>
      </dialog>

      <CookieDialog
        open={showModal}
        preferences={state.preferences}
        onSave={setPreferences}
        onClose={handleCloseModal}
      />
    </>
  )
}
