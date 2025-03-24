import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { Search } from './Search'

jest.useFakeTimers()

describe('Search', () => {
  test('renders search input', () => {
    const { getByPlaceholderText } = render(<Search onChange={() => {}} />)
    expect(getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  test('calls onChange with debounced value', async () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(<Search onChange={handleChange} debounceTime={500} />)
    const input = getByPlaceholderText('Search...')

    fireEvent.change(input, { target: { value: 'test' } })

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith('test')
    })
  })

  test('debounces multiple input changes', async () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(<Search onChange={handleChange} debounceTime={500} />)
    const input = getByPlaceholderText('Search...')

    fireEvent.change(input, { target: { value: 't' } })
    fireEvent.change(input, { target: { value: 'te' } })
    fireEvent.change(input, { target: { value: 'tes' } })
    fireEvent.change(input, { target: { value: 'test' } })

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith('test')
    })
  })
})
