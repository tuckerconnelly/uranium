import { Component } from 'react'

import matchMediaMock from './matchMediaMock'
import resolveStyles from './resolveStyles'

if (!global.matchMedia) {
  global.matchMedia = matchMediaMock;

  if (!global.__exponent) {
    console.warn( // eslint-disable-line no-console
      'global.matchMedia not found. Uranium has mocked it for you. ' +
      'To get rid of this warning, in your index.ios.js or index.android.js ' +
      'set global.matchMedia to react-native-match-media or to Uranium\'s `matchMediaMock`. ' +
      'See the Uranium docs for details.'
    )
  }
}

export { default as animate } from './animate'
export { default as matchMediaMock } from './matchMediaMock'

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
    componentWillUnmount() {
      if (super.componentWillUnmount) super.componentWillUnmount()
      this._unmounted = true
    }
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
