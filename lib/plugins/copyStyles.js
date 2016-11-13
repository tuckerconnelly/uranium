Object.defineProperty(exports,"__esModule",{value:true});exports.URANIUM_CLASSNAME=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeUniversal=require('react-native-universal');

var _makeClassName=require('../utils/makeClassName');var _makeClassName2=_interopRequireDefault(_makeClassName);
var _expandCSS=require('../utils/expandCSS');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var URANIUM_CLASSNAME=exports.URANIUM_CLASSNAME='ur';exports.default=



function(element){var
props=element.props;var
css=props.css,style=props.style;



if(_reactNativeUniversal.Platform.OS!=='web'){
var newStyle=Object.keys(css).reduce(
function(styleAccumulator,property){
if(property.match(/@media/))return styleAccumulator;
return _extends({},
styleAccumulator,_defineProperty({},
property,css[property]));

},
{});


newStyle=_extends({},newStyle,style||{});
return _react2.default.cloneElement(element,_extends({},props,{style:newStyle}));
}


var className=(0,_makeClassName2.default)(css);



var cssWithoutNullValues=!style?css:Object.keys(css).reduce(function(accumulator,property){
if(style[property]===null)return accumulator;
return _extends({},accumulator,_defineProperty({},property,css[property]));
},{});

var cssDeclarations=(0,_expandCSS.createCSSDeclarations)((0,_expandCSS.expandStyle)(cssWithoutNullValues));

var newChildren=_react2.default.createElement(
'style',
{key:className},'.'+
URANIUM_CLASSNAME+'.'+className+'{'+cssDeclarations+'}');


if(typeof props.children==='function'){
newChildren=[newChildren,props.children()];
}else if(!Array.isArray(props.children)){
newChildren=[newChildren,props.children];
}else{
newChildren=props.children.concat([newChildren]);
}

var newProps=_extends({},
props,{
className:props.className?
[].concat(_toConsumableArray(new Set(props.className.split(' ').concat([URANIUM_CLASSNAME,className])))).join(' '):
URANIUM_CLASSNAME+' '+className,
children:newChildren});

return _react2.default.cloneElement(element,newProps);
};