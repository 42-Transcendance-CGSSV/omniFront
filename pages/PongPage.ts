import { Page } from "../core/Classes/Page.js";
import { CanvaComponent } from "../core/Classes/CanvaComponent.js";
import { AComponent } from "../core/Classes/AComponent.js";

class PongPage extends Page {
	constructor() {
		const canva = new CanvaComponent({ id: "test", width: 200, height: 200 });
		const title = new AComponent({});
		title.render = function() {
			this.element = document.createElement("h1");
			this.element.textContent = "Pong Game";
			return this;
		};
		super("PongPage", canva, title);
	}

	render(): void {
		super.render();
	}
}

export default PongPage;
