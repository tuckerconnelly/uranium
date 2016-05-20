Uranium
==========
Adds universal media-query support to css-in-js for both React and React Native

## Motive

React Native doesn't have an easy, idiomatic way to change styles based on the screen size. [Radium]() is awesome, but it only works for web. This is Universal Radium, or Uranium ;)

## Usage

Use the CSS property to add Uranium styles.

```js
import React, { PropTypes } from 'react'
import { View } from 'react-native-universal'
import Uranium from 'uranium'

import Shadows from './styles/Shadows'

const MyComponent = () =>
  <View css={styles.base}>
    <Text>Some text</Text>
  </View>

export default Uranium(MyComponent)


const styles = {
  base: {
    backgroundColor: 'red',

    '@media (min-width: 480px)': {
      backgroundColor: 'blue'
    }
  },
}

```
On web, this will get copied to its own "scoped" <style> tag, so it works perfectly with server-side rendering. On iOS and Android, the media query styles will get copied into the style prop if they match.

## License
MIT
