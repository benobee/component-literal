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
		this.renderTarget = {};
		this.staticHTML = '';
		
		if (strings && exp) {
			const html = util.templateToString(strings, exp);
			this.node = util.toHTMLElement(html);
			this.staticHTML = util.formatString(html);
			this.attrs = util.parseProps(this.node);
		}
	}
	update(next, ...options) {
		
		morphdom(this.node, next.node);

	}
}

export default Template;