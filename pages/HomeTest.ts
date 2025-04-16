import { Page } from "./index";
import Button from "../OComponents/Button";
import DarkButton from "../OComponents/DarkButton";

export class HomeTest extends Page {
	constructor() {
		super("HomeTest", Button, DarkButton);
	}

	// execute ce code lorsque que la page est mount
	public mounted(): void {
		console.log("HomeTest mounted");
	}
}
