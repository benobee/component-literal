import { ComponentLiteral, Component } from "./component";

const site = {
	init() {
		this.list = new ComponentLiteral({
		    data: {
			    items: [
			      { name: "red" }, 
			      { name: "beach house" }, 
			      { name: "novice" }
			    ],
			    classNames: {
			    	title: "novice",
			    }	      		
		    },
	    	html() {
	        	return (
	        	  Component `<div class="collection-list">
	        	      ${ this.data.items.map((item, i) => {
	        	        return (
	        	          `<div data-id="item_${ i + 1 }" class="item ${this.data.classNames.title}">
	        	            ${ item.name }
	        	          </div>`
	        	        );
	        	      })}
	        	    </div>`
	        	);
	      	}
	    })
	    .events({
	    	"click .expert" (e) {
	    		e.currentTarget.innerHTML = "clicked";
	    	}
	    }).render("#main-content");

		this.stuff = new ComponentLiteral({
			data: {
			    items: [
			        { name: "green" },
			    ],
			    classNames: {
			    	title: "novice",
			    }
		    },	
	      	html() {
	        	return (
	          		Component `<div class="collection-list">
	              		${this.data.items.map((item, i) => {
	              		  return (
	              		    `<div data-id="item_${ i + 1 }" class="item ${this.data.classNames.title}">
	              		      ${ item.name }
	              		    </div>`
	              		  );
	              		})}
	            	</div>`
	        	);
	      	}
	    })
	    .events({
	    	"click .expert" (e) {
	    		e.currentTarget.innerHTML = "clicked";
	    	}
	    }).render(".Footer");

	   	this.update();
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