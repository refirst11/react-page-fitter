import { useCallback, useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

type Option = {
  offsetX?: number
  offsetY?: number
}

const useFitter = (
  ref?: RefObject<HTMLElement>,
  location?: string,
  { offsetX = 0, offsetY = 0 }: Option = {}
) => {
  const [isFit, setIsFit] = useState<boolean | undefined>(undefined)
  // client safe effect
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
  const useClientEffect = canUseDOM ? useLayoutEffect : () => {}

  // callback function a this file's core.
  const updateStatus = useCallback(() => {
    const winWidth = window.innerWidth - offsetX
    const winHeight = window.innerHeight - offsetY
    const height = ref?.current?.clientHeight as number
    const width = ref?.current?.clientWidth as number
    setIsFit(height < winHeight && width < winWidth)
  }, [offsetX, offsetY, ref])

  // page transition function.
  useClientEffect(() => {
    return updateStatus()
  }, [location, updateStatus])

  // realtime resize event watcher function.
  useClientEffect(() => {
    // create constructor watch's realtime event.
    const observer = new ResizeObserver(updateStatus)
    // start observing the element.
    if (ref?.current) {
      observer.observe(ref.current)
    }
    // clean up the observer when the ref component unmount.
    return () => {
      observer.disconnect()
    }
  }, [ref, updateStatus])
  return isFit
}
export default useFitter
import { Main } from './container/Main'
export { Main }
