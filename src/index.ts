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

  // Client safe.
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
  const useClientEffect = canUseDOM ? useLayoutEffect : () => {}
  const elm = canUseDOM && document.querySelector(target)

  // This the core callback function.
  const updateStatus = useCallback(() => {
    // skip effect, if elm and pathname is undefined
    if (!elm || !pathname) return setIsFit(undefined)
    // window and content size calculation
    const winWidth = innerWidth - offsetX
    const winHeight = innerHeight - offsetY
    const tagHeight = elm.clientHeight
    const tagWidth = elm.clientWidth
    setIsFit(tagHeight <= winHeight && tagWidth <= winWidth)
  }, [elm, pathname, offsetX, offsetY])

  // Page location updated and trigger the Callback and element is re evaluated.
  // Normally this is the only trigger.
  useClientEffect(updateStatus, [updateStatus])

  // Window reload function.
  useClientEffect(() => {
    // entry resize listener
    window.addEventListener('onload', updateStatus)
    // clean up the remove listener the component unmount
    return () => window.removeEventListener('onload', updateStatus)
  }, [updateStatus])

  // Window resize function.
  useClientEffect(() => {
    window.addEventListener('resize', updateStatus)
    return () => window.removeEventListener('resize', updateStatus)
  }, [updateStatus])

  // Realtime content resize event watcher function.
  useClientEffect(() => {
    // create MutationObserver constructor
    const observer = new MutationObserver(updateStatus)
    // start observing the element and child element the watches real time event
    if (elm) observer.observe(elm, { childList: true, subtree: true })
    // clean up the observer when the ref component unmount
    return () => observer.disconnect()
  }, [updateStatus])

  return isFit
}

export default useFitter
