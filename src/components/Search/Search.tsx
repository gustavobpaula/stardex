import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks'

export type SearchProps = {
  onChange: (value: string) => void
  className?: React.ComponentProps<'input'>['className']
  debounceTime?: number
}

/**
 * Search component with debounced input.
 *
 * This component renders an input field for search functionality. The input value
 * is debounced to limit the rate at which the onChange function is called.
 *
 * @param {function} onChange - Function to call when the debounced input value changes.
 * @param {string} [className] - Optional class name to apply to the input element.
 * @param {number} [debounceTime=500] - Optional debounce time in milliseconds (default is 500ms).
 * @returns {JSX.Element} The rendered search component.
 */
export const Search = ({ onChange, className, debounceTime = 500 }: SearchProps) => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, debounceTime)

  /**
   * Handles input change event.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    onChange(debouncedSearchValue)
  }, [debouncedSearchValue, onChange])

  return (
    <Input
      placeholder="Search..."
      value={searchValue}
      onChange={handleInputChange}
      className={className}
    />
  )
}
