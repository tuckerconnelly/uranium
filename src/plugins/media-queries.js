import React from 'react'

const mqls = new Map

export default (element, forceUpdate) => {
  const { props } = element
  const { styles } = props

  const newStyles = Object.keys(styles).reduce(
    (stylesAccumulator, property) => {
      if (!property.match(/@media/)) return stylesAccumulator

      if (!mqls.get(property)) {
        mqls.set(property, window.matchMedia(property.split('@media ')[1]))
        mqls.get(property).addListener(() => {
          forceUpdate()
        })
      }

      if (mqls.get(property).matches) {
        return {
          ...stylesAccumulator,
          ...styles[property],
        }
      }

      return stylesAccumulator
    },
    {}
  )

  return React.cloneElement(
    element,
    { ...props, style: { ...props.style, ...newStyles } }
  )
}
