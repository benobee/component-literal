/*
 * @description: A lightweight view layer for creating components with 
 * template literals. Appending the Component tag before the template 
 * literal string, turns the string into and actual DOM element node.
 * Using ES6 back tick template strings we can use multi-line strings 
 * to create the HTML template. Injecting data or dynamic properties 
 * are also possible using ${ - INSERT STRING OR OBJECT - }
*/

import Template from './template';

/* 
 * The HTML string used to create the component. Must be valid HTML. 
 * Using tagged template literal syntax, dynamic values can be used 
 * via '${value}'. Values can be either strings, elements or another 
 * Component (which is also just an element). An element will be 
 * coverted to a string and injected as innerHTML.
*/

const Component = (strings, ...exp) => {
	/*create new template from string*/
	const taggedLiteral = new Template(strings, ...exp);

	/* return the DOM element to be appended */
	return taggedLiteral;
};

/*
 * methods to extend to Component object
*/

const methods = {

	/*
	 * component (DOM Element Node) : The declared component wished to render.
	 * DOMSelector (String) : The target element to render the component to. 
	 * Can use string query syntax ('#id', '.class', *all', etc.), or an element 
	 * stored in a variable (const target = $('#id').
	*/
	render(component, target, callback) {
		const type = (typeof target);
		if (type === "string") {
			target = document.querySelectorAll(target);
			target[ 0 ].appendChild(component.node);
		} else if (type === "object") {
			if (target instanceof HTMLElement) {
				target = [target];
			}
			target.forEach((node) => {
				component.node.appendChild(element);
			});	
		} else {
			console.error("COMPONENT ERROR: Needs to be a valid DOM element or string selector.");
		}
		//store the render target in the component
		Component.renderTarget = target;
		
		//optional callback
		if(callback) {
			callback();
		}
	},

	//element (DOM Element Node) : returns an HTML string of a element.
	toStaticHTML(element){
		const template = new Template();
	
		return template.HTMLElementToString(element);
	}
};

//assign the methods to the main Component object
Object.assign(Component, methods);

export default Component;
