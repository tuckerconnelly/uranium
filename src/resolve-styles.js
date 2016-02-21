import React from 'react'

import Plugins from './plugins'

let resolveStyles = component => component

const _resolveChildren = (element, uranium) => {
  const { children } = element.props
  let newChildren

  if (typeof children === 'string' || typeof children === 'number') {
    newChildren = children
  } else if (typeof children === 'function') {
    newChildren = (...args) => {
      const result = children.apply(null, args)
      if (React.isValidElement(result)) {
        return resolveStyles(result, uranium)
      }
      return result
    }
  } else if (React.Children.count(children) === 1 && children.type) {
    const onlyChild = React.Children.only(children)
    newChildren = resolveStyles(onlyChild, uranium)
  } else {
    newChildren = React.Children.map(
      children,
      child => {
        if (React.isValidElement(child)) return resolveStyles(child, uranium)
        return child
      }
    )
  }

  return React.cloneElement(element, element.props, newChildren)
}

const _resolveProps = (element, uranium) => {
  const newProps = Object.keys(element.props).reduce(
    (resolvedProps, prop) => {
      if (prop === 'children') return resolvedProps
      if (!React.isValidElement(element.props[prop])) return resolvedProps
      return {
        ...resolvedProps,
        prop: resolveStyles(element.props[prop], uranium),
      }
    },
    { ...element.props }
  )

  return React.cloneElement(element, newProps)
}

const _runPlugins = (element, uranium) => {
  if (
    !React.isValidElement(element) ||
    typeof element.type !== 'string' ||
    !element.props.style
  ) {
    return element
  }

  return Plugins.reduce(
    (element, plugin) => plugin(element, uranium),
    element
  )
}

resolveStyles = (element, uranium) => {
  const reducers = [
    _resolveChildren,
    _resolveProps,
    _runPlugins,
  ]

  return reducers.reduce(
    (element, reducer) => reducer(element, uranium),
    element
  )
}

export default resolveStyles
