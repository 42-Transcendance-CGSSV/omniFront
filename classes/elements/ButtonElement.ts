import {AElement, AComponentProps} from "./AElement";

interface ButtonComponentProps extends AComponentProps {
    id: string;
    text?: string;
    className?: string;
    onClick?: (event: Event) => void;
}

export default class ButtonElement extends AElement<ButtonComponentProps> {
    public render(): ButtonElement {
        this.element = document.createElement("button");
        this.applyBasicProperties();

        if (this.props.className) {
            this.element.className = this.props.className;
        }

        if (this.props.text)
            this.element.textContent = this.props.text;

        if (this.props.onClick) {
            this.addEventListener("click", this.props.onClick as EventListener);
        }

        return this;
    }
}
