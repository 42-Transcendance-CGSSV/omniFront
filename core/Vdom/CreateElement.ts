import { Vnode } from "./Vnode";

export function createElement(vnode: Vnode): HTMLElement {
	const { name, props, children } = vnode;
	const element = document.createElement(name);
	Object.keys(props).forEach((key) => {
		if (key.startsWith("on")) {
			const eventName = key.slice(2).toLowerCase();
			element.addEventListener(eventName, props[key]);
		} else {
			element.setAttribute(key, props[key]);
		}
	});
	if (children) {
		children.forEach((child) => {
			if (typeof child === "string") {
				element.appendChild(document.createTextNode(child));
			} else {
				element.appendChild(createElement(child));
			}
		});
	}
	return element;
}
