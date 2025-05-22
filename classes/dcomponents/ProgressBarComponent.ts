import { AComponent, AComponentProps } from './AComponent';

interface ProgressBarComponentProps extends AComponentProps {
    progress?: number; // Progress value (0-100)
    maxValue?: number; // Maximum value (default: 100)
    currentValue?: number; // Current value (default: 0)
    backgroundColor?: string; // Background bar color
    progressColor?: string; // Progress bar color
    height?: string; // Height of the progress bar
    width?: string; // Width of the progress bar
    showText?: boolean; // Whether to show progress text
    textFormat?: string; // Format of text, e.g., "{{current}}/{{max}}"
}

export default class ProgressBarComponent extends AComponent<ProgressBarComponentProps> {
    private container: HTMLDivElement | null = null;
    private backgroundBar: HTMLDivElement | null = null;
    private progressBar: HTMLDivElement | null = null;
    private textElement: HTMLDivElement | null = null;

    public render(): ProgressBarComponent {
        // Create container element
        this.element = document.createElement("div");
        this.applyBasicProperties();

        // Set default styles for container
        if (this.element) {
            this.element.style.position = "relative";
            this.element.style.width = this.props.width || "100%";
            this.element.style.overflow = "hidden";
        }

        // Create background bar
        this.backgroundBar = document.createElement("div");
        this.backgroundBar.style.width = "100%";
        this.backgroundBar.style.height = this.props.height || "20px";
        this.backgroundBar.style.backgroundColor = this.props.backgroundColor || "#e0e0e0";
        this.backgroundBar.style.borderRadius = "4px";
        this.element?.appendChild(this.backgroundBar);

        // Create progress bar
        this.progressBar = document.createElement("div");
        this.progressBar.style.position = "absolute";
        this.progressBar.style.top = "0";
        this.progressBar.style.left = "0";
        this.progressBar.style.height = this.props.height || "20px";
        this.progressBar.style.backgroundColor = this.props.progressColor || "#4caf50";
        this.progressBar.style.borderRadius = "4px";
        this.progressBar.style.transition = "width 0.3s ease";
        
        // Calculate progress
        this.updateProgress();
        
        this.element?.appendChild(this.progressBar);

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
        if (!this.progressBar) return;

        let progressPercent: number;
        
        if (this.props.progress !== undefined) {
            // Use direct progress percentage if provided
            progressPercent = Math.min(Math.max(this.props.progress, 0), 100);
        } else if (this.props.currentValue !== undefined && this.props.maxValue !== undefined) {
            // Calculate percentage based on current/max values
            progressPercent = (this.props.currentValue / this.props.maxValue) * 100;
        } else {
            // Default to 0
            progressPercent = 0;
        }

        this.progressBar.style.width = `${progressPercent}%`;
    }

    /**
     * Updates the text element with formatted progress text
     */
    private updateText(): void {
        if (!this.textElement || this.props.showText !== true) return;

        const currentValue = this.props.currentValue ?? 0;
        const maxValue = this.props.maxValue ?? 100;
        
        let text: string;
        
        if (this.props.textFormat) {
            text = this.props.textFormat
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

    /**
     * Sets the maximum value and updates the component
     * @param value - New maximum value
     */
    public setMaxValue(value: number): void {
        if (this.props.maxValue !== undefined) {
            this.props.maxValue = value;
            this.updateProgress();
            this.updateText();
        }
    }

    /**
     * Sets the color of the progress bar
     * @param color - CSS color value
     */
    public setProgressColor(color: string): void {
        if (this.progressBar) {
            this.progressBar.style.backgroundColor = color;
            this.props.progressColor = color;
        }
    }

    /**
     * Sets the color of the background bar
     * @param color - CSS color value
     */
    public setBackgroundColor(color: string): void {
        if (this.backgroundBar) {
            this.backgroundBar.style.backgroundColor = color;
            this.props.backgroundColor = color;
        }
    }
} 