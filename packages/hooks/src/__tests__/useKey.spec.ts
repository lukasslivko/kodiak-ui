import { renderHook, RenderHookOptions} from '@testing-library/react-hooks'
import { fireEvent, render } from '@testing-library/react'
import { useKey } from '../useKey'

    
describe('useKey', () => {
    it('shoul return event key', () => {
        var data = "not called";
        const event = new window.KeyboardEvent('keydown', {key: "Escape"});
        
        const handlerEvent = (event: KeyboardEvent) => {
            data = event.key;
        }
        renderHook(() =>useKey({
            key: 'Escape',
            target: window,
            handler: handlerEvent,
          }));
          fireEvent(
            window,
            event
          )
        document.dispatchEvent(event);
        expect(data).toEqual("Escape");
    })

    it('shoul return event key', () => {
        var data = "not called";
        const event = new window.KeyboardEvent('keydown', {key: "Enter"});
        
        const handlerEvent = (event: KeyboardEvent) => {
            data = event.key;
        }
        renderHook(() =>useKey({
            key: 'Enter',
            target: window,
            handler: handlerEvent,
          }));
          fireEvent(
            window,
            event
          )
        document.dispatchEvent(event);
        expect(data).toEqual("Enter");
    })

    it('shoul return event key', () => {
        var data = "not called";
        const event = new window.KeyboardEvent('keydown', {key: "Enter"});
        
        const handlerEvent = (event: KeyboardEvent) => {
            data = event.key;
        }
        renderHook(() =>useKey({
            key: '',
            target: window,
            handler: handlerEvent,
          }));
          fireEvent(
            window,
            event
          )
        document.dispatchEvent(event);
        expect(data).toEqual("not called");
    })

    it('shoul return event key', () => {
        var data = "not called";
        const event = new window.KeyboardEvent('keydown', {key: "Enter"});
        
        const handlerEvent = (event: KeyboardEvent) => {
            data = event.key;
        }
        renderHook(() =>useKey({
            key: 'Enter',
            target: null,
            handler: handlerEvent,
          }));
          fireEvent(
            window,
            event
          )
        document.dispatchEvent(event);
        expect(data).toEqual("not called");
    })
    
    
  })