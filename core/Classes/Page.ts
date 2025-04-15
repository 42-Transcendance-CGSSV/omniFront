import { AComponent } from "./AComponent.js";

export class Page {
	protected name: string;
	protected components: AComponent[];

	constructor(name: string, ...components: AComponent[]) {
		this.name = name;
		this.components = components;
	}

	public render(): void {
		const app = document.getElementById("app");
		if (app) {
			app.innerHTML = ''; // Clear the container
			this.components.forEach(component => {
				component.mount(app);
			});
		}
	}

	public addComponent(component: AComponent): void {
		this.components.push(component);
	}

	public removeComponent(component: AComponent): void {
		const index = this.components.indexOf(component);
		if (index !== -1) {
			this.components.splice(index, 1);
		}
	}
}
