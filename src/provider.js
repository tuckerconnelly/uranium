import { Component, PropTypes, Children } from 'react'

export default class Provider extends Component {
  getChildContext() {
    return { uraniumConfig: this._config }
  }

  _config = this.props.config

  render() {
    return Children.only(this.props.children)
  }
}

Provider.propTypes = {
  config: PropTypes.shape({
    matchMedia: PropTypes.func,
  }),
  children: PropTypes.node.isRequired,
}

Provider.defaultProps = {
  config: {
    matchMedia: null,
  },
}

Provider.childContextTypes = {
  uraniumConfig: PropTypes.object,
}
