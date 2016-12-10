Object.defineProperty(exports,"__esModule",{value:true});exports.

isWebVoidElement=isWebVoidElement;exports.default=







isWeb;var WEB_VOID_ELEMENTS=['input','TextInput'];function isWebVoidElement(element){return WEB_VOID_ELEMENTS.indexOf(element.type)!==-1||WEB_VOID_ELEMENTS.indexOf(element.type.displayName)!==-1;}function isWeb(){return!global.__BUNDLE_START_TIME__;}