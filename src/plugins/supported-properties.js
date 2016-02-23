const _supportedProperties = [
  // Position
  'position',
  'top',
  'left',
  'bottom',
  'right',

  // Box model
  'width',
  'height',
  'overflow',

  // Flexbox
  'alignItems',
  'alignSelf',
  'flex',
  'flexDirection',
  'flexWrap',
  'justifyContent',

  // Padding
  'padding', // TODO Polyfill
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // Border
  'border', // TODO Polyfill
  'borderWidth',
  'borderColor',
  'borderTop',
  'borderTopWidth',
  'borderTopColor',
  'borderRight',
  'borderRightWidth',
  'borderRightColor',
  'borderBottom',
  'borderBottomWidth',
  'borderBottomColor',
  'borderLeft',
  'borderLeftWidth',
  'borderLeftColor',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomRightRadius',
  'borderBottomLeftRadius',

  // Margin
  'margin', // TODO Polyfill
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',

  // Background
  'backgroundColor',

  // Text
  'color',
  'font',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight', // TODO Polyfill
  'lineHeight',
  'textAlign',
  'textShadow', // TODO Polyfill
  // These are polyfilled into textShadow
  // 'textShadowColor', // native
  // 'textShadowOffset', // native
  // 'textShadowRadius', // native
  'textAlignVertical', // android
  'letterSpacing', // ios
  'textDecorationColor', // ios
  'textDecorationLine', // ios
  'textDecorationStyle', // ios
  'writingDirection', // ios

  // Image
  'resizeMode', // native
  'overlayColor', // android
  'tintColor', // ios

  // Transform
  'transform', // TODO Polyfill, including transformMatrix
  // This is polyfilled into transform
  // 'transformMatrix', //native
  'backfaceVisibility',

  // Shadows
  'boxShadow', // web
  'shadowColor', // ios
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'elevation', // android

  // Uranium
  ':focus',
  ':hover',
  ':active',
  property => property.match(/^@media/),
]

const _testsForWarnings = [
  {
    // In _supportedProperties
    propertyMatches: property => {
      for (const supportedProperty of _supportedProperties) {
        if (
          typeof supportedProperty === 'string' &&
          property === supportedProperty
        ) return false

        if (
          typeof supportedProperty === 'function' &&
          supportedProperty(property)
        ) return false
      }

      return true
    },
    message: (property, value) =>
      `Unsupported style property '${property}' on \n` +
      `${property}: '${value}'`,
  },
  // display: 'flex'
  {
    propertyMatches: property => property === 'display',
    valueMatches: value => value === 'flex',
    message: () =>
      `display is automatically set to 'flex' so you don't need to set it.`,
  },
  // display: 'inline-block'
  {
    valueMatches: value => value === 'inline-block',
    message: () =>
      `To get the same effect as display: 'inline-block', use ` +
      `flexWrap: 'wrap' and flexDirection: 'row' on the parent.`,
  },
  // boxSizing
  {
    propertyMatches: property => property === 'boxSizing',
    message: () =>
      `React Native doesn't support boxSizing, so Uranium can't support it. ` +
      `Ask for boxSizing on https://productpains.com/product/react-native/ :)`,
  },
  // position other than 'absolute' or 'relative'
  {
    propertyMatches: property => property === 'position',
    valueMatches: value => value !== 'relative' && value !== 'absolute',
    message: () =>
      `Only position: 'relative' and position: 'absolute' are ` +
      `supported.`,
  },
  // zIndex
  {
    propertyMatches: property => property === 'zIndex',
    message: () =>
      `zIndex isn't supported in React Native, so Uranium can't use it.` +
      `Upvote here: ` +
      `https://productpains.com/post/react-native/zindex-support/`,
  },
  // listStyle
  {
    propertyMatches: property => property.match(/listStyle/),
    message: () =>
      `listStyle isn't supported in React Native, so Uranium automatically ` +
      `unstyles lists by setting listStyle: 'none'.`,
  },

  // Notify of helpful polyfills for native-only properties

  // paddingVertical and paddingHorizontal
  {
    propertyMatches: property =>
      property === 'paddingVertical' ||
      property === 'paddingHorizontal',
    message: () =>
      `'paddingVertical' and 'paddingHorizontal' are polyfilled into 'padding', ` +
      `so just use the 'padding' shorthand like you normally would in CSS.`,
  },
  // marginVertical and marginHorizontal
  {
    propertyMatches: property =>
      property === 'marginVertical' ||
      property === 'marginHorizontal',
    message: () =>
      `'marginVertical' and 'marginHorizontal' are polyfilled into 'margin', ` +
      `so just use the 'margin' shorthand like you normally would in CSS.`,
  },
  // transformMatrix
  {
    propertyMatches: property => property === 'transformMatrix',
    message: () =>
      `'transformMatrix' is polyfilled into 'transform', so just use 'transform' ` +
      `as you normally would in CSS.`,
  },
  // textShadowOffset, textShadowRadius, textShadowColor
  {
    propertyMatches: property =>
      property === 'textShadowOffset' ||
      property === 'textShadowRadius' ||
      property === 'textShadowColor',
    message: () =>
      `'textShadowOffset', 'textShadowRadius', and 'textShadowColor' are polyfilled ` +
      `into 'textShadow', so just use 'textShadow' as you normally would in CSS.`,
  },
]

const _testStyles = (style, element) => {
  for (const property in style) {
    if (!style.hasOwnProperty(property)) continue

    // Recursively test nested properties
    if (typeof property === 'object') {
      _testStyles(property, element)
      continue
    }

    const value = style[property]

    const warningMessage = _testsForWarnings.reduce((warningMessage, test) => {
      if (
        (!test.propertyMatches || test.propertyMatches(property)) &&
        (!test.valueMatches || test.valueMatches(value))
      ) return `${warningMessage}\n${test.message(property, value)}`

      return warningMessage
    }, '')

    if (warningMessage === '') continue

    const elementName = element.key ?
      `${element.type}#${element.key}` :
      element.type

    /* eslint-disable no-console */
    console.error(
      `${element._owner._currentElement.type.displayName} ${elementName} ${warningMessage}`
    )
    /* eslint-enable no-console */
  }
}

export default (element, forceUpdate, config) => {
  const { props } = element
  const { style } = props

  // Ignore warnings if user sets universal to false in config, meaning
  // they just want to use Uranium on the web
  if (!config.universal) return element

  // Only warn the first time the element is processed
  if (props._alreadyWarned) return element

  _testStyles(style, element)

  return element
}
