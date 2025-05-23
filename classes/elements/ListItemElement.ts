import i18next from "i18next";
import {AElement, AComponentProps} from './AElement';

interface ListItemComponentProps extends AComponentProps {
    type: "li" | "dl" | "dt" | "dd";
    text?: string;
    href?: string;
}

export default class ListItemElement extends AElement<ListItemComponentProps> {
    public render(): ListItemElement {
        this.element = document.createElement(this.props.type);
        this.applyBasicProperties();

        if (this.props.href) {
            const link = document.createElement("a");
            if (this.props.className) link.className = this.props.className;

            link.setAttribute("href", this.props.href);

            if (this.props.text) {
                if (this.props.text.startsWith("%") && this.props.text.endsWith("%")) this.element.textContent = i18next.t(this.props.text.slice(1, -1));
                else link.textContent = this.props.text;
            }
            this.element.appendChild(link);
        } else if (this.props.text) {
            if (this.props.text.startsWith("%") && this.props.text.endsWith("%")) this.element.textContent = i18next.t(this.props.text.slice(1, -1));
            else this.element.textContent = this.props.text;
        }

        return this;
    }
}
