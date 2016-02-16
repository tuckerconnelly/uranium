import React, { Component, PropTypes } from 'react'
import lightTheme from './themes/light'

export default WrappedComponent => {
  class Nadium extends Component {
    render() {
      return <WrappedComponent />
    }
  }

  Nadium.propTypes = {
    theme: PropTypes.object,
    children: PropTypes.node.isRequired,
  }

  Nadium.defaultProps = {
    theme: lightTheme,
  }

  return Nadium
}
