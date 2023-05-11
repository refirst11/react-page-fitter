import { useCallback, useLayoutEffect, useState } from 'react'
import type { RefObject } from 'react'

type Option = {
  offsetX?: number
  offsetY?: number
}

type State = boolean | null | undefined

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

  // This the core callback function.
  const updateStatus = useCallback(() => {
    // skip effect, if ref is undefined
    if (ref === undefined) return setIsFit(null)
    // window and content size calculation
    const winWidth = window.innerWidth - offsetX
    const winHeight = window.innerHeight - offsetY
    const height = ref?.current?.clientHeight as number
    const width = ref?.current?.clientWidth as number
    setIsFit(height <= winHeight && width <= winWidth)
  }, [offsetX, offsetY, ref])

  // Watches for changes the element size and window size.
  useClientEffect(() => {
    // call updateStatus to set initial state
    updateStatus()

    // entry window resize listener
    // create constructor and watch's start ovserve
    window.addEventListener('resize', updateStatus)
    const observer = new MutationObserver(updateStatus)
    if (ref?.current)
      observer.observe(ref.current, {
        childList: true,
        subtree: true
      })

    // Clean up listener and observer on ref component unmount.
    return () => {
      window.removeEventListener('resize', updateStatus)
      observer.disconnect()
    }
  }, [updateStatus, location])

  return isFit
}
export default useFitter
import { Main } from './container/Main'
export { Main }
