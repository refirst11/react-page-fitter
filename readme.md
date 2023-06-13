# react-page-fitter

[![Release Status](https://img.shields.io/github/release/su-pull/react-page-fitter.svg)](https://github.com/su-pull/react-page-fitter/releases/latest)
[![Minzip Size](https://img.shields.io/bundlephobia/minzip/react-page-fitter)](https://bundlephobia.com/package/react-page-fitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a React hook that observe HTML element fits within the current viewport.

## Installation

```sh
npm install react-page-fitter
```

## Usage

```tsx
import useFitter from 'react-page-fitter'

function MyComponent() {
  const { pathname } = useLocation()
  const isFit = useFitter('.container', pathname)

  if (isFit) return null

  return <ScrollTop />
}
```

## API

useFitter (arg, pathname, {options})  
return value boolean | undefined.

Returns undefined if an invalid argument is passed.

## Parameters

- target: string (required): The class starting with a dot or tag name a target HTML element to be observe.

- pathname: string (required): Set a current dynamically pathname.  
  This is function trigger.

- options: { offsetX?: number, offsetY?: number } (optional): viewport property values.

  1\. offsetX: A number representing the horizontal offset to use if the element fits.  
  The default value is 0.

  2\. offsetY: A number representing the vertical offset to use if the element fits.  
  The default value is 0.

## License

MIT License
