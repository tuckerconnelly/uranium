import React from 'react'
import invariant from 'invariant'
import { objectToMap } from 'map-set-utils'

// Style states

const _styleStates = new Map

const _setStyleState = (elementKey, stateKey, value) => {
  if (_styleStates.get(elementKey) === undefined) {
    _styleStates.set(elementKey, new Map)
  }

  _styleStates.get(elementKey).set(stateKey, value)
}

const _getStyleState = (elementKey, stateKey) => {
  if (!_styleStates.get(elementKey)) return false
  return _styleStates.get(elementKey).get(stateKey)
}

// Global mouseup listener

let _mouseUpAttached = false

const _addGlobalMouseUpListener = forceUpdate => {
  if (_mouseUpAttached === true) return

  window.addEventListener('mouseup', () => {
    for (const elementStyleStates of _styleStates) {
      elementStyleStates[1].set(':active', false)
    }
    forceUpdate()
  })

  _mouseUpAttached = true
}

// Make sure it has a key

const _makeSureItHasAKey = element => {
  const { props, key } = element
  const { style } = props
  const hasInteractionProperty = Object.keys(style).reduce((hasInteractionProperty, property) => {
    if (property === ':hover' || property === ':active' || property === ':focus') return true
    return hasInteractionProperty
  }, false)

  if (hasInteractionProperty) {
    invariant(key !== null,
      'Elements using :hover, :active, or :focus styles must have a unique key property.'
    )
  }
}

// Inject into listener

const _injectIntoListener = (props, listener, method) => {
  const newProps = { ...props }
  const existingListener = newProps[listener]
  newProps[listener] = e => {
    existingListener && existingListener(e)
    method()
  }
  return newProps
}

const _convertStylesToProperlyOrderedMap = styles => {
  const stylesMap = objectToMap(styles)

  stylesMap.delete(':focus')
  stylesMap.delete(':hover')
  stylesMap.delete(':active')

  styles[':focus'] !== undefined && stylesMap.set(':focus', styles[':focus'])
  styles[':hover'] !== undefined && stylesMap.set(':hover', styles[':hover'])
  styles[':active'] !== undefined && stylesMap.set(':active', styles[':active'])

  return stylesMap
}

export default (element, forceUpdate) => {
  const { props, key } = element
  const { style } = props

  // mouseup needs to be global because if the user presses their
  // mouse down, moves pointer off of button, and THEN mouses up,
  // the mouseup won't be fired
  _addGlobalMouseUpListener(forceUpdate)

  // All Uranium has is a freshly created element with its style
  // prop, with ':focus', ':hover', and ':active' properties
  //
  // It doesn't know if the element is being hovered or not, or if it's
  // active or focused.
  //
  // So we need to track that state internally (in this file)
  //
  // In order to track that state of each element, that element needs
  // a key.
  _makeSureItHasAKey(element)

  let newProps = { ...props }
  let newStyles = {}

  // The order of properties in an object aren't guaranteed, so
  // we need to convert to a Map with the styles properly ordered.
  // We want focus to be applied first, then hover, then active.
  const stylesMap = _convertStylesToProperlyOrderedMap(style)
  for (const [property, value] of stylesMap) {
    if (property === ':focus') {
      newProps = _injectIntoListener(newProps, 'onFocus', () => {
        _setStyleState(key, ':focus', true)
        forceUpdate()
      })
      newProps = _injectIntoListener(newProps, 'onBlur', () => {
        _setStyleState(key, ':focus', false)
        forceUpdate()
      })
      if (!_getStyleState(key, ':focus')) continue
      newStyles = { ...newStyles, ...value }
      continue
    }

    if (property === ':hover') {
      newProps = _injectIntoListener(newProps, 'onMouseEnter', () => {
        _setStyleState(key, ':hover', true)
        forceUpdate()
      })
      newProps = _injectIntoListener(newProps, 'onMouseLeave', () => {
        _setStyleState(key, ':hover', false)
        forceUpdate()
      })
      if (!_getStyleState(key, ':hover')) continue
      newStyles = { ...newStyles, ...value }
      continue
    }

    if (property === ':active') {
      newProps = _injectIntoListener(newProps, 'onMouseDown', () => {
        _setStyleState(key, ':active', true)
        forceUpdate()
      })
      newProps = _injectIntoListener(newProps, 'onKeyDown', e => {
        if (e.key !== ' ' && e.key !== 'Enter') return
        _setStyleState(key, ':active', true)
        forceUpdate()
      })
      newProps = _injectIntoListener(newProps, 'onKeyUp', e => {
        if (e.key !== ' ' && e.key !== 'Enter') return
        _setStyleState(key, ':active', false)
        forceUpdate()
      })
      if (!_getStyleState(key, ':active')) continue
      newStyles = { ...newStyles, ...value }
      continue
    }

    newStyles = { ...newStyles, [property]: value }
  }

  newProps.style = newStyles

  return React.cloneElement(element, newProps)
}
