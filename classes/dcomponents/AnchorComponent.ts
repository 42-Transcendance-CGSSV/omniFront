import {AComponent, AComponentProps} from "@dcomponents/AComponent";

interface AnchorComponentProps extends AComponentProps {
    text: string;
    href?: string;
}

export default class AnchorComponent extends AComponent<AnchorComponentProps> {
    public render(): AnchorComponent {
        this.element = document.createElement("a");
        this.applyBasicProperties();
        this.element.textContent = this.props.text;
        if (this.props.href) {
            this.element.setAttribute("href", this.props.href);
        }
        return this;
    }
}
