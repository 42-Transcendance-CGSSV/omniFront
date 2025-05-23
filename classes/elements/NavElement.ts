import {AComponentProps, AElement} from "@elements/AElement";

export default class NavElement extends AElement<AComponentProps> {
    public render(): NavElement {
        this.element = document.createElement("nav");
        this.applyBasicProperties();
        return this;
    }
}
