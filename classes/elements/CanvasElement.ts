import {AComponentProps, AElement} from "./AElement";

interface CanvasElementProps extends AComponentProps {
    id: string;
    width: number;
    height: number;
    onClick?: () => void;
}

export default class CanvasElement extends AElement<CanvasElementProps> {
    public element: HTMLCanvasElement | undefined;
    public ctx!: CanvasRenderingContext2D;

    public render(): CanvasElement {
        this.element = document.createElement("canvas");
        this.applyBasicProperties();

        if (this.element) {
            this.element.width = this.props.width;
            this.element.height = this.props.height;
            this.element.id = this.props.id;
        }
        return this;
    }

    public getContext(): CanvasRenderingContext2D {
        if (this.element) {
            this.ctx = (this.element as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
            if (!this.ctx) {
                console.error("Failed to get 2D context");
            }
            return this.ctx;
        }
        throw new Error("Canvas element is not defined");
    }
}
