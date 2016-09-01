import { Component } from 'react'
import { DOMProperty } from 'react/lib/ReactInjection'

import resolveStyles from './resolveStyles'

DOMProperty.injectDOMPropertyConfig({
  isCustomAttribute: attributeName => attributeName === 'css',
})

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
    componentWillUnmount() { this._unmounted = true }
    _protectedForceUpdate = () => !this._unmounted && this.forceUpdate()

    render() {
      return resolveStyles(super.render(), this._protectedForceUpdate)
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
