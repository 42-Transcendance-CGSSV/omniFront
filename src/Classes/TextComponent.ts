class TextComponent extends AComponent<{
	text: string;
	onClick?: () => void;
	className?: string;
}> {
	public render(): TextComponent {
		this.element = document.createElement("p");
		this.applyBasicProperties();
		this.element.textContent = this.props.text;

		if (this.props.onClick) {
			this.addEventListener("click", this.props.onClick as EventListener);
		}

		return this;
	}
}
