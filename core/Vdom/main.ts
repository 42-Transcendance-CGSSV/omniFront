import { createElement } from "./CreateElement";

const Vapp = createElement({
	name: "div",
	props: {
		id: "app",
	},
});

console.log(Vapp);
