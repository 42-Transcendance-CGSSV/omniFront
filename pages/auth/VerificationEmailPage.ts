import { AElement } from "@elements/AElement";
import Page from "classes/Page";
import DivElement from "@elements/DivElement";
import TextElement from "@elements/TextElement";
import ImgElement from "@elements/ImgElement";
import ProgressBar from "classes/components/ProgressBar";


class VerificationEmailPage extends Page {

	public constructor() {
		super("VerificationEmailPage");

		const emailContainer = new DivElement({
			id: "emailPageContainer",
			className: "w-screen h-screen flex items-center justify-center"
		});

		const emailContent = new DivElement({
			id: "emailContainer",
			className: "min-w-[40%] min-h-[40%] md:min-h-[60%] p-4 flex flex-col items-center justify-center overflow-hidden bg-[#FFFFFF]/2 border border-[#FFFFFF]/7 rounded-lg",
		});

		emailContent.addComponent(this.buildImage());
		emailContent.addComponent(this.buildTitles());
		emailContent.addComponent(this.buildSubtitle());
		emailContent.addComponent(this.buildProgressBar());
		emailContent.addComponent(this.buildFooterEmail());
		emailContainer.addComponent(emailContent);
		this.addComponent(emailContainer);
		super.render();
	}


	private buildImage(): DivElement {
		return new DivElement({
			id: "emailImage",
			className: "p-2 md:p-4 rounded-full flex items-center justify-center bg-[#4318D1]/20 mb-8",
			children: [
				new ImgElement({
					src: "assets/email.svg",
					alt: "Verification Icon",
					className: "w-8 md:w-12"
				})
			]
		});
	}

	private buildTitles(): TextElement {

		return new TextElement({
			id: "emailTitle",
			text: "Verify Your Email",
			className: "h-fit text-lavender text-[2.5vw] font-semibold font-inter leading-tight select-none mb-4"
		});
	}

	private buildSubtitle(): DivElement {
		const subTitleDiv = new DivElement({
			id: "emailSubtitle",
			className: "text-subwhite text-xs md:text-[1.2vw] text-center mb-4"
		});

		subTitleDiv.addComponent(new TextElement({
			text: "Please check your email for a verification link.",
			className: "text-subwhite text-center"
		}));

		subTitleDiv.addComponent(new TextElement({
			text: "If you don't see it, check your spam folder.",
			className: "text-subwhite text-center"
		}));

		return subTitleDiv;
	}

	private buildProgressBar(): DivElement {
		return new DivElement({
			id: "emailProgressBar",
			className: "w-2/3 md:w-1/2 h-2 bg-[#4318D1]/20 rounded-full md:m-4 ",
			children: [
				new ProgressBar({
					id: "emailProgress",
					currentValue: 50,
					maxValue: 100,
					progressColor: "bg-blue-500",
					backgroundColor: "bg-[#4318D1]",
					width: "50%",
					height: "2px",
					showText: false,
					textContent: "{{current}}/{{max}}"
				}),
				new TextElement({
					text: "Waiting for verification...",
					className: "text-subwhite text-xs md:text-[1.2vw] text-center mt-4"
				})
			]
		});
	}

	private buildFooterEmail(): DivElement {
		return new DivElement({
			className: "w-full flex flex-col md:flex-row items-center justify-center mt-8 p-4 md:gap-2",
			children: [
				new TextElement({
					text: "Didn't receive the email?",
					className: "text-subwhite text-xs md:text-[1.1vw] text-center"
				}),
				new TextElement({
					text: "Resend verification link",
					className: "text-[#4318D1] text-xs md:text-[1.2vw] text-center hover:underline cursor-pointer font-medium transition-colors duration-200 hover:text-[#5a2de8]"
				})
			]
		});
	}

	render(): void {
		super.render();
	}
}

export default VerificationEmailPage;