import { act, renderHook } from '@testing-library/react-hooks'
import { useDebounce } from '../useDebounce'

jest.useFakeTimers()

const setUp = initialProps =>
  renderHook(({ value, delay }) => useDebounce(value, delay), { initialProps })

describe('useDebounce', () => {
  const initialValue = 'initialValue'
  const updatedValue = 'updatedValue'
  const delay = 500

  it('return initial value in first render', () => {
    const { result } = setUp({ value: initialValue, delay })
    expect(result.current).toBe(initialValue)
  })

  it('return updated value after delay', () => {
    const { result, rerender } = setUp({ value: initialValue, delay })

    rerender({ value: updatedValue , delay: delay})
    expect(result.current).toBe(initialValue)
    act(() => jest.advanceTimersByTime(200))
    expect(result.current).toBe(initialValue)
    act(() => jest.advanceTimersByTime(300))
    expect(result.current).toBe(updatedValue)
  })

  it('return new delay value', () => {
    const newDelay = 100
    const { result, rerender } = setUp({ value: initialValue, delay })

    rerender({ delay: newDelay, value: updatedValue })

    act(() => jest.advanceTimersByTime(100))

    expect(result.current).toBe(updatedValue)
  })
})