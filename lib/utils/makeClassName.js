Object.defineProperty(exports,"__esModule",{value:true});var _jshashes=require('jshashes');var _jshashes2=_interopRequireDefault(_jshashes);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}




var flatten=function flatten(object){
var cleanObject={};
for(var key in object){
if(!object.hasOwnProperty(key))continue;
cleanObject[key]=
typeof object[key]==='object'||
typeof object[key]==='function'?
object[key].toString():
object[key];
}
return cleanObject;
};exports.default=



function(css){
var cssHash=new _jshashes2.default.MD5().hex(JSON.stringify(flatten(css))).substr(0,7);
return'ur-'+cssHash;
};