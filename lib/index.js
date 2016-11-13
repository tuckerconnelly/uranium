Object.defineProperty(exports,"__esModule",{value:true});exports.matchMediaMock=exports.animate=undefined;var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _animate=require('./animate');Object.defineProperty(exports,'animate',{enumerable:true,get:function get(){return _interopRequireDefault(_animate).








default;}});var _matchMediaMock=require('./matchMediaMock');Object.defineProperty(exports,'matchMediaMock',{enumerable:true,get:function get(){return _interopRequireDefault(_matchMediaMock).
default;}});var _react=require('react');var _ReactInjection=require('react/lib/ReactInjection');var _resolveStyles=require('./resolveStyles');var _resolveStyles2=_interopRequireDefault(_resolveStyles);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}_ReactInjection.DOMProperty.injectDOMPropertyConfig({isCustomAttribute:function isCustomAttribute(attributeName){return attributeName==='css';}});exports.default=

function(component){var _class,_temp;

var ComposedComponent=component.render||component.prototype.render?
component:(_temp=_class=function(_Component){_inherits(_class,_Component);function _class(){_classCallCheck(this,_class);return _possibleConstructorReturn(this,(_class.__proto__||Object.getPrototypeOf(_class)).apply(this,arguments));}_createClass(_class,[{key:'render',value:function render()




{
return component(this.props);
}}]);return _class;}(_react.Component),_class.propTypes=component.propTypes,_class.defaultProps=component.defaultProps,_temp);var


Uranium=function(_ComposedComponent){_inherits(Uranium,_ComposedComponent);function Uranium(){var _ref;var _temp2,_this2,_ret;_classCallCheck(this,Uranium);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp2=(_this2=_possibleConstructorReturn(this,(_ref=Uranium.__proto__||Object.getPrototypeOf(Uranium)).call.apply(_ref,[this].concat(args))),_this2),_this2.

_protectedForceUpdate=function(){return!_this2._unmounted&&_this2.forceUpdate();},_temp2),_possibleConstructorReturn(_this2,_ret);}_createClass(Uranium,[{key:'componentWillUnmount',value:function componentWillUnmount(){this._unmounted=true;}},{key:'render',value:function render()

{
return(0,_resolveStyles2.default)(_get(Uranium.prototype.__proto__||Object.getPrototypeOf(Uranium.prototype),'render',this).call(this),this._protectedForceUpdate);
}}]);return Uranium;}(ComposedComponent);



Uranium.displayName=
'Uranium('+(
ComposedComponent.displayName||ComposedComponent.name||'Component')+
')';


return Uranium;
};