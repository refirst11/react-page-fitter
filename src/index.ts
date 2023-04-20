import { useState, useEffect, RefObject } from 'react'

export interface FitterOptions {
  offsetY?: number
  offsetX?: number
}

export interface UseFitterResult {
  isFitted: boolean
}

const useFitter = (
  ref: RefObject<HTMLElement>,
  { offsetY = 0, offsetX = 0 }: Partial<FitterOptions> = {}
): UseFitterResult => {
  const [isFitted, setIsFitted] = useState(true)

  useEffect(() => {
    // Create ResizeObserver and watch for changes to the element's dimensions
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        // Check if element fits within the viewport
        const windowHeight = window.innerHeight - offsetY
        const windowWidth = window.innerWidth - offsetX
        setIsFitted(
          entry.target.clientHeight < windowHeight &&
            entry.target.clientWidth < windowWidth
        )
      })
    })

    // Start observing the element's dimensions
    if (ref.current) observer.observe(ref.current)

    // Clean up the observer when the component unmounts
    return () => observer.disconnect()
  }, [offsetX, offsetY, ref, setIsFitted, isFitted])

  return { isFitted }
}

export default useFitter
