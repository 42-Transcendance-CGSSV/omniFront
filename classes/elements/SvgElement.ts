import {AElement, AComponentProps} from "./AElement";


export interface SvgProps extends AComponentProps {
    paths: string[];
    rects?: string[];

    viewBox: string;
    width: string;
    height?: string;
    onClick?: () => void;
}

export default class SvgElement extends AElement<SvgProps> {
    public render(): AElement<SvgProps> {

        this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg") as unknown as HTMLElement;
        this.applyBasicProperties();
        this.element.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.element.setAttribute("width", this.props.width);
        if (this.props.height) {
            this.element.setAttribute("height", this.props.height);
        }
        this.element.setAttribute("viewBox", this.props.viewBox);

        for (let i = 0; i < this.props.paths.length; i++) {
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathElement.setAttribute("d", this.props.paths[i]);
            if (this.props.fills && this.props.fills.length >= i) {
                pathElement.setAttribute("fill", this.props.fills[i]);
            }
            this.element!.appendChild(pathElement);
        }

        if (this.props.onClick) {
            this.addEventListener("click", this.props.onClick as EventListener);
        }

        return this;
    }
}
