import {AElement, AComponentProps} from "@elements/AElement";

export default class HeaderElement extends AElement<AComponentProps> {
    public render(): HeaderElement {
        this.element = document.createElement("header");
        this.applyBasicProperties();
        super.render();
        return this;
    }
}
