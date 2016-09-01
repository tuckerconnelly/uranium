Object.defineProperty(exports,"__esModule",{value:true});var _mergeArray=require('./mergeArray');var _mergeArray2=_interopRequireDefault(_mergeArray);
var _mediaQueries=require('./mediaQueries');var _mediaQueries2=_interopRequireDefault(_mediaQueries);
var _copyStyles=require('./copyStyles');var _copyStyles2=_interopRequireDefault(_copyStyles);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

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
exports.default=[_mergeArray2.default,_copyStyles2.default,_mediaQueries2.default];