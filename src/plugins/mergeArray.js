import React from 'react'

function reduceStyle(style) {
  if (typeof style !== 'object') return style
  if (!Array.isArray(style)) return style
  return style.reduce(
    (styleAccumulator, currentStyle) =>
      currentStyle ? ({ ...styleAccumulator, ...currentStyle }) : styleAccumulator,
    {}
  )
}

export default element => {
  const { props } = element
  const { css, style } = props
  if (typeof css !== 'object' || !Array.isArray(css)) return element

  const newCSS = reduceStyle(css)
  const newStyle = reduceStyle(style)

  return React.cloneElement(element, { ...props, css: newCSS, style: newStyle })
}
