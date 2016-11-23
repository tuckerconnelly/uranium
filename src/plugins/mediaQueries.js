import React from 'react'

import { URANIUM_CLASSNAME } from './copyStyles'
import makeClassName from '../utils/makeClassName'
import { expandStyle, createCSSDeclarations } from '../utils/expandCSS'
import isWeb from '../utils/isWeb'

const mqls = new Map()

console.log(isWeb())

export default (element, forceUpdate) => {
  const { props } = element
  const { css } = props

  const className = makeClassName(css)

  if (!isWeb()) {
    const newStyle = Object.keys(css).reduce(
      (styleAccumulator, property) => {
        if (!property.match(/@media/)) return styleAccumulator

        if (!mqls.get(className)) {
          mqls.set(className, global.matchMedia(property.split('@media ')[1]))
          mqls.get(className).addListener(() => forceUpdate())
        }

        if (mqls.get(className).matches) {
          return { ...styleAccumulator, ...css[property] }
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

  // If web

  // Get a list of animated values to apply
  const animatedValuesForMQ = Object.keys(css).reduce((animatedValues, key) => {
    if (!key.match(/@media/)) return animatedValues

    // Listen for resize/mq change to apply new animated value
    if (!mqls.get(className)) {
      mqls.set(className, global.matchMedia(key.split('@media ')[1]))
      mqls.get(className).addListener(() => forceUpdate())
    }

    if (!mqls.get(className).matches) return animatedValues

    const mqAnimatedValues =
      Object.keys(css[key]).reduce((mqAnimatedValues, mqKey) => {
        if (typeof css[key][mqKey] !== 'object' || !css[key][mqKey].__getValue) {
          return mqAnimatedValues
        }

        return { ...mqAnimatedValues, [mqKey]: css[key][mqKey] }
      }, {})

    return { ...animatedValues, ...mqAnimatedValues }
  }, {})

  // Modify the stylesheet

  // Look for media queries, generate a css declaration for each, stuff 'em all in a string
  const mqs = Object.keys(css).reduce(
    (cssAccumulator, property) => {
      if (!property.match(/@media/)) return cssAccumulator

      return `${cssAccumulator}${property}{.${URANIUM_CLASSNAME}.${className}{${
        createCSSDeclarations(expandStyle(css[property]))
      }}}`
    },
    ''
  )

  // If there aren't any media queries, return out, nothing left to do
  if (!mqs.length) return element

  // Style tag introduced by copyStyles plugin
  const styleTag = props.children.filter(child => child && child.type === 'style')[0]
  const styleTagWithMediaQueries = React.createElement(
    'style',
    { key: className },
    styleTag.props.children + mqs
  )

  let newChildren = props.children
  // If the children is not an array, it's just the original style
  // tag added in copyStyles.js
  if (!Array.isArray(props.children)) {
    newChildren = styleTagWithMediaQueries
  } else {
    newChildren = props.children
      .filter(child => child && child.type !== 'style')
      .concat([styleTagWithMediaQueries])
  }

  const newProps = {
    ...props,
    style: { ...props.style, ...animatedValuesForMQ },
    children: newChildren,
  }
  return React.cloneElement(element, newProps)
}
