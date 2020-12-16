import { renderHook } from '@testing-library/react-hooks'
import { useId } from '../useId'

describe('useId', () => {
    it('should return ID', () => {
        const format = renderHook(() => useId("150"));
        expect(JSON.parse(format.result.current)).toBe(150);
    })
    // if input is not entered useId automaticaly increase the value
    it('should return ID 1', () => {
        const format = renderHook(() => useId(null));
        expect(JSON.parse(format.result.current)).toBe(1);
    })

    it('should return ID 2', () => {
        const format = renderHook(() => useId());
        expect(JSON.parse(format.result.current)).toBe(2);
    })

    it('should return ID 3', () => {
        const format = renderHook(() => useId());
        expect(JSON.parse(format.result.current)).toBe(3);
    })
  })