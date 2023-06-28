import { useCallback, useLayoutEffect, useState } from 'react'

type Option = {
  offsetX?: number
  offsetY?: number
}

const useFitter = (
  target: string,
  pathname: string,
  { offsetX = 0, offsetY = 0 }: Option = {}
) => {
  const [isFit, setIsFit] = useState<boolean | undefined>(undefined)
  const [element, setElement] = useState<Element>()

  // Client safe.
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )

  const useClientEffect = canUseDOM ? useLayoutEffect : () => {}

  // This the core callback function.
  const updateStatus = useCallback(() => {
    // skip effect, if element is undefined
    if (!element) return setIsFit(undefined)
    // define a variable with an offset to the window size
    const winWidth = innerWidth - offsetX
    const winHeight = innerHeight - offsetY
    // calculate relative value from element to viewport
    const rect = element.getBoundingClientRect()
    setIsFit(
      rect.top >= 0 &&
        rect.bottom <= winHeight &&
        rect.left >= 0 &&
        rect.right <= winWidth
    )
  }, [element, offsetX, offsetY])

  // Get Server Side page element, Trigger of pathname will trigger updateStatus.
  useClientEffect(() => {
    return setElement(document.querySelector(target) as Element)
  }, [target, pathname])

  // Page location updated and trigger the Callback and element is re evaluated.
  // Normally this is the only trigger.
  useClientEffect(updateStatus, [updateStatus])

  // Window resize function.
  useClientEffect(() => {
    window.addEventListener('resize', updateStatus)
    return () => window.removeEventListener('resize', updateStatus)
  }, [updateStatus])

  // Scroll event function.
  useClientEffect(() => {
    window.addEventListener('scroll', updateStatus)
    return () => window.removeEventListener('scroll', updateStatus)
  }, [updateStatus])

  // Realtime content resize event watcher function.
  useClientEffect(() => {
    // create MutationObserver constructor
    const observer = new MutationObserver(updateStatus)
    // start observing the element and child element the watches real time event
    if (element)
      observer.observe(element, {
        attributes: true,
        childList: true,
        subtree: true
      })
    // clean up the observer when the ref component unmount
    return () => observer.disconnect()
  }, [updateStatus])

  return isFit
}

export default useFitter
