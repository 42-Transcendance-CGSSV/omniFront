import { AElement } from "@elements/AElement";
import Page from "classes/Page";
import DivElement from "classes/elements/DivElement";
import TextElement from "classes/elements/TextElement";


class VerificationEmailPage extends Page {

	public constructor() {
		super("VerificationEmailPage");

		const emailContainer = new DivElement({
			id: "emailContainer",
			className: "w-full h-screen flex flex-col items-center justify-center p-4 overflow-hidden",
		});

		this.addComponent(emailContainer);
		this.addComponent(this.buildTitles());
		super.render();
	}

	private buildTitles(): TextElement {

		return new TextElement({
			id: "emailTitle",
			text: "Verify Your Email",
			className: "text-subwhite text-lg font-bold text-center mb-4"
		});
	}

	render(): void {
		super.render();
	}
}

export default VerificationEmailPage;