import * as React from 'react'
import { createPopper, VirtualElement, Placement } from '@popperjs/core'
import { setAttributes } from '@kodiak-ui/utils'
import { usePortal, useOnClickOutside, useId, useKey } from '@kodiak-ui/hooks'

interface UseTooltipReturn {
  isVisible: boolean
  register: (
    ref: TooltipRef | null,
    options?: RegisterOptions,
  ) => { ref: TooltipRef; options?: RegisterOptions }
  getTriggerProps: () => {}
  getTooltipProps: () => {}
  getArrowProps: () => {}
  Portal: any
}

interface UseTooltipProps {
  placement?: Placement
  offset?: [number, number]
}

type TooltipRef = HTMLElement | null

interface RegisterOptions {
  trigger?: boolean
  arrow?: boolean
}

interface RefAndOptions {
  ref: TooltipRef
  options?: RegisterOptions
}

export const fromEntries = (entries: any) =>
  entries.reduce((acc: any, [key, value]: [any, any]) => {
    acc[key] = value
    return acc
  }, {})

export function useTooltip({
  placement = 'top',
  offset = [0, 10],
}: UseTooltipProps = {}): UseTooltipReturn {
  const triggerRef = React.useRef<HTMLElement | null>(null)
  const tooltipRef = React.useRef<HTMLElement | null>(null)
  const arrowRef = React.useRef<HTMLElement | null>(null)
  const popperInstanceRef = React.useRef<any>(null)

  const id = useId()

  const {
    isOpen: isVisible,
    handleOpenPortal,
    handleClosePortal,
    Portal,
    portalRef,
  } = usePortal()

  React.useLayoutEffect(
    function initializePopper() {
      if (!isVisible && (!triggerRef.current || !tooltipRef.current)) {
        return
      }

      const popperInstance = createPopper(
        triggerRef.current as Element | VirtualElement,
        tooltipRef.current as HTMLElement,
        {
          placement,
          modifiers: [
            offset ? { name: 'offset', options: { offset } } : {},
            arrowRef && arrowRef.current
              ? {
                  name: 'arrow',
                  options: { element: arrowRef && arrowRef.current },
                }
              : {},
          ],
        },
      )

      popperInstanceRef.current = popperInstance

      return () => {
        popperInstance.destroy()
        popperInstanceRef.current = null
      }
    },
    [isVisible, offset, placement],
  )

  useOnClickOutside({
    ref: portalRef as React.MutableRefObject<Element>,
    refException: triggerRef as React.MutableRefObject<Element>,
    handler: () => {
      handleClosePortal({})
    },
  })

  useKey({
    key: 'Escape',
    target: triggerRef.current,
    handler: () => {
      if (isVisible) {
        handleClosePortal({})
      }
    },
  })

  function registerTriggerElement({
    ref,
    options,
  }: RefAndOptions): RefAndOptions {
    if (ref && options && options.trigger) {
      triggerRef.current = ref

      setAttributes(triggerRef.current, {
        'aria-describedby': `kodiak-ui-tooltip-${id}`,
      })
    }

    return { ref, options }
  }

  function registerTooltipElement({
    ref,
    options,
  }: RefAndOptions): RefAndOptions {
    if ((ref && !options) || (options && !options.trigger && !options.arrow)) {
      tooltipRef.current = ref
      setAttributes(tooltipRef.current, {
        id: `kodiak-ui-tooltip-${id}`,
        role: 'tooltip',
      })
    }

    return { ref, options }
  }

  function registerArrowElement({
    ref,
    options,
  }: RefAndOptions): RefAndOptions {
    if (ref && options && options.arrow) {
      arrowRef.current = ref
    }

    return { ref, options }
  }

  function register(
    ref: TooltipRef,
    options?: RegisterOptions,
  ): {
    ref: TooltipRef
    options?: RegisterOptions
  } {
    return registerArrowElement(
      registerTriggerElement(registerTooltipElement({ ref, options })),
    )
  }

  const getTriggerProps = React.useCallback(
    function getTriggerProps() {
      return {
        onFocus: handleOpenPortal,
        onBlur: handleClosePortal,
        onMouseEnter: handleOpenPortal,
        onMouseLeave: handleClosePortal,
      }
    },
    [handleOpenPortal, handleClosePortal],
  )

  const getTooltipProps = React.useCallback(function getTooltipProps() {
    return {}
  }, [])

  const getArrowProps = React.useCallback(
    function getArrowProps() {
      return {
        placement,
      }
    },
    [placement],
  )

  return {
    isVisible,
    register,
    getTriggerProps,
    getTooltipProps,
    getArrowProps,
    Portal,
  }
}