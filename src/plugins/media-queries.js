import React from 'react'
import Hashes from 'jshashes'

import { expandStyle, createCSSDeclarations } from '../utils/expand-css'

const mqls = new Map()

export default (element, forceUpdate, config) => {
  const { props } = element
  const { css } = props

  if (!config.matchMedia) {
    // Uses a 7-length substring of the MD5 of the css for a unique
    // id for className
    const cssHash = new Hashes.MD5().hex(JSON.stringify(css)).substr(0, 7)
    const className = `ur-${cssHash}`

    const mqs = Object.keys(css).reduce(
      (cssAccumulator, property) => {
        if (!property.match(/@media/)) return cssAccumulator
        return `${cssAccumulator}${property}{.${className}{${
          createCSSDeclarations(expandStyle(css[property]))
        }}}`
      },
      ''
    )
    const newProps = {
      ...props,
      className: props.className ? `${props.className} ${className}` : className,
      children: props.children.concat([
        React.createElement('style', {}, mqs),
      ]),
    }
    return React.cloneElement(element, newProps)
  }

  const newStyle = Object.keys(css).reduce(
    (styleAccumulator, property) => {
      if (!property.match(/@media/)) return styleAccumulator

      if (!mqls.get(property)) {
        mqls.set(property, config.matchMedia(property.split('@media ')[1]))
        mqls.get(property).addListener(() => {
          forceUpdate()
        })
      }

      if (mqls.get(property).matches) {
        return {
          ...styleAccumulator,
          ...css[property],
        }
      }

      return styleAccumulator
    },
    {}
  )

  return React.cloneElement(
    element,
    { ...props, style: { ...props.style, ...newStyle } }
  )
}
