'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _morphdom = require('morphdom');

var _morphdom2 = _interopRequireDefault(_morphdom);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 * shorthand template literal deconstruction
 * for simple components
*/

var Template = function () {
	function Template(strings) {
		_classCallCheck(this, Template);

		this.componentLiteral = true;
		this.node = {};
		this.staticHTML = '';
		this.state = {};

		var html = '';

		for (var _len = arguments.length, exp = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			exp[_key - 1] = arguments[_key];
		}

		if (Array.isArray(strings) && exp) {
			html = _util2.default.templateToString(strings, exp);

			this.node = _util2.default.toHTMLElement(html);

			//search for helpers
			_util2.default.parsePropsHelpers(this.node);

			this.node.childNodes.forEach(function (node) {
				_util2.default.parsePropsHelpers(node);
			});

			this.staticHTML = _util2.default.formatString(this.node.outerHTML);
		}
	}

	_createClass(Template, [{
		key: 'render',
		value: function render(target, callback) {
			var _this = this;

			/* 
          * declaritive method for appending a Component to the DOM
   */

			var type = typeof target === 'undefined' ? 'undefined' : _typeof(target);

			if (type === "string") {

				target = document.querySelectorAll(target);

				target.forEach(function (node) {
					var clone = _this.controller.state.node.cloneNode(true);

					node.appendChild(clone);
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
				callback(this.node);
			}

			return this;
		}
	}]);

	return Template;
}();

exports.default = Template;