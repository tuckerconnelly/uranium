import React from 'react'


const _injectIntoListener = (props, listener, method) => {
  const newProps = { ...props }
  const existingListener = newProps[listener]
  newProps[listener] = e => {
    existingListener && existingListener(e)
    method()
  }
  return newProps
}

export default (element, uranium) => {
  const { props } = element
  const { style } = props

  let newProps = { ...props }

  const transformedStyle = Object.keys(style).reduce(
    (styleAccumulator, property) => {
      if (property === ':hover') {
        newProps = _injectIntoListener(newProps, 'onMouseEnter', () => {
          uranium.setStyleState(element.props.key, ':hover', true)
        })
        newProps = _injectIntoListener(newProps, 'onMouseLeave', () => {
          uranium.setStyleState(element.props.key, ':hover', false)
        })
        if (!uranium.getStyleState(element.props.key, ':hover')) return styleAccumulator
        return { ...styleAccumulator, ...style[property] }
      }

      if (property === ':active') {
        newProps = _injectIntoListener(newProps, 'onMouseDown', () => {
          uranium.setStyleState(element.props.key, ':active', true)
        })
        newProps = _injectIntoListener(newProps, 'onKeyDown', e => {
          if (e.key !== ' ' && e.key !== 'Enter') return
          uranium.setStyleState(element.props.key, ':active', true)
        })
        newProps = _injectIntoListener(newProps, 'onKeyUp', e => {
          if (e.key !== ' ' && e.key !== 'Enter') return
          uranium.setStyleState(element.props.key, ':active', false)
        })
        if (!uranium.getStyleState(element.props.key, ':hover')) return styleAccumulator
        return { ...styleAccumulator, ...style[property] }
      }

      return {
        ...styleAccumulator,
        [property]: style[property],
      }
    },
    {}
  )

  newProps.style = transformedStyle

  return React.cloneElement(element, newProps)
}
