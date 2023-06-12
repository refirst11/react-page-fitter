import { useCallback, useLayoutEffect, useState } from 'react'

type Option = {
  offsetX?: number
  offsetY?: number
}

const useFitter = (
  tagName: string,
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
  const elm = canUseDOM && document.getElementsByTagName(tagName as string)[0]

  // This the core callback function.
  const updateStatus = useCallback(() => {
    // skip effect, if elm and pathname is undefined
    if (elm === undefined || pathname === undefined) return setIsFit(undefined)
    // window and content size calculation
    const winWidth = innerWidth - offsetX
    const winHeight = innerHeight - offsetY
    const tagHeight = (elm && elm.clientHeight) as number
    const tagWidth = (elm && elm.clientWidth) as number
    setIsFit(tagHeight <= winHeight && tagWidth <= winWidth)
  }, [elm, pathname, offsetX, offsetY])

  // Page pathname updated and trigger the Callback and element is re evaluated.
  useClientEffect(updateStatus, [updateStatus])

  return isFit
}

export default useFitter
