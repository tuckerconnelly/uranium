import React from 'react'

import Plugins from './plugins'

let resolveStyles = component => component

const _resolveChildren = (element, forceUpdate, config) => {
  const { children } = element.props
  let newChildren

  if (typeof children === 'string' || typeof children === 'number') {
    newChildren = children
  } else if (typeof children === 'function') {
    newChildren = (...args) => {
      const result = children.apply(null, args)
      if (!React.isValidElement(result)) return result
      return resolveStyles(result, forceUpdate, config)
    }
  } else if (React.Children.count(children) === 1 && children.type) {
    const onlyChild = React.Children.only(children)
    newChildren = resolveStyles(onlyChild, forceUpdate, config)
  } else {
    newChildren = React.Children.map(
      children,
      child => {
        if (React.isValidElement(child)) return resolveStyles(child, forceUpdate, config)
        return child
      }
    )
  }

  return React.cloneElement(element, element.props, newChildren)
}

const _resolveProps = (element, forceUpdate, config) => {
  const newProps = Object.keys(element.props).reduce(
    (resolvedProps, prop) => {
      if (prop === 'children') return resolvedProps
      if (!React.isValidElement(element.props[prop])) return resolvedProps
      return {
        ...resolvedProps,
        prop: resolveStyles(element.props[prop], forceUpdate, config),
      }
    },
    { ...element.props }
  )

  return React.cloneElement(element, newProps)
}

const _runPlugins = (element, forceUpdate, config) => {
  if (
    !React.isValidElement(element) ||
    !element.props.styles
  ) {
    return element
  }

  return Plugins.reduce(
    (element, plugin) => plugin(element, forceUpdate, config),
    element
  )
}

resolveStyles = (element, forceUpdate, config) =>
  [
    _resolveChildren,
    _resolveProps,
    _runPlugins,
  ].reduce(
    (element, reducer) => reducer(element, forceUpdate, config),
    element
  )

export default resolveStyles
