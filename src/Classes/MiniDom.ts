import VNode from "../types/vnode";

class MiniDOM {
	// Creates a virtual DOM element
	createElement(
		tag: string,
		props: Record<string, any> = {},
		...children: any[]
	): VNode {
		return {
			tag,
			props: props || {},
			children: children
				.flat()
				.map((child) =>
					typeof child === "string" || typeof child === "number"
						? { text: String(child) }
						: child
				),
		};
	}

	// Virtual DOM node type
	private isVNode(node: any): node is VNode {
		return node && typeof node === "object" && "tag" in node;
	}

	// Renders virtual DOM to real DOM
	render(vnode: VNode, container: HTMLElement) {
		// Clear container if needed
		container.innerHTML = "";

		// Mount the virtual tree to the real DOM
		const realDOM = this.createRealDOM(vnode);
		container.appendChild(realDOM);

		return realDOM;
	}

	// Creates real DOM from virtual DOM
	private createRealDOM(vnode: VNode): Node {
		// Handle text nodes
		if ("text" in vnode) {
			return document.createTextNode(vnode.text);
		}

		// Create element
		const element = document.createElement(vnode.tag);

		// Add properties and event listeners
		for (const [key, value] of Object.entries(vnode.props || {})) {
			if (key.startsWith("on") && typeof value === "function") {
				// Handle event listeners
				const eventName = key.slice(2).toLowerCase();
				element.addEventListener(eventName, value);
			} else {
				// Handle attributes
				element.setAttribute(key, String(value));
			}
		}

		// Add children recursively
		for (const child of vnode.children || []) {
			element.appendChild(this.createRealDOM(child));
		}

		return element;
	}
}
