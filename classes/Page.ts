import {AComponent} from "@dcomponents/AComponent";

export default class Page {
    protected name: string;
    protected components: AComponent[];

    constructor(name: string, ...components: AComponent[]) {
        this.name = name;
        this.components = components;
    }

    public render(): void {
        const app = document.getElementById("app");
        if (app) {
            // virtual node to implement there
            app.innerHTML = ""; // Clear the container
            this.components.forEach((component) => {
                component.mount(app);
            });
            if (typeof (this as any).mounted === "function") {
                (this as any).mounted();
            }
        }
    }

    public addComponent(component: AComponent): void {
        this.components.push(component);
        console.log('Add component in page', this.name, 'with components:', this.components);
    }

    public removeComponent(component: AComponent): void {
        const index = this.components.indexOf(component);
        if (index !== -1) {
            this.components.splice(index, 1);
        }
    }
}
