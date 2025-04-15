import { AComponent } from './AComponent.js';
export class DivComponent extends AComponent {
    render() {
        this.element = document.createElement("div");
        this.applyBasicProperties();
        this.element.textContent = this.props.text;
        if (this.props.onClick) {
            this.addEventListener("click", this.props.onClick);
        }
        return this;
    }
}
//# sourceMappingURL=DivComponent.js.map