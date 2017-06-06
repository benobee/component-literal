/*
 * @description: A view library for creating reactive components with 
 * Template Literals. Appending the Component tag before the template 
 * literal string, turns the string into and actual DOM element node.
 * Using ES6 back tick template strings we can use multi-line strings 
 * to create the HTML template. 
 * 
 * Injecting data or dynamic properties are also possible using 
 * ${ - INSERT STRING OR OBJECT - }
*/

import morphdom from 'morphdom';
import util from './util';

class ComponentLiteral {
		constructor(controller) {

			/*
			 * this method will provide a way for binding data to the tagged
			 * literal HTML for use in reactive rendering. Takes three parameters:
			 * data (object), html (method), events (method).
			*/

			this.data = controller.data;
			this.controller = controller;

			Object.assign(this.controller, controller.html() );

			//set state
			this.controller.state = controller.html();

			return this;
		}
		render(target, callback) {

			/* 
	         * declaritive method for appending a Component to the DOM
			*/
		
			this.controller.renderTarget = target;

			const type = (typeof target);

			if (type === "string") {

				target = document.querySelectorAll(target);

				target.forEach((node) => {
					node.appendChild(this.controller.state.node);
				});

			} else if (type === "object") {
				if (target instanceof HTMLElement) {
					target = [target];
				}
				target.forEach((node) => {
					this.node.appendChild(node);
				});
			} else {
				console.error("COMPONENT ERROR: Needs to be a valid DOM element or string selector.");
			}

			//optional callback
			if (callback) {
				callback();
			}

			//bind events if configured
			if (this.listeners) {
				this.bind(this.listeners);
			}

			return this;
		}
		events(events) {

			/*
			 * Used with the build method 
			*/
		
			this.listeners = events;

			Object.assign(this.controller, events);

			return this;
		}
		bind() {

			/*
			 * Used to bind events after render and after component updates
			*/

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
		}
		update(props) {
			//get the keys and values of the passed in props
			const keys = Object.keys(props);

			const values = Object.values(props);

			//match the props values and update the current ones
			keys.forEach((key, i) => {
				this.controller.data[ key ] = values[ i ];
			});

			const component = this.controller.html();

			morphdom(this.controller.state.node, component.node);

			if (this.listeners) {
				this.bind(this.listeners);			
			}
		}
}

export default ComponentLiteral;

