Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=












































































animate;function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function getPropValueGivenMediaQueries(styles,prop){if(typeof styles==='number'||typeof styles==='string')return styles;var finalValue=styles[prop];for(var mq in styles){if(!{}.hasOwnProperty.call(styles,mq))continue;if(!mq.match(/media/))continue;if(!styles[mq][prop])continue;if(global.matchMedia(mq.split('@media ')[1]).matches)finalValue=styles[mq][prop];}return finalValue;}function animatedStyle(prop,from,to,on){if(from===undefined){throw new Error('Uranium.animate: the `from` style was undefined when '+('trying to animate the `'+prop+'` prop'));}if(to===undefined){throw new Error('Uranium.animate: the `to` style was undefined when '+('trying to animate the `'+prop+'` prop'));}if(typeof from==='object'&&typeof to==='object'&&(from[prop]===undefined||to[prop]===undefined)){return _defineProperty({},prop,from[prop]);}if(prop==='transform'){var fromTransform=from.transform.reduce(function(prev,curr){return _extends({},prev,curr);},{});var toTransform=to.transform.reduce(function(prev,curr){return _extends({},prev,curr);},{});var animdTransforms=animate(fromTransform,toTransform,on);return{transform:Object.keys(animdTransforms).map(function(transform){return _defineProperty({},transform,animdTransforms[transform]);})};}if(typeof from[prop]==='object'){return{};}return _defineProperty({},prop,on.interpolate({inputRange:[0,1],outputRange:[getPropValueGivenMediaQueries(from,prop),getPropValueGivenMediaQueries(to,prop)]}));}function animate(props,from,to,on){

if(typeof props==='string')return animatedStyle(props,from,to,on);

if(Array.isArray(props)){
return props.
map(function(prop){return animatedStyle(prop,from,to,on);}).
reduce(
function(allStyles,currentStyle){return _extends({},allStyles,currentStyle);},{});

}



on=to;
to=from;
from=props;

return Object.keys(from).
filter(function(prop){return!prop.match(/media/);}).
map(function(prop){return animatedStyle(prop,from,to,on);}).
reduce(
function(allStyles,currentStyle){return _extends({},allStyles,currentStyle);},{});

}