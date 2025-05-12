import { Page } from "../core/Classes/Page.js";
import { DivComponent } from "../core/Classes/DivComponent";
import { TextComponent } from "../core/Classes/TextComponent";
import PlayerDisplayer from "../OComponents/PlayerDisplayer";

class PongPage extends Page {
    constructor() {
        const divtest = new DivComponent({ id: "divtest" });
        super("PongPage", divtest);
        this.render()

        this.setupTitle(divtest.getElement())
        this.drawPlayers(divtest.getElement())
    }

    render(): void {
        super.render();
    }


    private setupTitle(element: HTMLElement | null): void {
        const title = new TextComponent({ text: "Pong Game", id: "title" });
        if (element) {
            title.render = function () {
                this.element = document.createElement("h1");
                this.element.textContent = "Pong Game";
                return this;
            };

            title.mount(element);
        }
    }


    private drawPlayers(element: HTMLElement | null): void {
        const p1 = new PlayerDisplayer("./assets/image.png");
        if (element) {
            p1.build().mount(element);
        }
    }

}

export default PongPage;
