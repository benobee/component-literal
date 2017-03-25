/* 
 * create template class for decontructing tagged
 * template literal
*/

class Template {
	constructor(strings, ...exp) {
		if (strings && exp) {
			const html = this.templateToString(strings, exp);
			this.node = this.toHTMLElement(html);			
		}
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
	HTMLElementToString(node) {

		/*
		 * return the outer html of a node
		*/
	
		return this.formatString(node.outerHTML);
	}
	templateToString(strings, exp) {

		/*
		 * parse and join the strings and data
		*/

		let joined = strings.map((item, i) => {
			if (exp[ i ]) {

				/*
				 * if the inner content is a DOM element 
				*/
				
				if (exp[ i ] instanceof HTMLElement) {
					return this.HTMLElementToString(exp[ i ]);
				}

				return item + exp[ i ];
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