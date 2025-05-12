import {AComponent, AComponentProps} from './AComponent.js';

//The div component is a basic component that creates a div element and applies basic properties to it. It can also handle click events if provided.
// It doesn't need text content as a prop. Because A div it's just a box that can container other elements.
// If you need to add text content to the div you can add it as a child element with appendChild method or TextComponent in your specific page.
interface DivComponentProps extends AComponentProps {
    onClick?: () => void;
}

export class DivComponent extends AComponent<DivComponentProps> {
    public render(): DivComponent {
        this.element = document.createElement("div");
        this.applyBasicProperties();
        this.element.textContent = this.props.text;

        if (this.props.onClick) {
            this.addEventListener("click", this.props.onClick as EventListener);
        }
        return this;
    }
}
