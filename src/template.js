/* 
 * shorthand template literal deconstruction
 * for simple components
*/

import morphdom from 'morphdom';
import util from './util';

class Template {
	constructor(strings, ...exp) {

		this.componentLiteral = true;
		this.node = {};
		this.staticHTML = '';

		let html = '';

		if (Array.isArray(strings) && exp) {
			html = util.templateToString(strings, exp);

			this.node = util.toHTMLElement(html);

			//search for helpers
			util.parsePropsHelpers(this.node);

			this.node.childNodes.forEach((node) => {
				util.parsePropsHelpers(node);
			});

			this.staticHTML = util.formatString(this.node.outerHTML);
		}
	}
	render(selector, callback) {

		/*
		 * (longhand method)
		 * subscribe to a DOM elment. If the element appears within the DOM
		 * component will be rendered to the document to the target element
		 * callback method applied for convenience
		*/
	
		const target = document.querySelectorAll(selector);

		if (target.length !== 0) {
			target.forEach((node) => {
				// const clone = this.node.cloneNode(true);
				node.appendChild(this.node);
			});
		}

		if (callback) {
			callback();
		}

		return this;		
	}
	update(next, ...options) {
		morphdom(this.node, next.node);
	}
}

export default Template;