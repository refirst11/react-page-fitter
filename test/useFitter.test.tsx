import useFitter from '../src/index'
import React from 'react'
import { renderHook, render, screen } from '@testing-library/react'

describe('useFitter', () => {
  test('if arg is not match the pattern return undefined', () => {
    const { result } = renderHook(() => useFitter('test', '/'))
    expect(result.current).toBeUndefined()
  })

  const TestComponent = () => {
    return (
      <main id="content" className="container">
        Test
      </main>
    )
  }

  test('This id test should return true when the element width is Smaller than 1', () => {
    render(<TestComponent />)
    const element = screen.getByText('Test')

    Object.defineProperty(element, 'clientWidth', { value: 0 })
    Object.defineProperty(element, 'clientHeight', { value: 0 })
    const { result } = renderHook(() =>
      useFitter('#content', '/', { offsetX: -1, offsetY: -1 })
    )
    expect(result.current).toBe(true)
  })

  test('This className test should return true when the element width is Smaller than 1', () => {
    render(<TestComponent />)
    const element = screen.getByText('Test')

    Object.defineProperty(element, 'clientWidth', { value: 0 })
    Object.defineProperty(element, 'clientHeight', { value: 0 })
    const { result } = renderHook(() =>
      useFitter('.container', '/', { offsetX: -1, offsetY: -1 })
    )
    expect(result.current).toBe(true)
  })

  test('This tagname test should return true when the element width is Smaller than 1', () => {
    render(<TestComponent />)
    const element = screen.getByText('Test')

    Object.defineProperty(element, 'clientWidth', { value: 0 })
    Object.defineProperty(element, 'clientHeight', { value: 0 })
    const { result } = renderHook(() =>
      useFitter('main', '/', { offsetX: -1, offsetY: -1 })
    )
    expect(result.current).toBe(true)
  })

  test('This tagname test should return false when the element width is Larger than 999', () => {
    render(<TestComponent />)
    const element = screen.getByText('Test')

    Object.defineProperty(element, 'clientWidth', { value: 1000 })
    Object.defineProperty(element, 'clientHeight', { value: 1000 })
    const { result } = renderHook(() =>
      useFitter('main', '/', { offsetX: 1001, offsetY: 1001 })
    )
    expect(result.current).toBe(false)
  })
})
