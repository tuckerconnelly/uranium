import { Component } from 'react'

import resolveStyles from './resolveStyles'

export { default as animate } from './animate'

export default component => {
  // Handle stateless functional components
  const ComposedComponent = (component.render || component.prototype.render) ?
    component :
    class extends Component {
      static propTypes = component.propTypes;
      static defaultProps = component.defaultProps;

      render() {
        return component(this.props)
      }
    }

  class Uranium extends ComposedComponent {
    render() {
      return resolveStyles(super.render(), this.forceUpdate.bind(this))
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
