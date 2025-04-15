import { AComponent, AComponentProps } from './AComponent.js';

interface ImgComponentProps extends AComponentProps {
	src: string;
	alt?: string;
	onClick?: () => void;
}

export class ImgComponent extends AComponent<ImgComponentProps> {
	public render(): ImgComponent {
		this.element = document.createElement("img");
		this.applyBasicProperties();
		this.element.setAttribute("src", this.props.src);
		
		if (this.props.alt) {
			this.element.setAttribute("alt", this.props.alt);
		}

		if (this.props.onClick) {
			this.addEventListener("click", this.props.onClick as EventListener);
		}

		return this;
	}
}
