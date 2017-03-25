******************************************** 
# COMPONENT

**Description**

A lightweight view library for creating components with Template Literals. Appending the Component tag before the template literal string, turns the string into and actual DOM element node.

Using ES6 back tick template strings we can use multi-line strings to create the HTML template. Injecting data or dynamic properties are also possible using ${ - INSERT STRING OR OBJECT - }

********************************************

Usage

	import { Component } from 'component-literal/index';

********************************************

Method

	Component `<div class="component">${value}</div>`;

**Arguments**

The HTML string used to create the component. Must be valid HTML. Using tagged template literal syntax, dynamic values can be used via '${value}'. Values can be either strings, elements or another Component (which is also just an element). An element will be coverted to a string and injected as innerHTML.


********************************************
Method

	Component.render(component, DOMSelector);

**Arguments**

component (DOM Element Node) :
The declared component wished to render.

DOMSelector (String) :
The target element to render the component to. Can use string query syntax ('#id', '.class', *all', etc.), or an element stored in a variable (const target = $('#id'). 

********************************************
Method

	Component.toStaticHTML(element);

**Arguments**

element (DOM Element Node) :
returns an HTML string of a element.

********************************************

**EXAMPLE**

 	class Modal {
		constructor() {
			this.age = "18";
			this.name = "modal";
			this.color = "red";
			this.content = Component `<div class="inner-content">${this.age}</div>`;
			this.container = Component `
	
				<modal id="rootModalParent" class="parent">
					<div class="inner-child">${this.color}</div>
					<div class="inner-child">${this.name}</div>
					<div class="inner-child">${this.content}</div>
				</modal>
	
			`;
	
			Component.render(this.container, '#page');
		}
	}
