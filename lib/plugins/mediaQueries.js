'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNativeUniversal=require('react-native-universal');var _reactNativeMatchMedia=require('react-native-match-media');var _reactNativeMatchMedia2=_interopRequireDefault(_reactNativeMatchMedia);var _makeClassName=require('../utils/makeClassName');var _makeClassName2=_interopRequireDefault(_makeClassName);var _expandCSS=require('../utils/expandCSS');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}






var mqls=new Map();exports.default=

function(element,forceUpdate){var 
props=element.props;var 
css=props.css;

if(_reactNativeUniversal.Platform.OS!=='web'){
var newStyle=Object.keys(css).reduce(
function(styleAccumulator,property){
if(!property.match(/@media/))return styleAccumulator;

if(!mqls.get(property)){
mqls.set(property,(0,_reactNativeMatchMedia2.default)(property.split('@media ')[1]));
mqls.get(property).addListener(function(){return forceUpdate();});}


if(mqls.get(property).matches){
return _extends({},styleAccumulator,css[property]);}


return styleAccumulator;},

{});


return _react2.default.cloneElement(
element,_extends({},
props,{style:_extends({},props.style,newStyle)}));}



// Modify the stylesheet if web

var className=(0,_makeClassName2.default)(css);

var mqs=Object.keys(css).reduce(
function(cssAccumulator,property){
if(!property.match(/@media/))return cssAccumulator;
return ''+cssAccumulator+property+'{.'+className+'{'+
(0,_expandCSS.createCSSDeclarations)((0,_expandCSS.expandStyle)(css[property]))+'}}';},


'');

if(!mqs.length)return element;

var styleTag=props.children.filter(function(child){return child&&child.type==='style';})[0];
var styleTagWithMediaQueries=_react2.default.createElement(
'style',
{key:className},
styleTag.props.children+mqs);


var newChildren=props.children;
// If the children is not an array, it's just the original style
// tag added in copyStyles.js
if(!Array.isArray(props.children)){
newChildren=styleTagWithMediaQueries;}else 
{
newChildren=props.children.
filter(function(child){return child&&child.type!=='style';}).
concat([styleTagWithMediaQueries]);}


var newProps=_extends({},
props,{
children:newChildren});

return _react2.default.cloneElement(element,newProps);};