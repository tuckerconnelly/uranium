import React from 'react'

export default element => {
  const { props } = element
  const { css } = props

  if (typeof css === 'object' && Array.isArray(css)) {
    const newCSS = css.reduce(
      (cssAccumulator, currentStyle) => ({ ...cssAccumulator, ...currentStyle }),
      {}
    )

    return React.cloneElement(element, { ...props, css: newCSS })
  }

  return element
}
