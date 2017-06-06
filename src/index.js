import { ComponentLiteral, Component } from './component';
import Template from './template';

window.ComponentLiteral = ComponentLiteral;
window.Component = Component;

const site = {
	init() {
		this.list = new ComponentLiteral({
			data: {
				title: "Ben"
			},
	    	html() {
	        	return (
	        	  Component `<div class="item">${this.data.title}</div>`
	        	);
	      	}
	    })
	    .events({
	    	"click .item" (e) {
	    		e.currentTarget.innerHTML = "clicked";
	    	}
	    }).render(".block:nth-child(1)");

	    this.list.update({ title: "Obee" });
	},
	update() {
	    setTimeout(() => {
	    	this.stuff.update({
	    		items: [
	    			{ name: "tiger" }, 
	    			{ name: "mountain cheek" }, 
	    			{ name: "toy" }
	    		], 
	    		classNames: { 
	    			title: "expert" 
	    		}
	    	});

	    	this.list.update({
		    	items: [
		    		{ name: "blue" }, 
		    		{ name: "mountain cabin" }, 
		    		{ name: "expert" }
		    	], 
		    	classNames: { 
		    		title: "expert" 
		    	}
	    	});

	    }, 1800 );		
	}
};

site.init();