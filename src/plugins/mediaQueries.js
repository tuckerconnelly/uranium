import React from 'react'
import Hashes from 'jshashes'

import { expandStyle, createCSSDeclarations } from '../utils/expandCSS'

const mqls = new Map()

// Recursively removes functions and nested objects from an object
// Needed because Animated.values had circular dependencies
// which were throwing errors in JSON.stringify below
const flatten = object => {
  const cleanObject = {}
  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue
    cleanObject[key] =
      typeof object[key] === 'object' ||
      typeof object[key] === 'function' ?
        object[key].toString() :
        object[key]
  }
  return cleanObject
}

export default (element, forceUpdate) => {
  const { props } = element
  const { css } = props

  if (!window.matchMedia) {
    // Uses a 7-length substring of the MD5 of the css for a unique
    // id for className
    const cssHash = new Hashes.MD5().hex(JSON.stringify(flatten(css))).substr(0, 7)
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

    if (!mqs.length) return element

    let newChildren = React.createElement('style', { key: cssHash }, mqs)

    if (typeof props.children === 'function') {
      newChildren = [newChildren, props.children()]
    } else if (!Array.isArray(props.children)) {
      newChildren = [newChildren, props.children]
    } else {
      newChildren = props.children.concat([newChildren])
    }

    const newProps = {
      ...props,
      className: props.className ?
        [...new Set(props.className.split(' ').concat([className]))].join(' ') :
        className,
      children: newChildren,
    }
    return React.cloneElement(element, newProps)
  }

  const newStyle = Object.keys(css).reduce(
    (styleAccumulator, property) => {
      if (!property.match(/@media/)) return styleAccumulator

      if (!mqls.get(property)) {
        mqls.set(property, window.matchMedia(property.split('@media ')[1]))
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
