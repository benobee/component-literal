
/* 
 * The HTML string used to create the component. Must be valid HTML. 
 * Using tagged template literal syntax, dynamic values can be used 
 * via '${value}'. Values can be either strings, elements or another 
 * Component (which is also just an element). An element will be 
 * coverted to a string and injected as innerHTML.
*/

import Template from './template';

const Component = (strings, ...expressions) => {
	/*create new template from string*/
	const component = new Template(strings, ...expressions);

	/* return the DOM element to be appended */		
	return component;		
};

export default Component;