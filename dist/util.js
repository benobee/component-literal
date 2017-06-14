'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});
/* 
 * useful methods for construction and deconstructing
 * strings and DOM elements.
*/

var util = {
		toHTMLElement: function toHTMLElement(string) {

				/*
     * create dummy dom, look for child node
     * and return the freshly created DOM node
    */

				var node = document.createElement("html");

				node.innerHTML = string;
				this.staticHTML = string;
				node = node.childNodes[1].childNodes[0];

				return node;
		},
		parsePropsHelpers: function parsePropsHelpers(node) {
				for (var key in node.attributes) {
						if (key) {
								var item = node.attributes[key];

								if (item.name && item.nodeValue && item.nodeValue !== '[object Object]') {
										switch (item.name) {
												case 'data-slug':
														item.nodeValue = this.slugify(item.nodeValue);
														break;
												default:
										}
								}
						}
				}
		},
		slugify: function slugify(str) {
				return str.toLowerCase().replace(/ /g, "-").replace(/-&-/g, "-").replace(/[^\w-]+/g, '');
		},
		templateToString: function templateToString(strings, exp) {

				/*
     * parse and join the strings and data
    */

				var joined = "";

				//if the template literal is a string with no expressions
				joined = joined = strings.map(function (item, i) {
						return item;
				}).join("");

				//if the template literal has expressions join them with the strings
				if (exp.length > 0) {
						joined = joined = strings.map(function (item, i) {
								return item + exp[i];
						}).join("");
				}

				//if the template literal has expressions, but contains an array
				if (Array.isArray(exp[0])) {
						var inner = exp[0].map(function (item, i) {
								return item;
						}).join("");

						joined = strings.map(function (item, i) {
								return item + inner;
						}).join("");
				}

				//remove white spaces, tabs, returns
				joined = this.formatString(joined);

				return joined;
		},
		formatString: function formatString(str) {

				/*
     * remove all whitespace, tabs and return lines from string
    */

				str = str.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, '');

				//const match = str.match(/<[^>]*>/g);

				return str;
		}
};

exports.default = util;