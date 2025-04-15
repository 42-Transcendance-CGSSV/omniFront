import { AComponent } from './AComponent.js';
export class ImgComponent extends AComponent {
    render() {
        this.element = document.createElement("img");
        this.applyBasicProperties();
        this.element.setAttribute("src", this.props.src);
        if (this.props.alt) {
            this.element.setAttribute("alt", this.props.alt);
        }
        if (this.props.onClick) {
            this.addEventListener("click", this.props.onClick);
        }
        return this;
    }
}
//# sourceMappingURL=ImgComponent.js.map