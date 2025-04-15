import { AComponent, AComponentProps } from "./AComponent.js";

interface CanvaComponentProps extends AComponentProps {
	id: string;
	width: number;
	height: number;
	onClick?: () => void;
}

export class CanvaComponent extends AComponent<CanvaComponentProps> {
	public render(): CanvaComponent {
		this.element = document.createElement("canvas");
		this.applyBasicProperties();

		if (this.props.onClick) {
			this.addEventListener("click", this.props.onClick as EventListener);
		}
		return this;
	}
}
