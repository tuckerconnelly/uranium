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

      this.state = {
        _styles: {},
      }
    }

    render() {
      return resolveStyles(super.render(), this.forceUpdate.bind(this))
    }
  }

  return Uranium
}
