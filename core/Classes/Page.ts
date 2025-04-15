import { AComponent } from "./AComponent";

export class Page {
	protected name: string;
	protected component: AComponent | null;
	protected content: string = "";

	constructor(name: string, component?: AComponent) {
		this.name = name;
		this.component = component || null;
	}

	protected setContent(content: string): void {
		this.content = content;
		const app = document.getElementById("app");
		if (app) {
			app.innerHTML = content;
		}
	}

	public render(): void {
		// Méthode à implémenter par les classes enfants
	}
}
