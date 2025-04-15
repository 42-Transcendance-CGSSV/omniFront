import { AComponent, AComponentProps } from './AComponent.js';

interface DivComponentProps extends AComponentProps {
	text: string;
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
