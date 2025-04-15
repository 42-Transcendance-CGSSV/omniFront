import { AComponent } from './AComponent.js';
export class TextComponent extends AComponent {
    render() {
        this.element = document.createElement("p");
        this.applyBasicProperties();
        this.element.textContent = this.props.text;
        if (this.props.onClick) {
            this.addEventListener("click", this.props.onClick);
        }
        return this;
    }
}
//# sourceMappingURL=TextComponent.js.map