******************************************** 
# COMPONENT LITERAL

**Description**

A lightweight, flexible, and dead simple way to create DOM components with template literals.

********************************************

Usage

	import { Component } from 'component-literal/index';
	

********************************************

Method

	Component `<div class="component">${value}</div>`;

**Arguments**

The HTML string used to create the component. Must be valid HTML. Using tagged template literal syntax, dynamic values can be used via '${value}'. Values can be either strings, elements or a Component Literal. An element will be coverted to a string and injected as innerHTML.

********************************************
Method

	Component.render(component, DOMSelector, callback);

**Arguments**

component (DOM Element Node) :
The declared component wished to render.

DOMSelector (String) :
The target element to render the component to. Can use string query syntax ('#id', '.class', *all', etc.), or an element stored in a variable (const target = $('#id'). 

********************************************
Method

	[ComponentVariableName].update( Component `<div class="new-component"></div>`);

**EXAMPLE**

	const dog = Component `<dog>Ted</dog>`;

	dog.update(Component `<dog class="pet">Bob</dog>`);

********************************************

**EXAMPLE**

	import { Component } from 'component-literal/index';
	import * as data from '../../../data.json';
  
	class List {
	  constructor() {
	    this.items = data.items.map((item, i) => {
	        return (
	    	    Component `
	    	      <div id="${item.id}" class="collection-item">
	    	        <div class="content">
	                <div class="media">
	                  <div class="image" style="background-image:url(${item.assetUrl});"></div>
	                </div>
	    	          <div class="title">
	    	            ${item.title}
	    	          </div>
	    	          <div class="tags">
	    	          	${item.categories}
	    	          </div>
	    	        </div>
	    	      </div>
	    	  `)
	  	});

	  	this.container = Component `<div class="collection-list">${this.items.slice(0, 4)}</div>`;
	  	
	  	Component.render(this.container, '#page');
	  }
	}

	export default List;

********************************************

morphdom

This module was created to solve the problem of updating the DOM in response to a UI component or page being rerendered. One way to update the DOM is to simply toss away the existing DOM tree and replace it with a new DOM tree (e.g., myContainer.innerHTML = newHTML). While replacing an existing DOM tree with an entirely new DOM tree will actually be very fast, it comes with a cost. The cost is that all of the internal state associated with the existing DOM nodes (scroll positions, input caret positions, CSS transition states, etc.) will be lost. Instead of replacing the existing DOM tree with a new DOM tree we want to transform the existing DOM tree to match the new DOM tree while minimizing the number of changes to the existing DOM tree. This is exactly what the morphdom module does! Give it an existing DOM node tree and a target DOM node tree and it will efficiently transform the existing DOM node tree to exactly match the target DOM node tree with the minimum amount of changes.

[Learn more about morphdom](https://github.com/patrick-steele-idem/morphdom)