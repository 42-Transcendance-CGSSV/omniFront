import { AComponent, AComponentProps } from "./AComponent";

interface ButtonComponentProps extends AComponentProps {
	id: string;
	text: string;
	className?: string;
	onClick?: () => void;
}

export default class ButtonComponent extends AComponent<ButtonComponentProps> {
	public render(): ButtonComponent {
		this.element = document.createElement("button");
		this.applyBasicProperties();

		this.element.textContent = this.props.text;

		if (this.props.className) {
			this.element.className = this.props.className;
		}

		if (this.props.onClick) {
			this.addEventListener("click", this.props.onClick as EventListener);
		}

		return this;
	}
}
