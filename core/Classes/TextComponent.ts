import {AComponent, AComponentProps} from './AComponent.js';

interface TextComponentProps extends AComponentProps {
    text: string;
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    onClick?: () => void;
}

export class TextComponent extends AComponent<TextComponentProps> {
    public render(): TextComponent {
        this.element = document.createElement(!this.props.type ? "p" : this.props.type);
        this.applyBasicProperties();
        this.element.textContent = this.props.text;

        if (this.props.onClick) {
            this.addEventListener("click", this.props.onClick as EventListener);
        }
        return this;
    }
}
