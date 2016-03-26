import { Component, PropTypes } from 'react'

import resolveStyles from './resolve-styles'

export { default as UraniumProvider } from './provider'

export default component => {
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
      return resolveStyles(super.render(), this.forceUpdate.bind(this), this.context.uraniumConfig)
    }
  }

  /* eslint-disable prefer-template */
  Uranium.displayName =
    'Uranium(' +
    (ComposedComponent.displayName || ComposedComponent.name || 'Component') +
    ')'
  /* eslint-enable prefer-template */

  Uranium.contextTypes = {
    ...Uranium.contextTypes,
    uraniumConfig: PropTypes.object,
  }

  return Uranium
}
