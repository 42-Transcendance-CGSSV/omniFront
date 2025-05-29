import { AElement, AComponentProps } from './AElement';

//The div component is a basic component that creates a div element and applies basic properties to it. It can also handle click events if provided.
// It doesn't need text content as a prop. Because A div it's just a box that can container other elements.
// If you need to add text content to the div you can add it as a child element with appendChild method or TextElement in your specific page.
interface DivComponentProps extends AComponentProps {
    onClick?: () => void;
    style?: string;
}

export default class DivElement extends AElement<DivComponentProps> {
    public render(): DivElement {
        super.render();

        if (this.props.style)
            this.element!.style = this.props.style;

        if (this.props.onClick) {
            this.addEventListener("click", this.props.onClick as EventListener);
        }
        return this;
    }
}
