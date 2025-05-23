import i18next from "i18next";
import {AElement, AComponentProps} from './AElement';

interface TextComponentProps extends AComponentProps {
    text: string;
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    onClick?: () => void;
}

export default class TextElement extends AElement<TextComponentProps> {
    public render(): TextElement {
        this.element = document.createElement(!this.props.type ? "p" : this.props.type);
        this.applyBasicProperties();

        if (this.props.text.startsWith("%") && this.props.text.endsWith("%")) {
            this.element.textContent = i18next.t(this.props.text.slice(1, -1));
        }
        else this.element.textContent = this.props.text;

        if (this.props.onClick) {
            this.addEventListener("click", this.props.onClick as EventListener);
        }
        return this;
    }
}
