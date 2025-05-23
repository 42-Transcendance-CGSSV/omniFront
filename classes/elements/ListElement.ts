import {AElement, AComponentProps} from './AElement';

interface ListComponentProps extends AComponentProps {
    type: "ul" | "ol";
}

export default class ListElement extends AElement<ListComponentProps> {
    public render(): ListElement {
        this.element = document.createElement(this.props.type);
        this.applyBasicProperties();
        return this;
    }
}
