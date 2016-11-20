import unionWith from 'lodash/unionWith'

function getPropValueGivenMediaQueries(styles, prop) {
  // Accept numbers and strings as from/to
  if (
    typeof styles === 'number' ||
    typeof styles === 'string'
  ) return styles

  let finalValue = styles[prop]
  for (const mq in styles) {
    if (!{}.hasOwnProperty.call(styles, mq)) continue
    if (!mq.match(/media/)) continue
    if (!styles[mq][prop]) continue
    if (global.matchMedia(mq.split('@media ')[1]).matches) finalValue = styles[mq][prop]
  }
  return finalValue
}

// The meat and potatoes
function animatedStyle(prop, from, to, on) {
  if (from === undefined) {
    throw new Error(
      `Uranium.animate: the \`from\` style was undefined when ` +
      `trying to animate the \`${prop}\` prop`
    )
  }

  if (to === undefined) {
    throw new Error(
      `Uranium.animate: the \`to\` style was undefined when ` +
      `trying to animate the \`${prop}\` prop`
    )
  }

  // Check if the prop is set on both `from` and `to`
  if (
    (typeof from === 'object' && typeof to === 'object') &&
    (from[prop] === undefined || to[prop] === undefined)
  ) {
    return { [prop]: from[prop] }
  }

  // Handle nested values (like iOS's shadowOffset)
  // NOTE Not currently supported in React Native, submitted a PR:
  // https://github.com/facebook/react-native/pull/11030
  if (typeof from[prop] === 'object') {
    return {}
    // return { [prop]: animate(from[prop], to[prop], on) } // eslint-disable-line no-use-before-define
  }

  // This is clever--re-using the animate() function to deal with the transform array
  if (prop === 'transform') {
    // Convert transform into a "style" object
    const fromTransform = from.transform.reduce((prev, curr) => ({ ...prev, ...curr }), {})
    const toTransform = to.transform.reduce((prev, curr) => ({ ...prev, ...curr }), {})

    // animate() them like regular styles
    const animdTransforms = animate(fromTransform, toTransform, on) // eslint-disable-line no-use-before-define, max-len

    // Convert them back into the usual transform array
    return {
      transform: Object.keys(animdTransforms)
        .map(transform => ({ [transform]: animdTransforms[transform] })),
    }
  }

  return {
    [prop]: on.interpolate({
      inputRange: [0, 1],
      outputRange: [
        getPropValueGivenMediaQueries(from, prop),
        getPropValueGivenMediaQueries(to, prop),
      ],
    }),
  }
}

// Wrapper to accept an array of props
export default function animate(props, from, to, on) {
  // Handle animate(prop, from, to, on) signature
  if (typeof props === 'string') return animatedStyle(props, from, to, on)
  // Handle the animate(props[], from, to, on) signature
  if (Array.isArray(props)) {
    return props
      .map(prop => animatedStyle(prop, from, to, on))
      .reduce(
        (allStyles, currentStyle) => ({ ...allStyles, ...currentStyle }), {}
      )
  }

  // Handle animate(from, to, on) signature
  /* eslint-disable no-param-reassign */
  on = to
  to = from
  from = props
  /* eslint-enable no-param-reassign */
  return Object.keys(from)
    .filter(prop => !prop.match(/media/))
    .map(prop => animatedStyle(prop, from, to, on))
    .reduce(
      (allStyles, currentStyle) => ({ ...allStyles, ...currentStyle }), {}
    )
}
