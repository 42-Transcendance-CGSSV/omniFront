import {AComponent, AComponentProps} from "./AComponent";
import i18next from "i18next";

interface ButtonComponentProps extends AComponentProps {
    id: string;
    text: string;
    className?: string;
    onClick?: (event: Event) => void;
}

export default class ButtonComponent extends AComponent<ButtonComponentProps> {
    public render(): ButtonComponent {
        this.element = document.createElement("button");
        this.applyBasicProperties();

        if (this.props.className) {
            this.element.className = this.props.className;
        }

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
