import React, { Component } from 'react-native'

export default WrappedComponent => {
  class Nadium extends Component {
    render() {
      return <WrappedComponent />
    }
  }

  return Nadium
}
