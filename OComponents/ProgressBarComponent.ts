import {AComponent, AComponentProps} from '@dcomponents/AComponent';
import DivComponent from "@dcomponents/DivComponent";

interface ProgressBarComponentProps extends AComponentProps {
    currentValue?: number; // Current value (default: 0)
    maxValue?: number; // Maximum value (default: 100)

    backgroundColor?: string; // Background bar color
    progressColor?: string; // Progress bar color

    height?: string; // Height of the progress bar
    width?: string; // Width of the progress bar

    showText?: boolean; // Whether to show progress text
    textContent?: string; // Text content, use the placeholders {{current}} and {{max}} to display the values.
}

export default class ProgressBarComponent extends AComponent<ProgressBarComponentProps> {

    private textElement: HTMLDivElement | null = null;
    private fillBar: DivComponent | null = null;

    public render(): ProgressBarComponent {
        // Create container element

        this.applyBasicProperties();

        let buildTailwindRoot: string = "relative";
        buildTailwindRoot += this.props.width === null ? " w-full" : ` w-[${this.props.width}]`;

        const rootElement = new DivComponent({id: `progress-bar-${this.props.id}`, className: buildTailwindRoot});

        let buildTailwindBgBar: string = "w-full rounded-sm";
        buildTailwindBgBar += this.props.height === null ? " h-[20px]" : ` h-[${this.props.width}]`;
        buildTailwindBgBar += this.props.backgroundColor === null ? " bg-red-400" : ` ${this.props.backgroundColor}`;

        const backgroundBar = new DivComponent({id: `progress-bar-${this.props.id}-bg`, className: buildTailwindBgBar})
        rootElement.addComponent(backgroundBar);

        let buildTailwindFillBar: string = "absolute top-0 left-0 rounded-sm";
        buildTailwindFillBar += this.props.height === null ? " h-[20px]" : ` h-[${this.props.height}]`;
        buildTailwindFillBar += this.props.backgroundColor === null ? " bg-red-800" : ` ${this.props.progressColor}`;

        this.fillBar = new DivComponent({id: `progress-bar-${this.props.id}-fill`, className: buildTailwindFillBar})
        rootElement.addComponent(this.fillBar);

        this.element = rootElement.render().getElement();

        // Calculate progress
        this.updateProgress();

        // Create text element if showText is true
        if (this.props.showText) {
            this.textElement = document.createElement("div");
            this.textElement.style.position = "absolute";
            this.textElement.style.top = "50%";
            this.textElement.style.left = "50%";
            this.textElement.style.transform = "translate(-50%, -50%)";
            this.textElement.style.color = "#000";
            this.textElement.style.fontSize = "12px";
            this.textElement.style.fontWeight = "bold";
            this.updateText();
            this.element?.appendChild(this.textElement);
        }

        return this;
    }

    /**
     * Updates the progress bar width based on current progress
     */
    private updateProgress(): void {
        let progressPercent: number;

        if (this.props.currentValue && this.props.maxValue) {
            progressPercent = (this.props.currentValue / this.props.maxValue) * 100;
        } else {
            progressPercent = 0;
        }

        if (this.fillBar && this.fillBar.getElement())
            this.fillBar.getElement()!.className += `w-[${progressPercent}%]`;
        this.update();
    }

    /**
     * Updates the text element with formatted progress text
     */
    private updateText(): void {
        if (!this.textElement || this.props.showText !== true)
            return;

        const currentValue = this.props.currentValue ?? 0;
        const maxValue = this.props.maxValue ?? 100;

        let text: string;

        if (this.props.textContent) {
            text = this.props.textContent
                .replace('{{current}}', currentValue.toString())
                .replace('{{max}}', maxValue.toString());
        } else {
            text = `${currentValue}/${maxValue}`;
        }

        this.textElement.textContent = text;
    }

    /**
     * Sets the current progress value and updates the component
     * @param value - New progress value (0-100) or current value if using min/max
     */
    public setProgress(value: number): void {
        if (this.props.progress !== undefined) {
            this.props.progress = value;
        } else if (this.props.currentValue !== undefined) {
            this.props.currentValue = value;
        }

        this.updateProgress();
        this.updateText();
    }

}