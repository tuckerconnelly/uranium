import React from 'react'

export default element => {
  const { props } = element
  const { styles } = props

  if (typeof style === 'object' && Array.isArray(styles)) {
    const newStyles = styles.reduce(
      (newStyles, currentStyle) => ({ ...newStyles, ...currentStyle }),
      {}
    )

    return React.cloneElement(element, { ...props, styles: newStyles })
  }

  return element
}
