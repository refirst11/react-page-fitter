import { useLocation } from 'react-router-dom'
import { useCallback, useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

export type Option = {
  offsetX?: number
  offsetY?: number
  optional?: RefObject<HTMLElement>
}

const useFitter = ({
  offsetX = 0,
  offsetY = 0,
  optional: ref
}: Partial<Option> = {}) => {
  const { pathname } = useLocation()
  const [isFit, setIsFit] = useState(true)

  // Callback function a this file's core.
  const updateStatus = useCallback(() => {
    const winWidth = window.innerWidth - offsetX
    const winHeight = window.innerHeight - offsetY
    const height = ref?.current?.clientHeight as number
    const width = ref?.current?.clientWidth as number
    setIsFit(height < winHeight && width < winWidth)
  }, [offsetX, offsetY, ref])

  // Page transition function.
  useLayoutEffect(() => {
    return updateStatus()
  }, [pathname, updateStatus])

  // Realtime resize event watcher function.
  useLayoutEffect(() => {
    // create constructor watch's realtime event.
    const observer = new ResizeObserver(updateStatus)
    // start ovserving the element.
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
