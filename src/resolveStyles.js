import { omit } from 'lodash'
import React from 'react'

import Plugins from './plugins'

let resolveStyles = component => component

const _resolveChildren = (element, forceUpdate) => {
  const { children } = element.props
  let newChildren

  if (typeof children === 'string' || typeof children === 'number') {
    newChildren = children
  } else if (typeof children === 'function') {
    newChildren = (...args) => {
      const result = children.apply(null, args)
      if (!React.isValidElement(result)) return result
      return resolveStyles(result, forceUpdate)
    }
  } else if (React.Children.count(children) === 1 && children.type) {
    const onlyChild = React.Children.only(children)
    newChildren = resolveStyles(onlyChild, forceUpdate)
  } else {
    newChildren = React.Children.map(
      children,
      child => {
        if (React.isValidElement(child)) return resolveStyles(child, forceUpdate)
        return child
      }
    )
  }

  return React.cloneElement(
    element,
    omit(element.props, 'key', 'ref'),
    newChildren
  )
}

const _resolveProps = (element, forceUpdate) => {
  const newProps = Object.keys(element.props).reduce(
    (resolvedProps, prop) => {
      if (prop === 'children') return resolvedProps
      if (!React.isValidElement(element.props[prop])) return resolvedProps
      return {
        ...resolvedProps,
        prop: resolveStyles(element.props[prop], forceUpdate),
      }
    },
    { ...element.props }
  )

  return React.cloneElement(
    element,
    omit(newProps, 'key', 'ref')
  )
}

const _runPlugins = (element, forceUpdate) => {
  if (
    !React.isValidElement(element) ||
    !element.props.css
  ) {
    return element
  }

  return Plugins.reduce(
    (element, plugin) => plugin(element, forceUpdate),
    element
  )
}

resolveStyles = (element, forceUpdate) =>
  [
    _resolveChildren,
    _resolveProps,
    _runPlugins,
  ].reduce(
    (element, reducer) => reducer(element, forceUpdate),
    element
  )

export default resolveStyles
