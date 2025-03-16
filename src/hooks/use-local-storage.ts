import { useEffect, useState } from "react"

/**
 * Retrieves an item from localStorage and parses it as JSON.
 *
 * @param {string} key - The key under which the item is stored.
 * @returns {any | null} The parsed value from localStorage or `null` if not found.
 */
function getItemFromLocalStorage<T>(key: string): T | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error)
    return null
  }
}

/**
 * Custom hook to persist state in localStorage.
 *
 * @template T The type of the stored value.
 * @param {string} key - The localStorage key.
 * @param {T} initialValue - The initial value if nothing is found in localStorage.
 * @returns {[T, (value: T) => void]} A stateful value and a function to update it.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getItemFromLocalStorage<T>(key) ?? initialValue
  })

  useEffect(() => {
    const item = getItemFromLocalStorage<T>(key)
    if (item !== null) {
      setStoredValue(item)
    }
  }, [key])

  /**
   * Updates the stored value in both state and localStorage.
   *
   * @param {T} value - The new value to store.
   */
  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
