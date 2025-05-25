import { AComponent, AComponentProps } from "./AComponent";

interface CanvaComponentProps extends AComponentProps {
	id: string;
	width: number;
	height: number;
	onClick?: () => void;
}

export default class CanvaComponent extends AComponent<CanvaComponentProps> {
	public element: HTMLCanvasElement | undefined = document.createElement("canvas");
	public ctx!: CanvasRenderingContext2D;


	public render(): CanvaComponent {
		this.applyBasicProperties();
		if (this.element) {
			this.element.width = this.props.width;
			this.element.height = this.props.height;
			this.element.id = this.props.id;
		}
		
		console.log("CanvaComponent render", this.element);

		// if (this.props.onClick) {
		// 	this.addEventListener("click", this.props.onClick as EventListener);
		// }
		return this;
	}

	public getElement(): HTMLElement | undefined {
		if (!this.element) {
			this.render();
		}
		console.log("CanvaComponent getElement", this.element);
		return this.element;
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
