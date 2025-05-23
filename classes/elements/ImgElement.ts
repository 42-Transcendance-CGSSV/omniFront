import { AElement, AComponentProps } from "./AElement";

interface ImgProps extends AComponentProps {
	src: string;
	alt?: string;
}

export default class ImgElement extends AElement<ImgProps> {
	public render(): AElement<ImgProps> {

		this.element = document.createElement("img") as HTMLImageElement;
		this.applyBasicProperties();

		this.element.setAttribute("src", this.props.src);
		this.element.setAttribute("alt", this.props.alt ?? "");

		return this;
	}
}
