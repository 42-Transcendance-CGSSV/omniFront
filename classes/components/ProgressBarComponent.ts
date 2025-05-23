import {AElement, AComponentProps} from '@elements/AElement';
import DivElement from "@elements/DivElement";
import TextElement from "@elements/TextElement";

interface ProgressBarComponentProps extends AComponentProps {
    currentValue: number; // Current value
    maxValue: number; // Maximum value

    backgroundColor?: string; // Background bar color
    progressColor?: string; // Progress bar color

    height?: string; // Height of the progress bar
    width?: string; // Width of the progress bar

    showText?: boolean; // Whether to show progress text
    textContent?: string; // Text content, use the placeholders {{current}} and {{max}} to display the values.
}

export default class ProgressBarComponent extends AElement<ProgressBarComponentProps> {

    private fillBar: DivElement | null = null;

    public render(): ProgressBarComponent {
        // Create container element

        this.applyBasicProperties();

        let buildTailwindRoot: string = "relative";
        buildTailwindRoot += this.props.width === null ? " w-full" : ` w-[${this.props.width}]`;
        buildTailwindRoot += this.props.height === null ? " h-[20px]" : ` h-[${this.props.height}]`;

        const rootElement = new DivElement({id: `progress-bar-${this.props.id}`, className: buildTailwindRoot});

        let buildTailwindBgBar: string = "w-full h-full rounded-sm";
        buildTailwindBgBar += this.props.backgroundColor === null ? " bg-red-400" : ` ${this.props.backgroundColor}`;

        const backgroundBar = new DivElement({id: `progress-bar-${this.props.id}-bg`, className: buildTailwindBgBar})

        let buildTailwindFillBar: string = "absolute top-0 left-0 rounded-sm h-full";
        buildTailwindFillBar += this.props.backgroundColor === null ? " bg-red-800" : ` ${this.props.progressColor}`;

        this.fillBar = new DivElement({id: `progress-bar-${this.props.id}-fill`, className: buildTailwindFillBar})
        rootElement.addComponent(this.fillBar);

        this.element = rootElement.render().getElement();

        // Calculate progress
        let progressPercent = this.updateProgress();

        // Create text element if showText is true
        if (this.props.showText) {

            let textValue: string = this.props.textContent ? this.props.textContent.replace('{{current}}', this.props.currentValue.toString())
                .replace('{{max}}', this.props.maxValue.toString()) : `${progressPercent}%`;

            backgroundBar.addComponent(new TextElement({
                id: `progress-bar-${this.props.id}-percent`, type: "span", text: textValue,
                className: "absolute inset-0 -inset-y-1 text-white text-bold text-center text-lg font-glacial"
            }));
        }

        rootElement.addComponent(backgroundBar);
        rootElement.update();
        return this;
    }

    /**
     * Updates the progress bar width based on current progress
     */
    private updateProgress(): number {
        let progressPercent: number;

        if (this.props.currentValue && this.props.maxValue) {
            progressPercent = (this.props.currentValue / this.props.maxValue) * 100;
        } else {
            progressPercent = 0;
        }

        if (this.fillBar && this.fillBar.getElement()) {
            this.fillBar.getElement()!.className += ` w-[${progressPercent}%]`;
        }
        return progressPercent;
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
    }

}