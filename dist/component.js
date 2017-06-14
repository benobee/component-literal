'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ComponentLiteral = exports.Component = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _morphdom = require('morphdom');

var _morphdom2 = _interopRequireDefault(_morphdom);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @description: A view library for creating reactive components with 
 * Template Literals. Appending the Component tag before the template 
 * literal string, turns the string into and actual DOM element node.
 * Using ES6 back tick template strings we can use multi-line strings 
 * to create the HTML template. 
 * 
 * Injecting data or dynamic properties are also possible using 
 * ${ - INSERT STRING OR OBJECT - }
*/

var ComponentLiteral = function () {
	function ComponentLiteral(controller) {
		_classCallCheck(this, ComponentLiteral);

		/*
   * this method will provide a way for binding data to the tagged
   * literal HTML for use in reactive rendering. Takes three parameters:
   * data (object), html (method), events (method).
  */

		if (controller.data) {
			this.data = controller.data;
		}

		this.controller = controller;

		Object.assign(this.controller, controller.html());

		//set state
		this.controller.state = controller.html();

		return this;
	}

	_createClass(ComponentLiteral, [{
		key: 'clone',
		value: function clone(object) {
			var clone = {};

			Object.assign(clone, object);

			return clone;
		}
	}, {
		key: 'render',
		value: function render(target, callback) {
			var _this = this;

			/* 
          * declaritive method for appending a Component to the DOM
   */

			this.controller.renderTarget = target;

			var type = typeof target === 'undefined' ? 'undefined' : _typeof(target);

			if (type === "string") {

				target = document.querySelectorAll(target);

				var el = this.controller.state.node;

				if (target.length === 1) {
					target[0].appendChild(this.controller.state.node);
				} else {
					target.forEach(function (node) {
						el = _this.controller.state.node.cloneNode(true);
						node.appendChild(el);
					});
				}

				target.forEach(function (node) {
					node.appendChild(el);
				});
			} else if (type === "object") {
				if (target instanceof HTMLElement) {
					target = [target];
				}
				target.forEach(function (node) {
					_this.node.appendChild(node);
				});
			} else {
				console.error("COMPONENT ERROR: Needs to be a valid DOM element or string selector.");
			}

			//optional callback
			if (callback) {
				callback();
			}

			//bind events if configured
			if (this.listeners) {
				this.bind(this.listeners);
			}

			return this;
		}
	}, {
		key: 'events',
		value: function events(_events) {

			/*
    * Used with the build method 
   */

			this.listeners = _events;

			Object.assign(this.controller, _events);

			return this;
		}
	}, {
		key: 'bind',
		value: function bind() {

			/*
    * Used to bind events after render and after component updates
   */

			var keys = Object.keys(this.listeners);

			var values = Object.values(this.listeners);

			keys.forEach(function (key, i) {
				key = key.split(" ");

				var eventType = key[0];

				var targetNode = key[1];

				var targetsToBind = document.querySelectorAll(targetNode);

				targetsToBind.forEach(function (target) {
					target.addEventListener(eventType, values[i]);
				});
			});
		}
	}, {
		key: 'update',
		value: function update(props) {
			var _this2 = this;

			//get the keys and values of the passed in props
			var keys = Object.keys(props);

			var values = Object.values(props);

			//match the props values and update the current ones
			keys.forEach(function (key, i) {
				_this2.controller.data[key] = values[i];
			});

			var component = this.controller.html();

			(0, _morphdom2.default)(this.controller.state.node, component.node);

			if (this.listeners) {
				this.bind(this.listeners);
			}
		}
	}]);

	return ComponentLiteral;
}();

/* 
 * The HTML string used to create the component. Must be valid HTML. 
 * Using tagged template literal syntax, dynamic values can be used 
 * via '${value}'. Values can be either strings, elements or another 
 * Component (which is also just an element). An element will be 
 * coverted to a string and injected as innerHTML.
*/

var Component = function Component(strings) {
	for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		expressions[_key - 1] = arguments[_key];
	}

	/*create new template from string*/
	var component = new (Function.prototype.bind.apply(_template2.default, [null].concat([strings], expressions)))();

	/* return the DOM element to be appended */
	return component;
};

exports.Component = Component;
exports.ComponentLiteral = ComponentLiteral;