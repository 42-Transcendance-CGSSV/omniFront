import { Page } from "./index";
import { CanvaComponent } from "../core/Classes/CanvaComponent.js";

class PongPage extends Page {
	constructor() {
		const canva = new CanvaComponent({ id: "test", width: 200, height: 200 });
		super("PongPage", canva);
	}

	render(): void {
		const app = document.getElementById("app");
		if (app) {
			if (this.component) {
				this.component.mount(app);
			}
		}
	}
}

export default PongPage;
