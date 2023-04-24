import React, { useRef } from 'react'
import type { ReactNode } from 'react'
import useFitter from '..'

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
  const isFit = useFitter({ refElement: ref })
  const classToApply = isFit ? classFitIn : classFitOut
  const classes = className + ' ' + classToApply
  return (
    <main ref={ref} className={classes}>
      {children}
    </main>
  )
}
