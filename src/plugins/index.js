import mediaQueries from './media-queries'
import interactions from './interactions'

// Each plugin is a function that accepts an element and a forceUpdate
// function, and returns a *cloned, non-mutated* element with new
// properties
//
// Normally a plugin transforms the style property and returns a new
// element with a transformed style property
//
// If the plugin needs to change a style based on an event, it attaches
// an event listener and calls forceUpdate in that listener, which forces
// the Uranium-enhanced element to update

export default [
  mediaQueries,
  interactions,
]
