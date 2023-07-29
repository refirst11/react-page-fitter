# react-page-fitter

[![Release Status](https://img.shields.io/github/release/su-pull/react-page-fitter.svg)](https://github.com/su-pull/react-page-fitter/releases/latest)
[![Minzip Size](https://img.shields.io/bundlephobia/minzip/react-page-fitter)](https://bundlephobia.com/package/react-page-fitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

This is a React hook that observe HTML element fits within the current viewport or element.

## Installation

```sh
npm install react-page-fitter
```

## Usage

```tsx
import useFitter from 'react-page-fitter'

function MyComponent() {
  const pathname = // useLocation...
  const isFit = useFitter('.class')

  return isFit && <CustomComponents/>
}
```

## API

useFitter (argument, {options})  
return value boolean | undefined.

Returns undefined if an invalid argument is passed.

## Argument

| Parameter         | Meaning                                              |
| ----------------- | ---------------------------------------------------- |
| target (required) | The judgement target element by tag, className or id |

## Options(object)

| Field     | Key                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| offsetX   | Horizontal viewport offsetX number when not using parentBox, The default value is 0                           |
| offsetY   | Vertical viewport offsetY number when not using parentBox, The default value is 0                             |
| parentBox | The judgement parentBox element by tag, className or id is judged in place of the viewport, default undefined |
| pathname  | The dynamic pathname to render when placing at layout level                                                   |

## License

MIT License
