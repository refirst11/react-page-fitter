import { useCallback, useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

type Option = {
  offsetX?: number
  offsetY?: number
}

type State = boolean | undefined

const useFitter = (
  ref?: RefObject<HTMLElement>,
  location?: string,
  { offsetX = 0, offsetY = 0 }: Option = {}
) => {
  const [isFit, setIsFit] = useState<State>(undefined)
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

  // Page location updated and trigger the ref, the useCallback is reevaluated.
  useClientEffect(updateStatus, [location])

  // Window resize effect.
  useClientEffect(() => {
    // entry resize listener
    window.addEventListener('resize', updateStatus)
    // clean up the remove listener the component unmount
    return () => window.removeEventListener('resize', updateStatus)
  }, [updateStatus])

  // Realtime content resize event watcher effect.
  useClientEffect(() => {
    // create MutationObserver constructor watch's realtime event
    const observer = new MutationObserver(updateStatus)
    // start observing the element and child element
    if (ref?.current)
      observer.observe(ref.current, { childList: true, subtree: true })
    // clean up the observer when the ref component unmount
    return () => observer.disconnect()
  }, [updateStatus])

  return isFit
}
export default useFitter
import { Main } from './container/Main'
export { Main }
