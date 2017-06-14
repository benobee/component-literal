import { Component, ComponentLiteral } from '../src/component.js';

const item = new ComponentLiteral({
	html() {
		return (
			Component `<div class="item">Item Dog</div>`
		);
	}
}).events({
	"click .item" (e) {
		console.log(e);
	}
}).render("main");