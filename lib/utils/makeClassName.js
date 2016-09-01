'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _jshashes=require('jshashes');var _jshashes2=_interopRequireDefault(_jshashes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

// Recursively removes functions and nested objects from an object
// Needed because Animated.values had circular dependencies
// which were throwing errors in JSON.stringify below
var flatten=function(object){
var cleanObject={};
for(var key in object){
if(!object.hasOwnProperty(key))continue;
cleanObject[key]=
typeof object[key]==='object'||
typeof object[key]==='function'?
object[key].toString():
object[key];}

return cleanObject;};


// Uses a 7-length substring of the MD5 of the css for a unique
// id for className
exports.default=function(css){
var cssHash=new _jshashes2.default.MD5().hex(JSON.stringify(flatten(css))).substr(0,7);
return 'ur-'+cssHash;};