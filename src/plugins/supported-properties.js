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
  'paddingHorizontal',
  'paddingVertical',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // Border
  'borderWidth',
  'borderColor',
  'borderTop',
  'borderTopWidth',
  'borderTopColor',
  'borderRightWidth',
  'borderRightColor',
  'borderBottomWidth',
  'borderBottomColor',
  'borderLeftWidth',
  'borderLeftColor',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomRightRadius',
  'borderBottomLeftRadius',

  // Margin
  'margin',
  'marginVertical',
  'marginHorizontal',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',

  // Background
  'backgroundColor',

  // Text
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'lineHeight',
  'textAlign',
  // TODO Polyfill into text-shadow for web
  'textShadowColor', // native
  'textShadowOffset', // native
  'textShadowRadius', // native
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
  'transformMatrix', // native
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
    // Unsupported properties

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
    propertyMatches: property => property === 'display',
    valueMatches: value => value === 'inline-block',
    message: () =>
      `To get the same effect as display: 'inline-block', use ` +
      `flexWrap: 'wrap' and flexDirection: 'row' on the parent.`,
  },
  // display other than 'flex' or 'inline-block'
  {
    propertyMatches: property => property === 'display',
    valueMatches: value => value !== 'inline-block' && value !== 'flex',
    message: () =>
      `The only display React Native supports is 'flex', so in Uranium ` +
      `display: 'flex' is automatically added to all elements.`,
  },
  // boxSizing
  {
    propertyMatches: property => property === 'boxSizing',
    message: () =>
      `React Native doesn't support 'boxSizing', so Uranium can't support it. ` +
      `Ask for boxSizing on https://productpains.com/product/react-native/`,
  },
  // position other than 'absolute' or 'relative'
  {
    propertyMatches: property => property === 'position',
    valueMatches: value => value !== 'relative' && value !== 'absolute',
    message: (property, value) =>
      `Unsupported property value for 'position' on \n` +
      `${property}: '${value}'\n` +
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
  // padding shorthand
  {
    propertyMatches: property => property === 'padding',
    valueMatches: value => typeof value === 'string',
    message: (property, value) =>
      `Unsupported property value for 'padding' on \n` +
      `${property}: '${value}'\n` +
      `React Native expects 'padding' to be a number and not a string. ` +
      `If you tried to use shorthand, use 'paddingHorizontal' and ` +
      `'paddingVertical' instead.`,
  },
  // margin shorthand
  {
    propertyMatches: property => property === 'padding',
    valueMatches: value => typeof value === 'string',
    message: (property, value) =>
      `Unsupported property value for 'margin' on \n` +
      `${property}: '${value}'\n` +
      `React Native expects 'margin' to be a number and not a string. ` +
      `If you tried to use shorthand, use 'marginHorizontal' and ` +
      `'marginVertical' instead.`,
  },
  // transformMatrix
  {
    propertyMatches: property => property === 'transform',
    valueMatches: value => value.indexOf('matrix') !== -1,
    message: (property, value) =>
      `Unsupported property value for 'transform' on \n` +
      `${property}: '${value}'\n` +
      `React Native uses the 'transformMatrix' style property ` +
      `for matrix transforms.`,
  },
  // textShadowOffset, textShadowRadius, textShadowColor
  {
    propertyMatches: property => property === 'textShadow',
    message: () =>
      `React Native uses 'textShadowOffset', 'textShadowRadius', and ` +
      `'textShadowColor' instead of 'textShadow'.`,
  },

  // Values

  // %
  {
    valueMatches: value =>
      typeof value === 'string' &&
      !isNaN(parseInt(value, 10)) &&
      value.match(/\%/),
    message: () =>
      `Use the 'flex' property to get the same effect as percentages. ` +
      `For example, width: 80% could be achieved using flex: 0.8 .`,
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

  if (config.webOnly) return element

  // Only warn the first time the element is processed
  if (props._alreadyWarned) return element

  _testStyles(style, element)

  return element
}
