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
	parsePropsHelpers(node) {
		for (const key in node.attributes) {
				if (key) {
				    const item = node.attributes[ key ];

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
	slugify(str) {
		return str.toLowerCase().replace(/ /g, "-").replace(/-&-/g, "-").replace(/[^\w-]+/g, '');
	},
	templateToString(strings, exp) {

		/*
		 * parse and join the strings and data
		*/
	
		let joined = "";

		if (Array.isArray(exp[ 0 ])) {
			const inner = exp[ 0 ].map((item, i) => {
				return item;
			}).join("");

			joined = strings.map((item, i) => {
				return item + inner;
			}).join("");
		}

		joined = this.formatString(joined);

		return joined;
	},
	formatString(str) {

		/*
		 * remove all whitespace, tabs and return lines from string
		*/ 

		str = str.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, '');

		//const match = str.match(/<[^>]*>/g);

		return str;
	}
};

export default util;