import { AElement, AComponentProps } from "./AElement";

interface ImgProps extends AComponentProps {
	src: string;
	alt?: string;
	onClick?: () => void;
}

export default class ImgElement extends AElement<ImgProps> {
	public render(): AElement<ImgProps> {

		this.element = document.createElement("img") as HTMLImageElement;
		this.applyBasicProperties();

		this.element.setAttribute("src", this.props.src);
		this.element.setAttribute("alt", this.props.alt ?? "");

		if (this.props.onClick) {
			this.addEventListener("click", this.props.onClick as EventListener);
		}


		return this;
	}
}
