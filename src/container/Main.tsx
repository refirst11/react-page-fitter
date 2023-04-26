import React, { useRef } from 'react'
import type { ReactNode } from 'react'
import useFitter from '..'

type FitPage = {
  children: ReactNode
  classFitIn: string
  classFitOut: string
  className?: string
  location: string
}

export const Main = ({
  children,
  classFitIn,
  classFitOut,
  className,
  location
}: FitPage) => {
  const ref = useRef<HTMLElement>(null)
  const isFit = useFitter(ref, location)
  const classToApply = isFit ? classFitIn : classFitOut
  const classes = className + ' ' + classToApply
  return (
    <main ref={ref} className={classes}>
      {children}
    </main>
  )
}
