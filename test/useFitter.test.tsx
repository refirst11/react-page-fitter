import useFitter from '../src/index'
import React from 'react'
import { renderHook, render, screen } from '@testing-library/react'

describe('useFitter', () => {
  test('should start with an undefined value', () => {
    const { result } = renderHook(() => useFitter())
    expect(result.current.isFit).toBeUndefined()
  })

  test('should start with a null value after initial rendering', () => {
    const { result } = renderHook(() => useFitter())
    expect(result.current.isRendering).toBeNull()
  })

  const refObject = React.createRef<HTMLDivElement>()
  const TestComponent = () => {
    return <div ref={refObject}>Test Component</div>
  }

  test('should return true when the ref object width is Smaller than 1', () => {
    render(<TestComponent />)
    const element = screen.getByText('Test Component')

    Object.defineProperty(element, 'clientWidth', { value: 0 })
    Object.defineProperty(element, 'clientHeight', { value: 0 })
    const { result } = renderHook(() =>
      useFitter(refObject, undefined, { offsetX: -1, offsetY: -1 })
    )
    expect(result.current.isFit).toBe(true)
  })

  test('should return false when the ref object width is greater than 999', () => {
    render(<TestComponent />)
    const element = screen.getByText('Test Component')

    Object.defineProperty(element, 'clientWidth', { value: 1000 })
    Object.defineProperty(element, 'clientHeight', { value: 1000 })
    const { result } = renderHook(() =>
      useFitter(refObject, undefined, { offsetX: 1001, offsetY: 1001 })
    )
    expect(result.current.isFit).toBe(false)
  })
})
