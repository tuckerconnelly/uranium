import React from 'react'

export default element => {
  const { props } = element
  const { style } = props

  if (typeof style === 'object' && Array.isArray(style)) {
    const newStyle = style.reduce(
      (newStyle, currentStyle) => ({ ...newStyle, ...currentStyle }),
      {}
    )

    return React.cloneElement(element, { ...props, style: newStyle })
  }

  return element
}
