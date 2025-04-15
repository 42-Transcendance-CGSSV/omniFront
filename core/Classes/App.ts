import { AComponent } from './AComponent.js';

export class App {
	private rootComponent: AComponent;
	private rootElement: HTMLElement;

	constructor(rootComponent: AComponent, rootElement: HTMLElement) {
		this.rootComponent = rootComponent;
		this.rootElement = rootElement;
	}

	public run() {
		this.rootComponent.mount(this.rootElement);
	}
}
