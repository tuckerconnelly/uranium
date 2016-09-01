'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _lodash=require('lodash');var _react=require('react');var _react2=_interopRequireDefault(_react);var _plugins=require('./plugins');var _plugins2=_interopRequireDefault(_plugins);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}




var resolveStyles=function(component){return component;};

var _resolveChildren=function(element,forceUpdate){var 
children=element.props.children;
var newChildren=undefined;

if(typeof children==='string'||typeof children==='number'){
newChildren=children;}else 
if(typeof children==='function'){
newChildren=function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
var result=children.apply(null,args);
if(!_react2.default.isValidElement(result))return result;
return resolveStyles(result,forceUpdate);};}else 

if(_react2.default.Children.count(children)===1&&children.type){
var onlyChild=_react2.default.Children.only(children);
newChildren=resolveStyles(onlyChild,forceUpdate);}else 
{
newChildren=_react2.default.Children.map(
children,
function(child){
if(_react2.default.isValidElement(child))return resolveStyles(child,forceUpdate);
return child;});}




return _react2.default.cloneElement(
element,
(0,_lodash.omit)(element.props,'key','ref'),
newChildren);};



var _resolveProps=function(element,forceUpdate){
var newProps=Object.keys(element.props).reduce(
function(resolvedProps,prop){
if(prop==='children')return resolvedProps;
if(!_react2.default.isValidElement(element.props[prop]))return resolvedProps;
return _extends({},
resolvedProps,{
prop:resolveStyles(element.props[prop],forceUpdate)});},_extends({},


element.props));


return _react2.default.cloneElement(
element,
(0,_lodash.omit)(newProps,'key','ref'));};



var _runPlugins=function(element,forceUpdate){
if(
!_react2.default.isValidElement(element)||
!element.props.css)
{
return element;}


return _plugins2.default.reduce(
function(element,plugin){return plugin(element,forceUpdate);},
element);};



resolveStyles=function(element,forceUpdate){return (
[
_resolveChildren,
_resolveProps,
_runPlugins].
reduce(
function(element,reducer){return reducer(element,forceUpdate);},
element));};exports.default=


resolveStyles;