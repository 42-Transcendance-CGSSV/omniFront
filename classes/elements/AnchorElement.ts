import {AElement, AComponentProps} from "@elements/AElement";
import i18next from "i18next";

interface AnchorComponentProps extends AComponentProps {
    text: string;
    href?: string;
}

export default class AnchorElement extends AElement<AnchorComponentProps> {
    public render(): AnchorElement {
        this.element = document.createElement("a");
        this.applyBasicProperties();
        if (this.props.text.startsWith("%") && this.props.text.endsWith("%")) {
            this.element.textContent = i18next.t(this.props.text.slice(1, -1));
        }
        else this.element.textContent = this.props.text;
        if (this.props.href) {
            this.element.setAttribute("href", this.props.href);
        }
        return this;
    }
}
