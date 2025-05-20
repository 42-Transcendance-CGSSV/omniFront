import {AComponent, AComponentProps} from "./AComponent";

interface SvgProps extends AComponentProps {
    paths: string[];

    viewBox: string;
    width: string;
    height?: string;
}

export default class SvgComponent extends AComponent<SvgProps> {
    public render(): AComponent<SvgProps> {
        super.render();

        this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg") as unknown as HTMLElement;
        this.applyBasicProperties();
        this.element.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.element.setAttribute("width", this.props.width);
        if (this.props.height) {
            this.element.setAttribute("height", this.props.height);
        }
        this.element.setAttribute("viewBox", this.props.viewBox);
        this.props.paths.forEach(path => {
            const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
            pathElement.setAttribute("d", path);
            this.element!.appendChild(pathElement);
        })

        return this;
    }
}
