/* 
 * useful methods for construction and deconstructing
 * strings and DOM elements.
*/

const util = {
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
	},
	parseProps(node) {
 		const attrs = {};

		for (const key in node.attributes) {
		    const item = node.attributes[key];

		    if (item.name && item.nodeValue && item.nodeValue !== '[object Object]'){
				Object.assign(attrs, {[item.name]: item.nodeValue});
		    }
		}

		return attrs;
	},
	HTMLElementToString(component) {

		/*
		 * return the outer html of a node
		*/
	
		return this.formatString(component.node.outerHTML);
	},
	templateToString(strings, exp) {

		/*
		 * parse and join the strings and data
		*/

		let joined = strings.map((item, i) => {

			let expression = exp[ i ];

			if (expression) {
				const type = (typeof expression);

				if (Array.isArray(expression) && expression[ 0 ].componentLiteral) {
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
	},
	formatString(str) {

		/*
		 * remove all whitespace, tabs and return lines from string
		*/ 

		return str.replace(/\r?\n|\r/g, "").replace(/\t/g, "");
	}
};

export default util;