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
		this.state = {};

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
}

export default Template;