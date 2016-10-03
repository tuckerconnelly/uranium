Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=



































































animate;var _reactNativeMatchMedia=require('react-native-match-media');var _reactNativeMatchMedia2=_interopRequireDefault(_reactNativeMatchMedia);var _unionWith=require('lodash/unionWith');var _unionWith2=_interopRequireDefault(_unionWith);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function getPropValueGivenMediaQueries(styles,prop){// Accept numbers as from/to
if(typeof styles==='number')return styles;var finalValue=styles[prop];for(var mq in styles){if(!{}.hasOwnProperty.call(styles,mq))continue;if(!mq.match(/media/))continue;if(!styles[mq][prop])continue;if((0,_reactNativeMatchMedia2.default)(mq.split('@media ')[1]).matches)finalValue=styles[mq][prop];}return finalValue;}// The meat and potatoes
function animatedStyle(prop,from,to,on){if(from===undefined){throw new Error('Uranium.animate: the `from` style was undefined when '+('trying to animate the `'+prop+'` prop'));}if(to===undefined){throw new Error('Uranium.animate: the `to` style was undefined when '+('trying to animate the `'+prop+'` prop'));}// Check if the prop is set on both `from` and `to`
if(typeof from==='object'&&typeof to==='object'&&(from[prop]===undefined||to[prop]===undefined)){return _defineProperty({},prop,from[prop]);}// This is clever--re-using the animate() function to deal with the transform array
if(prop==='transform'){var _ret=function(){// Convert transform into a "style" object
var fromTransform=from.transform.reduce(function(prev,curr){return _extends({},prev,curr);},{});var toTransform=to.transform.reduce(function(prev,curr){return _extends({},prev,curr);},{});// animate() them like regular styles
var animdTransforms=animate(fromTransform,toTransform,on);// eslint-disable-line no-use-before-define, max-len
// Convert them back into the usual transform array
return{v:{transform:Object.keys(animdTransforms).map(function(transform){return _defineProperty({},transform,animdTransforms[transform]);})}};}();if(typeof _ret==="object")return _ret.v;}return _defineProperty({},prop,on.interpolate({inputRange:[0,1],outputRange:[getPropValueGivenMediaQueries(from,prop),getPropValueGivenMediaQueries(to,prop)]}));}// Wrapper to accept an array of props
function animate(props,from,to,on){// Handle animate(prop, from, to, on) signature
if(typeof props==='string')return animatedStyle(props,from,to,on);// Handle the animate(props[], from, to, on) signature
if(Array.isArray(props)){return props.map(function(prop){return animatedStyle(prop,from,to,on);}).reduce(function(allStyles,currentStyle){return _extends({},allStyles,currentStyle);},{});}
// Handle animate(from, to, on) signature
/* eslint-disable no-param-reassign */
on=to;
to=from;
from=props;
/* eslint-enable no-param-reassign */
return Object.keys(from).
map(function(prop){return animatedStyle(prop,from,to,on);}).
reduce(
function(allStyles,currentStyle){return _extends({},allStyles,currentStyle);},{});

}