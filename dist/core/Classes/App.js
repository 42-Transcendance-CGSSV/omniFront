export class App {
    constructor(rootComponent, rootElement) {
        this.rootComponent = rootComponent;
        this.rootElement = rootElement;
    }
    run() {
        this.rootComponent.mount(this.rootElement);
    }
}
//# sourceMappingURL=App.js.map