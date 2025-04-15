import { ButtonComponent } from "../core/Classes/ButtonComponent";

const style = "rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-300";

const myButton = new ButtonComponent({
	id: "lightButton",
	text: "Light",
	className: style,
	onClick: () => alert("Toz"),
}).render();

export default myButton;
