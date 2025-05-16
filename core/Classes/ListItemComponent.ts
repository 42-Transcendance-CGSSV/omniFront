import {AComponent, AComponentProps} from './AComponent.js';

interface ListItemComponentProps extends AComponentProps {
    type: "li" | "dl" | "dt" | "dd";
    text?: string;
    href?: string;
}

export default class ListItemComponent extends AComponent<ListItemComponentProps> {
    public render(): ListItemComponent {
        this.element = document.createElement(this.props.type);
        this.applyBasicProperties();

        if (this.props.href) {
            const link = document.createElement("a");
            if (this.props.className)
                link.className = this.props.className;
            link.setAttribute("href", this.props.href);
            link.textContent = this.props.text as string | null;
            this.element.appendChild(link);
        } else if (this.props.text)
            this.element.textContent = this.props.text;

        return this;
    }
}
