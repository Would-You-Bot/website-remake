import { useEffect, useState } from "react"

const DEFAULT_BREAKPOINT = 768

/**
 * Custom hook to detect if the viewport width is below a given breakpoint.
 *
 * @returns {boolean} `true` if the viewport is in mobile mode (below the breakpoint), otherwise `false`.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < DEFAULT_BREAKPOINT,
  )

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    const mql = window.matchMedia(`(max-width: ${DEFAULT_BREAKPOINT - 1}px)`)

    setIsMobile(mql.matches) // Initial check
    mql.addEventListener("change", onChange)

    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
