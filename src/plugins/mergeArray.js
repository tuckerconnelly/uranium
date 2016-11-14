import React from 'react'
import merge from 'lodash/merge'

function reduceStyle(style) {
  if (typeof style !== 'object') return style
  if (!Array.isArray(style)) return style
  return style.reduce((mergedStyles, currentStyle) =>
    merge({}, mergedStyles, currentStyle),
  {})
}

export default element => {
  const { props } = element
  const { css, style } = props

  const newCSS = reduceStyle(css)
  const newStyle = reduceStyle(style)

  return React.cloneElement(element, { ...props, css: newCSS, style: newStyle })
}
