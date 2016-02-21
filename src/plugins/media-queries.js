import React from 'react'

export default (element, uranium) => {
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

      if (!uranium.mqls.get(property)) {
        uranium.mqls.set(property, window.matchMedia(property.split('@media ')[1]))
        uranium.mqls.get(property).addListener(() => {
          uranium.forceUpdate()
        })
      }

      if (uranium.mqls.get(property).matches) {
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
