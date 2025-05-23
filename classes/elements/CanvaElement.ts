import { AElement, AComponentProps } from "./AElement";

interface CanvaComponentProps extends AComponentProps {
	id: string;
	width: number;
	height: number;
	onClick?: () => void;
}

export default class CanvaElement extends AElement<CanvaComponentProps> {
	public render(): CanvaElement {
		this.element = document.createElement("canvas");
		this.applyBasicProperties();

		if (this.props.onClick) {
			this.addEventListener("click", this.props.onClick as EventListener);
		}
		return this;
	}
}
