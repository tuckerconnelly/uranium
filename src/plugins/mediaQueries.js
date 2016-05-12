import React from 'react'
import { Platform } from 'react-native-universal'
import matchMedia from 'react-native-match-media'

import makeClassName from '../utils/makeClassName'
import { expandStyle, createCSSDeclarations } from '../utils/expandCSS'

const mqls = new Map()

export default (element, forceUpdate) => {
  const { props } = element
  const { css } = props

  if (Platform.OS !== 'web') {
    const newStyle = Object.keys(css).reduce(
      (styleAccumulator, property) => {
        if (!property.match(/@media/)) return styleAccumulator

        if (!mqls.get(property)) {
          mqls.set(property, matchMedia(property.split('@media ')[1]))
          mqls.get(property).addListener(() => forceUpdate())
        }

        if (mqls.get(property).matches) {
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

  // Modify the stylesheet if web

  const className = makeClassName(css)

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
    children: newChildren,
  }
  return React.cloneElement(element, newProps)
}
