import {AComponent, AComponentProps} from './AComponent.js';

interface ListComponentProps extends AComponentProps {
    type: "ul" | "ol";
}

export default class ListComponent extends AComponent<ListComponentProps> {
    public render(): ListComponent {
        this.element = document.createElement(this.props.type);
        this.applyBasicProperties();
        return this;
    }
}
