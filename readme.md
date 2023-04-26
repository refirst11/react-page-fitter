# react-page-fitter

[![Release Status](https://img.shields.io/github/release/su-pull/react-page-fitter.svg)](https://github.com/su-pull/react-page-fitter/releases/latest)
![code size](https://img.shields.io/github/languages/code-size/su-pull/react-page-fitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a React hook that observe HTML element fits within the current viewport.

## Installation

```sh
npm install react-page-fitter
```

## Usage

```tsx
import useFitter, { Main } from 'react-page-fitter'

function MyComponent({ children }) {
  const pathname = usePathname()
  const isFit = useFitter()

  return (
    <>
      {isFit !== undefined && (
        <Main location={pathname} classFitIn={style} classFitOut={style}>
          {children}
        </Main>
      )}
    </>
  )
}
```

## API

useFitter (ref, pathname, {options})

## Arguments

- ref (optional): RefObject to the HTML element to be observe.  
  If not set, it will observe the Main component.

- pathname (optional): Set a dynamically changing pathname variable.  
  If use the Main component, set it to location in Main's property.

- {options} (optional): viewport property values.

  1\. offsetX: A number representing the horizontal offset to use if the element fits.  
  The default value is 0.

  2\. offsetY: A number representing the vertical offset to use if the element fits.  
  The default value is 0.

## Return value

The useFitter() is return a boolean value based on whether the element being watched fit.  
Return undefined if the computation has not completed.

## Main Properties

- location(require)
- classFitIn: Applies if element fit is true.
- classFitOut: Applies if element fit is false.
- className: optional.

## License

The MIT License.
