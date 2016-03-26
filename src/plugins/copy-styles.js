import React from 'react'

export default element => {
  const { props } = element
  const { style, css } = props

  const newStyle = Object.keys(css).reduce(
    (styleAccumulator, currentProperty) => {
      if (
        currentProperty.match(/@media/)
      ) return styleAccumulator

      return {
        ...styleAccumulator,
        [currentProperty]: css[currentProperty],
      }
    },
    style || {}
  )

  return React.cloneElement(element, { ...props, style: newStyle })
}
