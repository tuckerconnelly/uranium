import React from 'react'

const mqls = new Map

export default (element, forceUpdate) => {
  const { props } = element
  const { style } = props

  const transformedStyle = Object.keys(style).reduce(
    (styleAccumulator, property) => {
      if (!property.match(/@media/)) {
        return {
          ...styleAccumulator,
          [property]: style[property],
        }
      }

      if (!mqls.get(property)) {
        mqls.set(property, window.matchMedia(property.split('@media ')[1]))
        mqls.get(property).addListener(() => {
          forceUpdate()
        })
      }

      if (mqls.get(property).matches) {
        return {
          ...styleAccumulator,
          ...style[property],
        }
      }

      return styleAccumulator
    },
    {}
  )

  const newProps = {
    ...props,
    style: transformedStyle,
  }

  return React.cloneElement(element, newProps)
}
