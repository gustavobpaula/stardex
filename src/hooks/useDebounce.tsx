import { useEffect, useState } from 'react'

/**
 * Custom hook that debounces a value.
 *
 * This hook delays updating the debounced value until after a specified delay
 * has passed since the last time the value was changed. It is useful for
 * scenarios where you want to limit the rate at which a function is executed,
 * such as handling user input in a search field.
 *
 * @param {T} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds to wait before updating the debounced value.
 * @returns {T} The debounced value.
 */
export const useDebounce = <T,>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
