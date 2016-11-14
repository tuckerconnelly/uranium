Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);
var _merge=require('lodash/merge');var _merge2=_interopRequireDefault(_merge);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function reduceStyle(style){
if(typeof style!=='object')return style;
if(!Array.isArray(style))return style;
return style.reduce(function(mergedStyles,currentStyle){return(
(0,_merge2.default)({},mergedStyles,currentStyle));},
{});
}exports.default=

function(element){var
props=element.props;var
css=props.css,style=props.style;

var newCSS=reduceStyle(css);
var newStyle=reduceStyle(style);

return _react2.default.cloneElement(element,_extends({},props,{css:newCSS,style:newStyle}));
};