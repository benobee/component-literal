/*
 * @description: turn a tagged template literal into a 
 * DOM element. 
 * @namespace: 'Component' - Create an object called Component
 * which returns to be appended to the DOM as needed, as well as 
 * store the object in the core component list array
*/

import Template from './template';

let Component = {};

/* 
 * return component as DOM element with inner
 * HTML injected into the first element in the string 
*/

Component = (strings, ...exp) => {
	/*create new template from string*/
	const taggedLiteral = new Template(strings, ...exp);

	/* return the DOM element to be appended */
	return taggedLiteral.node;
};

/*
 * method for appending nodes which is contained
 * within the parent 'Component' object
*/

Component.render = (element, target) => {
	const type = (typeof target);

	if (type === "string") {
		target = document.querySelectorAll(target);
		target[ 0 ].appendChild(element);

	} else if (type === "object") {
		if (target instanceof HTMLElement) {
			target = [target];
		}

		target.forEach((node) => {
			node.appendChild(element);
		});	

	} else {
		console.error("COMPONENT ERROR: Needs to be a valid DOM element or string selector.");
	}
};

//convert element to HTML string
Component.toStaticHTML = (element) => {
	const template = new Template();

	return template.HTMLElementToString(element);
};

export default Component;
