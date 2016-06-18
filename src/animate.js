import matchMedia from 'react-native-match-media'

function getPropValueGivenMediaQueries(styles, prop) {
  // Accept numbers as from/to
  if (typeof styles === 'number') return styles

  let finalValue = styles[prop]
  for (const mq in styles) {
    if (!{}.hasOwnProperty.call(styles, mq)) continue
    if (!mq.match(/media/)) continue
    if (!styles[mq][prop]) continue
    if (matchMedia(mq.split('@media ')[1]).matches) finalValue = styles[mq][prop]
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
    console.warn( // eslint-disable-line no-console
      `Uranium.animate: Tried to animate on a prop that wasn't ` +
      `present on both styles. Prop: ${prop}`
    )
    return {}
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
  if (!Array.isArray(props)) return animatedStyle(props, from, to, on)

  return props
    .map(prop => animatedStyle(prop, from, to, on))
    .reduce(
      (allStyles, currentStyle) => ({ ...allStyles, ...currentStyle }), {}
    )
}
