"use client"

import { CookieBanner, CookieDialog } from "@/components/cookies"
import type { CookiePreferences } from "@/hooks/use-cookies"
import Cookies from "js-cookie"
import type React from "react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react"

/**
 * Action types for cookie state management
 */
const actionTypes = {
  SHOW_DIALOG: "SHOW_DIALOG",
  HIDE_DIALOG: "HIDE_DIALOG",
  SET_PREFERENCES: "SET_PREFERENCES",
  REVOKE_PERMISSIONS: "REVOKE_PERMISSIONS",
  SET_SHOW_BANNER: "SET_SHOW_BANNER",
} as const

type ActionType = typeof actionTypes
type ActionKeys = keyof ActionType
type _ActionValues = ActionType[ActionKeys]

/**
 * Union type for all possible cookie actions
 */
type CookieAction =
  | { type: typeof actionTypes.SHOW_DIALOG }
  | { type: typeof actionTypes.HIDE_DIALOG }
  | { type: typeof actionTypes.SET_PREFERENCES; payload: CookiePreferences }
  | { type: typeof actionTypes.REVOKE_PERMISSIONS }
  | { type: typeof actionTypes.SET_SHOW_BANNER; payload: boolean }

/**
 * Interface for cookie state
 */
interface CookieState {
  /** Whether to show the cookie preferences dialog */
  showDialog: boolean
  /** Whether to show the cookie banner */
  showBanner: boolean
  /** Current cookie preferences */
  preferences: CookiePreferences
}

/**
 * Initial state for cookie management
 */
const initialState: CookieState = {
  showDialog: false,
  showBanner: false,
  preferences: {
    necessary: true,
    analytics: true,
  },
}

/**
 * Reducer function for cookie state management
 *
 * @param state - Current cookie state
 * @param action - Action to perform on the state
 * @returns Updated cookie state
 */
function cookieReducer(state: CookieState, action: CookieAction): CookieState {
  switch (action.type) {
    case actionTypes.SHOW_DIALOG:
      return { ...state, showDialog: true }
    case actionTypes.HIDE_DIALOG:
      return { ...state, showDialog: false }
    case actionTypes.SET_PREFERENCES:
      return { ...state, preferences: action.payload, showBanner: false }
    case actionTypes.REVOKE_PERMISSIONS:
      return { ...state, preferences: initialState.preferences }
    case actionTypes.SET_SHOW_BANNER:
      return { ...state, showBanner: action.payload }
    default:
      return state
  }
}

/**
 * Interface for cookie context
 */
interface CookieContextType {
  /** Current cookie state */
  state: CookieState
  /** Function to show the cookie preferences dialog */
  showCookieDialog: () => void
  /** Function to hide the cookie preferences dialog */
  hideCookieDialog: () => void
  /** Function to update cookie preferences */
  setPreferences: (preferences: CookiePreferences) => void
  /** Function to show or hide the cookie banner */
  setShowBanner: (show: boolean) => void
}

/**
 * Context for cookie management
 */
const CookieContext = createContext<CookieContextType>({
  state: initialState,
  showCookieDialog: () => {},
  hideCookieDialog: () => {},
  setPreferences: () => {},
  setShowBanner: () => {},
})

/**
 * Regular expression to extract cookie preferences from cookie string
 */
const cookieRegex = /cookiePreferences=([^;]+)/

/**
 * Provider component for cookie management
 *
 * @param props - Component props
 * @param props.children - Child components
 * @returns Cookie provider component
 */
export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cookieReducer, initialState)

  const showCookieDialog = useCallback(
    () => dispatch({ type: actionTypes.SHOW_DIALOG }),
    [],
  )

  const hideCookieDialog = useCallback(
    () => dispatch({ type: actionTypes.HIDE_DIALOG }),
    [],
  )

  /**
   * Update cookie preferences and save to cookie
   *
   * @param preferences - New cookie preferences
   */
  const setPreferences = useCallback((preferences: CookiePreferences) => {
    dispatch({ type: actionTypes.SET_PREFERENCES, payload: preferences })
    Cookies.set("cookiePreferences", JSON.stringify(preferences))
  }, [])

  /**
   * Show or hide the cookie banner
   *
   * @param show - Whether to show the banner
   */
  const setShowBanner = useCallback((show: boolean) => {
    dispatch({ type: actionTypes.SET_SHOW_BANNER, payload: show })
  }, [])

  useEffect(() => {
    const cookieString = document.cookie
    const cookiePreferencesMatch = cookieString.match(cookieRegex)

    if (cookiePreferencesMatch) {
      try {
        const cookiePreferences = JSON.parse(
          cookiePreferencesMatch[1],
        ) as CookiePreferences
        dispatch({
          type: actionTypes.SET_PREFERENCES,
          payload: cookiePreferences,
        })
      } catch (error) {
        console.error("Failed to parse cookie preferences:", error)
        setShowBanner(true)
      }
    } else {
      setShowBanner(true)
    }
  }, [setShowBanner])

  return (
    <CookieContext.Provider
      value={{
        state,
        showCookieDialog,
        hideCookieDialog,
        setPreferences,
        setShowBanner,
      }}
    >
      {children}
      {state.showBanner && <CookieBanner />}
      {state.showDialog && (
        <CookieDialog
          preferences={state.preferences}
          onSave={setPreferences}
          onClose={hideCookieDialog}
          open={state.showDialog}
        />
      )}
    </CookieContext.Provider>
  )
}

/**
 * Hook to access the cookie context
 *
 * @returns Cookie context
 */
export const useCookieContext = () => useContext(CookieContext)
