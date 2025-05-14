import {Page} from "../core/Classes/Page";
import {NavBar} from "../OComponents/NavBar";

class HomePage extends Page {

    constructor() {
        super("PongPage", new NavBar({ }));
        this.render()
    }

    render(): void {
        super.render();
    }

}

export default HomePage;
