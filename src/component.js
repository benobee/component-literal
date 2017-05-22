/*
 * @description: A lightweight view library for creating components with 
 * Template Literals. Appending the Component tag before the template 
 * literal string, turns the string into and actual DOM element node.
 * Using ES6 back tick template strings we can use multi-line strings 
 * to create the HTML template. Injecting data or dynamic properties 
 * are also possible using ${ - INSERT STRING OR OBJECT - }
*/

import morphdom from 'morphdom';
import Template from './template';
import util from './util';

/* 
 * The HTML string used to create the component. Must be valid HTML. 
 * Using tagged template literal syntax, dynamic values can be used 
 * via '${value}'. Values can be either strings, elements or another 
 * Component (which is also just an element). An element will be 
 * coverted to a string and injected as innerHTML.
*/

const Component = (strings, ...expressions) => {
	/*create new template from string*/
	const component = new Template(strings, ...expressions);

	/* return the DOM element to be appended */		
	return component;
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
	controller : {},
	render(target, callback) {
		/* 
		 * (shorthand method)
         * declaritive method for appending a Component to the DOM
		*/
	
		this.renderTarget = target;

		const type = (typeof target);

		if (type === "string") {
			target = document.querySelectorAll(target);

			target.forEach((node) =>{
				node.appendChild(this.node);
			});

		} else if (type === "object") {
			if (target instanceof HTMLElement) {
				target = [target];
			}
			target.forEach((node) => {
				this.node.appendChild(element);
			});
		} else {
			console.error("COMPONENT ERROR: Needs to be a valid DOM element or string selector.");
		}

		//optional callback
		if(callback) {
			callback();
		}

		//bind events if configured
		if (this.listeners) {
			this.bind(this.listeners);
		}

		return this;
	},
	build(controller) {

		/*
		 * (longhand method)
		 * this method will provide a long hand way for binding data to the tagged
		 * literal HTML for use in a more reactive rendering. Takes two parameters
		 * data, and a render function in a single object stated as "component".
		*/

		Object.assign(this, controller.html());

		this.data = controller.data;
		this.controller = controller;

		return this;
	},
	events(events) {
		this.listeners = events;

		Object.assign(this.controller, events);

		return this;
	},
	bind() {
		const keys = Object.keys(this.listeners);
		const values = Object.values(this.listeners);

		keys.forEach((key, i) => {
			key = key.split(" ");

			const eventType = key[ 0 ];

			const targetNode = key[ 1 ];

			const targetsToBind = document.querySelectorAll(targetNode);

			targetsToBind.forEach((target) => {
				target.addEventListener(eventType, values[ i ]);
			});
		});
	},
	update(props) {

		/*
		 * (longhand method)
		 * 
		*/

		//get the keys and values of the passed in props
		const keys = Object.keys(props);
		const values = Object.values(props);

		//match the props values and update the current ones
		keys.forEach((key, i) => {
			this.controller.data[key] = values[ i ];
		});

		const component = this.controller.render();

		morphdom(this.node, component.node);
		this.bind(this.listeners);
	}
};

//assign the methods to the main Component object
Object.assign(Component, methods);

export default Component;

