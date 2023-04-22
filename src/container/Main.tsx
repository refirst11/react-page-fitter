import React, { useRef } from 'react'
import useFitter from '..'
import type { ReactNode } from 'react'

type MainProps = {
  children: ReactNode
  className?: string
  classFitIn: string
  classFitOut: string
}

export const Main = ({
  children,
  className,
  classFitIn,
  classFitOut
}: MainProps) => {
  const ref = useRef<HTMLElement>(null)
  const isFit = useFitter({ optional: ref })
  const fit = isFit ? classFitIn : classFitOut
  const classed = className + ' ' + fit
  return (
    <main ref={ref} className={classed}>
      {children}
    </main>
  )
}
