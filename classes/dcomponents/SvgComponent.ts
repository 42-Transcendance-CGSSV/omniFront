import {AComponent, AComponentProps} from "./AComponent";


export interface SvgProps extends AComponentProps {
    paths: string[];
    fills?: string[];

    viewBox: string;
    width: string;
    height?: string;
}

export default class SvgComponent extends AComponent<SvgProps> {
    public render(): AComponent<SvgProps> {

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

        return this;
    }
}
