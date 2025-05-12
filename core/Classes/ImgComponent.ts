import { AComponent, AComponentProps } from "./AComponent";

interface ImgProps extends AComponentProps {
	src: string;
	alt?: string;
}

export class ImgComponent extends AComponent<ImgProps> {
	public render(): AComponent<ImgProps> {
		console.log("ImgComponent render", this.props.src);

		this.element = document.createElement("img") as HTMLImageElement;
		this.applyBasicProperties();

		this.element.setAttribute("src", this.props.src);
		this.element.setAttribute("alt", this.props.alt ?? "");

		return this;
	}
}
