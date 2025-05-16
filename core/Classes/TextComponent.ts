import {AComponent, AComponentProps} from './AComponent.js';

interface TextComponentProps extends AComponentProps {
    text: string;
    type?: string;
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
