import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

type Option = {
  offsetX?: number
  offsetY?: number
}

type Render = undefined | null
type Calculate = undefined | boolean

const useFitter = (
  ref?: RefObject<HTMLElement>,
  location?: string,
  { offsetX = 0, offsetY = 0 }: Option = {}
) => {
  const [isRendering, setIsRendering] = useState<Render>(undefined)
  //  Start with an undefined value.
  useEffect(() => {
    return setIsRendering(null)
  }, [])

  const [isFit, setIsFit] = useState<Calculate>(undefined)
  // Client safe effect.
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
  const useClientEffect = canUseDOM ? useLayoutEffect : () => {}

  // Callback function a this file's core.
  const updateStatus = useCallback(() => {
    const winWidth = window.innerWidth - offsetX
    const winHeight = window.innerHeight - offsetY
    const height = ref?.current?.clientHeight as number
    const width = ref?.current?.clientWidth as number
    setIsFit(height <= winHeight && width <= winWidth)
  }, [offsetX, offsetY, ref])

  // Watches for changes the element size and window size, update the accordingly.
  // Trigger an initial update when the effect is first run.
  useClientEffect(() => {
    // skip effect if ref is undefined
    if (ref === undefined) return

    // call updateStatus to set initial state
    updateStatus()

    // entry window resize listener
    window.addEventListener('resize', updateStatus)

    // create MutationObserver constructor watch's realtime element size change event
    const observer = new MutationObserver(updateStatus)

    // start observing the element and child element
    if (ref?.current)
      observer.observe(ref.current, { childList: true, subtree: true })

    // clean up the listener and observer when the ref component unmount
    return () => {
      window.removeEventListener('resize', updateStatus)
      observer.disconnect()
    }
  }, [updateStatus, location])

  return { isFit, isRendering }
}
export default useFitter
import { Main } from './container/Main'
export { Main }
