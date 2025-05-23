import {AElement, AComponentProps} from "@elements/AElement";

interface AnchorComponentProps extends AComponentProps {
    text: string;
    href?: string;
}

export default class AnchorElement extends AElement<AnchorComponentProps> {
    public render(): AnchorElement {
        this.element = document.createElement("a");
        this.applyBasicProperties();
        this.element.textContent = this.props.text;
        if (this.props.href) {
            this.element.setAttribute("href", this.props.href);
        }
        return this;
    }
}
