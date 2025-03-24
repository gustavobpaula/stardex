import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

jest.useFakeTimers()

describe('useDebounce', () => {
  test('should debounce value', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    // Initial value should be 'initial'
    expect(result.current).toBe('initial')

    // Update value
    rerender({ value: 'updated', delay: 500 })

    // Value should still be 'initial' because of debounce delay
    expect(result.current).toBe('initial')

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Value should now be 'updated'
    expect(result.current).toBe('updated')
  })

  test('should reset debounce timer on value change', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    })

    // Initial value should be 'initial'
    expect(result.current).toBe('initial')

    // Update value
    rerender({ value: 'updated', delay: 500 })

    // Value should still be 'initial' because of debounce delay
    expect(result.current).toBe('initial')

    // Update value again before debounce delay
    rerender({ value: 'updated again', delay: 500 })

    // Fast-forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Value should now be 'updated again'
    expect(result.current).toBe('updated again')
  })
})
