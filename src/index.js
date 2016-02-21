import { Component } from 'react'

import resolveStyles from './resolve-styles'

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
    constructor(props) {
      super(props)

      this.mqls = new Map()
      this.state = {
        _styles: {},
      }
    }

    setStyleState(elementKey, stateKey, value) {
      this.setState({
        _styles: {
          ...this.state._styles,
          [elementKey]: {
            ...this.state._styles.elementKey,
            [stateKey]: value,
          },
        },
      })
    }

    getStyleState(elementKey, stateKey) {
      if (!this.state._styles[elementKey]) return undefined
      return !this.state._styles[elementKey][stateKey]
    }

    render() {
      return resolveStyles(super.render(), this)
    }
  }

  return Uranium
}
