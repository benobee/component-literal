/* 
 * create template class for decontructing tagged
 * template literal
*/
import morphdom from 'morphdom';

class Template {
	constructor(strings, ...exp) {
		this.name = "ravenComponent";
		this[this.name] = true;
		this.node = {};
		this.renderTarget = {};
		this.staticHTML = '';
		this.props = this.parseProps(exp);
		
		if (strings && exp) {
			const html = this.templateToString(strings, exp);
			this.node = this.toHTMLElement(html);
		}
	}
	parseProps(exp) {
		return exp;
	}	
	toHTMLElement(string) {

		/*
		 * create dummy dom, look for child node
		 * and return the freshly created DOM node
		*/

		let node = document.createElement("html");

		node.innerHTML = string;
		this.staticHTML = string;

		node = node.childNodes[ 1 ].childNodes[ 0 ];

		return node;
	}
	HTMLElementToString(component) {

		/*
		 * return the outer html of a node
		*/
	
		return this.formatString(component.node.outerHTML);
	}
	beforeUpdate(func) {

		if (func) {
			func();
		}

		return this;
	}
	update(next, ...options) {
		
		const promise = new Promise((resolve, reject) => {
			if (this.beforeUpdate()) {
				//efficiently updates the DOM from node to another
				resolve( morphdom(this.node, next.node) );				
			}
		});

		promise.then(() => {
			this.afterUpdate();
		});

		return this;
	}
	afterUpdate(func) {

		if (func) {
			func();
		}

		return this;
	}
	templateToString(strings, exp) {

		/*
		 * parse and join the strings and data
		*/

		let joined = strings.map((item, i) => {
			if (exp[ i ]) {

				let expression = exp[ i ];
				const type = (typeof expression);

				if (type === "object" && Array.isArray(expression) && expression[ 0 ][this.name]) {
					expression = expression.map((object) => {
						return object.staticHTML;
					}).join("");
				} 

				return item + expression;
			}

			return item;
			
		}).join("");

		joined = this.formatString(joined);

		return joined;

	}
	formatString(str) {

		/*
		 * remove all whitespace, tabs and return lines from string
		*/ 

		return str.replace(/\r?\n|\r/g, "").replace(/\t/g, "");
	}
}

export default Template;