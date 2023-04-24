import { useCallback, useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

export type Option = {
  offsetX?: number
  offsetY?: number
  refElement?: RefObject<HTMLElement>
}

const useFitter = ({
  offsetX = 0,
  offsetY = 0,
  refElement: ref
}: Partial<Option> = {}) => {
  const [isFit, setIsFit] = useState<boolean | undefined>(undefined)

  // client safe path and effect
  const isClient = typeof window !== 'undefined'
  const pathname = isClient && window.location.pathname
  const canUseDOM = !!(
    isClient &&
    window.document &&
    window.document.createElement
  )
  const useSafeLayoutEffect = canUseDOM ? useLayoutEffect : () => {}

  // callback function a this file's core.
  const updateStatus = useCallback(() => {
    const winWidth = window.innerWidth - offsetX
    const winHeight = window.innerHeight - offsetY
    const height = ref?.current?.clientHeight as number
    const width = ref?.current?.clientWidth as number
    setIsFit(height < winHeight && width < winWidth)
  }, [offsetX, offsetY, ref])

  // page transition function.
  useSafeLayoutEffect(() => {
    return updateStatus()
  }, [pathname, updateStatus])

  // realtime resize event watcher function.
  useSafeLayoutEffect(() => {
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
