import { Component } from 'react'

import resolveStyles from './resolve-styles'

const defaultConfig = {
  webOnly: false,
}

const enhancer = (config, component) => {
  // Handle stateless functional components
  const ComposedComponent = (component.render || component.prototype.render) ?
    component :
    class extends Component {
      render() {
        return component(this.props, this.context)
      }
    }

  class Uranium extends ComposedComponent {
    render() {
      return resolveStyles(super.render(), this.forceUpdate.bind(this), config)
    }
  }

  /* eslint-disable prefer-template */
  Uranium.displayName =
    'Uranium(' +
    (ComposedComponent.displayName || ComposedComponent.name || 'Component') +
    ')'
  /* eslint-enable prefer-template */

  return Uranium
}

// Support both Uranium(MyComponent) and Uranium({ config })(MyComponent)
export default configOrComponent => {
  if (typeof configOrComponent === 'function') return enhancer(defaultConfig, configOrComponent)

  const newConfig = { ...defaultConfig, ...configOrComponent }
  return enhancer.bind(null, newConfig)
}
