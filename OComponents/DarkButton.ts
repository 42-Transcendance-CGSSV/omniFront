import { ButtonComponent } from "../core/Classes/ButtonComponent";

const style =
	"rounded-lg px-4 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-100 duration-300";

const DarkButton = new ButtonComponent({
	id: "Darkbtn",
	text: "Guilherme",
	className: style,
	onClick: () => alert("Toz"),
}).render();

export default DarkButton;
