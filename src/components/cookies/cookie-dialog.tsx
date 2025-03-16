"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { CookiePreferences } from "@/hooks/use-cookies"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Props for the CookieDialog component
 */
interface CookieDialogProps {
  /** Current cookie preferences */
  preferences: CookiePreferences
  /** Callback for when preferences are saved */
  onSave: (preferences: CookiePreferences) => void
  /** Callback for when the dialog is closed */
  onClose: () => void
  /** Whether the dialog is open */
  open: boolean
}

/**
 * Dialog component for managing cookie preferences
 *
 * Allows users to customize which cookies they accept.
 * Necessary cookies are always required, while analytics
 * cookies can be toggled on or off.
 *
 * @param props - Component props
 * @returns Cookie preference dialog
 */
export function CookieDialog({
  preferences,
  onSave,
  onClose,
  open,
}: CookieDialogProps) {
  // Local state for preferences being edited
  const [localPreferences, setLocalPreferences] =
    useState<CookiePreferences>(preferences)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setLocalPreferences(preferences)
    }
  }, [open, preferences])

  const handleSavePreferences = () => {
    onSave(localPreferences)
    onClose()
    router.refresh()
  }

  const handleReset = () => {
    setLocalPreferences({
      necessary: true,
      analytics: true,
    })
  }

  /**
   * Descriptions for each preference type
   */
  const preferenceDescriptions: Record<keyof CookiePreferences, string> = {
    necessary:
      "Required cookies that enable core functionality of the website.",
    analytics:
      "Optional cookies that help us improve our website by collecting anonymous usage data.",
  }

  /**
   * Handle dialog open/close events
   *
   * @param openState - New open state
   */
  const handleOpenChange = (openState: boolean) => {
    if (!openState) {
      onClose()
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent
        className="rounded-md sm:max-w-[425px]"
        aria-labelledby="cookie-preferences-title"
        aria-describedby="cookie-preferences-description"
      >
        <DialogHeader>
          <DialogTitle id="cookie-preferences-title">
            Cookie Preferences
          </DialogTitle>
          <DialogDescription id="cookie-preferences-description">
            Customize your cookie preferences here. You can enable or disable
            different categories of cookies.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {(
            Object.keys(localPreferences) as Array<keyof CookiePreferences>
          ).map((key) => {
            const value = localPreferences[key]
            const isDisabled = key === "necessary"

            return (
              <div
                key={key}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor={`cookie-preference-${key}`}
                    className="capitalize"
                  >
                    {key}
                  </Label>
                  <span className="text-muted-foreground text-sm">
                    {preferenceDescriptions[key]}
                  </span>
                </div>
                <Switch
                  id={`cookie-preference-${key}`}
                  checked={value}
                  onCheckedChange={(checked) =>
                    setLocalPreferences((prev) => ({
                      ...prev,
                      [key]: checked,
                    }))
                  }
                  disabled={isDisabled}
                  aria-label={`${isDisabled ? "(Required) " : ""}${key} cookies`}
                  className="data-[state=checked]:bg-brand-primary"
                />
              </div>
            )
          })}
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="order-last sm:order-first"
            onClick={handleReset}
            type="button"
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            className="order-first sm:order-last"
            onClick={handleSavePreferences}
            type="button"
          >
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
