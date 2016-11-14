Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeUniversal=require('react-native-universal');

var _copyStyles=require('./copyStyles');
var _makeClassName=require('../utils/makeClassName');var _makeClassName2=_interopRequireDefault(_makeClassName);
var _expandCSS=require('../utils/expandCSS');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}

var mqls=new Map();exports.default=

function(element,forceUpdate){var
props=element.props;var
css=props.css;

var className=(0,_makeClassName2.default)(css);

if(_reactNativeUniversal.Platform.OS!=='web'){
var newStyle=Object.keys(css).reduce(
function(styleAccumulator,property){
if(!property.match(/@media/))return styleAccumulator;

if(!mqls.get(className)){
mqls.set(className,global.matchMedia(property.split('@media ')[1]));
mqls.get(className).addListener(function(){return forceUpdate();});
}

if(mqls.get(className).matches){
return _extends({},styleAccumulator,css[property]);
}

return styleAccumulator;
},
{});


return _react2.default.cloneElement(
element,_extends({},
props,{style:_extends({},props.style,newStyle)}));

}




var animatedValuesForMQ=Object.keys(css).reduce(function(animatedValues,key){
if(!key.match(/@media/))return animatedValues;


if(!mqls.get(className)){
mqls.set(className,global.matchMedia(key.split('@media ')[1]));
mqls.get(className).addListener(function(){return forceUpdate();});
}

if(!mqls.get(className).matches)return animatedValues;

var mqAnimatedValues=
Object.keys(css[key]).reduce(function(mqAnimatedValues,mqKey){
if(typeof css[key][mqKey]!=='object'||!css[key][mqKey].__getValue){
return mqAnimatedValues;
}

return _extends({},mqAnimatedValues,_defineProperty({},mqKey,css[key][mqKey]));
},{});

return _extends({},animatedValues,mqAnimatedValues);
},{});




var mqs=Object.keys(css).reduce(
function(cssAccumulator,property){
if(!property.match(/@media/))return cssAccumulator;

return''+cssAccumulator+property+'{.'+_copyStyles.URANIUM_CLASSNAME+'.'+className+'{'+
(0,_expandCSS.createCSSDeclarations)((0,_expandCSS.expandStyle)(css[property]))+'}}';

},
'');



if(!mqs.length)return element;


var styleTag=props.children.filter(function(child){return child&&child.type==='style';})[0];
var styleTagWithMediaQueries=_react2.default.createElement(
'style',
{key:className},
styleTag.props.children+mqs);


var newChildren=props.children;


if(!Array.isArray(props.children)){
newChildren=styleTagWithMediaQueries;
}else{
newChildren=props.children.
filter(function(child){return child&&child.type!=='style';}).
concat([styleTagWithMediaQueries]);
}

var newProps=_extends({},
props,{
style:_extends({},props.style,animatedValuesForMQ),
children:newChildren});

return _react2.default.cloneElement(element,newProps);
};