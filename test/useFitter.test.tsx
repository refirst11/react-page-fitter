import useFitter from '../src/index'
import React from 'react'
import { renderHook, render, screen } from '@testing-library/react'

describe('useFitter', () => {
  test('if arg is miss matched value return undefined', () => {
    const { result } = renderHook(() => useFitter('test', '/'))
    expect(result.current).toBeUndefined()
  })

  const refObject = React.createRef<HTMLDivElement>()
  const TestComponent = () => {
    return <main className="container">Test Component</main>
  }

  test('should return true when the element width is Smaller than 1', () => {
    render(<TestComponent />)
    const element = screen.getByText('Test Component')

    Object.defineProperty(element, 'clientWidth', { value: 0 })
    Object.defineProperty(element, 'clientHeight', { value: 0 })
    const { result } = renderHook(() =>
      useFitter('.container', '/', { offsetX: -1, offsetY: -1 })
    )
    expect(result.current).toBe(true)
  })

  test('should return true when the element width is Smaller than 1', () => {
    render(<TestComponent />)
    const element = screen.getByText('Test Component')

    Object.defineProperty(element, 'clientWidth', { value: 0 })
    Object.defineProperty(element, 'clientHeight', { value: 0 })
    const { result } = renderHook(() =>
      useFitter('main', '/', { offsetX: -1, offsetY: -1 })
    )
    expect(result.current).toBe(true)
  })

  test('should return false when the element width is greater than 999', () => {
    render(<TestComponent />)
    const element = screen.getByText('Test Component')

    Object.defineProperty(element, 'clientWidth', { value: 1000 })
    Object.defineProperty(element, 'clientHeight', { value: 1000 })
    const { result } = renderHook(() =>
      useFitter('main', '/', { offsetX: 1001, offsetY: 1001 })
    )
    expect(result.current).toBe(false)
  })
})
