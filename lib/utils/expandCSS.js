Object.defineProperty(exports,"__esModule",{value:true});exports.createCSSDeclarations=exports.expandStyle=undefined;

var _decamelize=require('decamelize');var _decamelize2=_interopRequireDefault(_decamelize);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

/* eslint-disable max-len, no-param-reassign */
var unitlessNumbers={
boxFlex:true,
boxFlexGroup:true,
columnCount:true,
flex:true,
flexGrow:true,
flexPositive:true,
flexShrink:true,
flexNegative:true,
fontWeight:true,
lineClamp:true,
opacity:true,
order:true,
orphans:true,
widows:true,
zIndex:true,
zoom:true,
// SVG-related
fillOpacity:true,
strokeDashoffset:true,
strokeOpacity:true,
strokeWidth:true};// Copied from necolas/react-native-web


var normalizeValue=function normalizeValue(property,value){
if(!unitlessNumbers[property]&&typeof value==='number'){
value=value+'px';
}
return value;
};

var styleShortHands={
borderColor:['borderTopColor','borderRightColor','borderBottomColor','borderLeftColor'],
borderRadius:['borderTopLeftRadius','borderTopRightRadius','borderBottomRightRadius','borderBottomLeftRadius'],
borderStyle:['borderTopStyle','borderRightStyle','borderBottomStyle','borderLeftStyle'],
borderWidth:['borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth'],
margin:['marginTop','marginRight','marginBottom','marginLeft'],
marginHorizontal:['marginRight','marginLeft'],
marginVertical:['marginTop','marginBottom'],
overflow:['overflowX','overflowY'],
padding:['paddingTop','paddingRight','paddingBottom','paddingLeft'],
paddingHorizontal:['paddingRight','paddingLeft'],
paddingVertical:['paddingTop','paddingBottom'],
textDecorationLine:['textDecoration'],
writingDirection:['direction']};


/**
 * Alpha-sort properties, apart from shorthands – they must appear before the
 * longhand properties that they expand into. This lets more specific styles
 * override less specific styles, whatever the order in which they were
 * originally declared.
 */
var sortProps=function sortProps(propsArray){return propsArray.sort(function(a,b){
var expandedA=styleShortHands[a];
var expandedB=styleShortHands[b];
if(expandedA&&expandedA.indexOf(b)>-1){
return-1;
}else if(expandedB&&expandedB.indexOf(a)>-1){
return 1;
}
return a<b?-1:a>b?1:0;// eslint-disable-line no-nested-ternary
});};

var removeUraniumSpecificProps=function removeUraniumSpecificProps(propsArray){return(
propsArray.filter(function(prop){return!prop.match(/@media/);}));};

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 */
var expandStyle=exports.expandStyle=function expandStyle(style){
var propsArray=Object.keys(style);
var cleanProps=removeUraniumSpecificProps(propsArray);
var sortedProps=sortProps(cleanProps);

return sortedProps.reduce(function(resolvedStyle,key){
var expandedProps=styleShortHands[key];
var value=normalizeValue(key,style[key]);

// React Native treats `flex:1` like `flex:1 1 auto`
if(key==='flex'){
resolvedStyle.flexGrow=value;
resolvedStyle.flexShrink=1;
resolvedStyle.flexBasis='auto';
}else if(key==='textAlignVertical'){
resolvedStyle.verticalAlign=value==='center'?'middle':value;
}else if(expandedProps){
expandedProps.forEach(function(prop,i){
resolvedStyle[expandedProps[i]]=value;
});
}else{
resolvedStyle[key]=value;
}
return resolvedStyle;
},{});
};

var createCSSDeclarations=exports.createCSSDeclarations=function createCSSDeclarations(style){return(
Object.keys(style).map(function(prop){
var property=(0,_decamelize2.default)(prop,'-');
var value=style[prop];
return property+':'+value+';';
}).sort().join(''));};