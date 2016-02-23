import mergeArray from './merge-array'
import mediaQueries from './media-queries'
import interactions from './interactions'
import supportedProperties from './supported-properties'

// Plugins follow this format:
//
// const myPlugin = (element, forceUpdate, config) {
//   const { props } = element
//   const newProps = { ...props }
//   // Do stuff, transform styles, attach event listeners that forceUpdate()
//   return React.cloneElement(element, newProps)
// }
//
// element: the element being processed
// forceUpdate: forces the Uranium-enhanced element to re-evaluate styles
// config: The config passed to Uranium
//
// See merge-array for a simple example, and media-queries for a
// simple example using event listeners
export default [
  mergeArray,
  supportedProperties,
  mediaQueries,
  interactions,
]
