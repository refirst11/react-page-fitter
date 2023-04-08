# react-page-fitter

[![Release Status](https://img.shields.io/github/release/su-pull/react-page-fitter.svg)](https://github.com/su-pull/react-page-fitter/releases/latest)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

This is a React hook that checking if an HTML element fits within the current viewport.

## Installation

```sh
npm install react-page-fitter
```

## Usage

```tsx
import { useRef } from 'react'
import useFitter from 'react-page-fitter'

function MyComponent() {
  const pageRef = useRef(null)
  const { isFitted } = useFitter(pageRef, { offsetY: 100 })

  return (
    <div ref={pageRef}>
      {isFitted
        ? 'The page fits within the viewport.'
        : 'The page overflows the viewport.'}
    </div>
  )
}
```

## API

useFitter(ref, options)

Parameters:

- ref (required): A RefObject that points to the HTML element to be checked.
- options (optional): An object with the following optional properties:

  - offsetY: A number representing the vertical offset from the top of the viewport to use when checking if the element fits. Defaults to 0.
  - offsetX: A number representing the horizontal offset from the left of the viewport to use when checking if the element fits. Defaults to 0.

Returns:
An object with the following properties:

- isFitted: A boolean indicating whether the element fits within the viewport.

## License

This project is licensed under the terms of the MIT license.
