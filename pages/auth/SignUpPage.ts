import NavBar from "@classes/components/NavBar";
import Footer from "@classes/components/Footer";
import Page from "@classes/Page";
import FormElement from "@elements/FormElement";
import {TextFieldComponentState} from "@elements/TextFieldElement";
import {AElement} from "@elements/AElement";
import DivElement from "@elements/DivElement";
import TextElement from "@elements/TextElement";
import ButtonElement from "@elements/ButtonElement";
import AnchorElement from "@elements/AnchorElement";
import AuthTextField from "@classes/components/AuthTextField";

export default class SignInPage extends Page {

    public constructor() {
        super("SignInPage", new NavBar({}));

        const rootContainer = new DivElement({
            id: "root-container",
            className: "mt-2 md:mt-10 w-[80%] sm:w-[55%] md:w-[45%] lg:w-[40%] xl:w-[30%] h-[80vh] mx-auto rounded-3xl outline outline-4 outline-white/5 flex flex-col items-center justify-center gap-8",
            children: [new TextElement({
                id: "title",
                type: "h1",
                text: "Sign Up",
                className: "text-lg xl:text-4xl font-bold text-lavender "
            })]
        });

        rootContainer.addComponent(this.buildForm());
        rootContainer.addComponent(this.buildButtons());
        this.addComponent(rootContainer);
        this.addComponent(new Footer().build())
        super.render();
    }

    public buildForm() {

        const usernameInput = new AuthTextField({
            id: "username", type: "text", placeholder: "jbadaire", autoComplete: "off", required: true,
            svgProperties: {
                id: "username", viewBox: "0 0 75.294 75.294",
                className: "hidden md:inline-block right-2 w-6 h-6 overflow-hidden stroke-white/20 fill-white/20 mr-4",
                paths: [`M66.097,12.089h-56.9C4.126,12.089,0,16.215,0,21.286v32.722c0,5.071,4.126,9.197,9.197,9.197h56.9
\t\tc5.071,0,9.197-4.126,9.197-9.197V21.287C75.295,16.215,71.169,12.089,66.097,12.089z M61.603,18.089L37.647,33.523L13.691,18.089
\t\tH61.603z M66.097,57.206h-56.9C7.434,57.206,6,55.771,6,54.009V21.457l29.796,19.16c0.04,0.025,0.083,0.042,0.124,0.065
\t\tc0.043,0.024,0.087,0.047,0.131,0.069c0.231,0.119,0.469,0.215,0.712,0.278c0.025,0.007,0.05,0.01,0.075,0.016
\t\tc0.267,0.063,0.537,0.102,0.807,0.102c0.001,0,0.002,0,0.002,0c0.002,0,0.003,0,0.004,0c0.27,0,0.54-0.038,0.807-0.102
\t\tc0.025-0.006,0.05-0.009,0.075-0.016c0.243-0.063,0.48-0.159,0.712-0.278c0.044-0.022,0.088-0.045,0.131-0.069
\t\tc0.041-0.023,0.084-0.04,0.124-0.065l29.796-19.16v32.551C69.295,55.771,67.86,57.206,66.097,57.206z`],
                width: "100%"
            }
        });

        const emailInput = new AuthTextField({
            id: "email", type: "email", placeholder: "example@example.com", autoComplete: "email", required: true,
            svgProperties: {
                id: "email", viewBox: "0 0 75.294 75.294",
                className: "hidden md:inline-block right-2 w-6 h-6 overflow-hidden stroke-white/20 fill-white/20 mr-4",
                paths: [`M66.097,12.089h-56.9C4.126,12.089,0,16.215,0,21.286v32.722c0,5.071,4.126,9.197,9.197,9.197h56.9
\t\tc5.071,0,9.197-4.126,9.197-9.197V21.287C75.295,16.215,71.169,12.089,66.097,12.089z M61.603,18.089L37.647,33.523L13.691,18.089
\t\tH61.603z M66.097,57.206h-56.9C7.434,57.206,6,55.771,6,54.009V21.457l29.796,19.16c0.04,0.025,0.083,0.042,0.124,0.065
\t\tc0.043,0.024,0.087,0.047,0.131,0.069c0.231,0.119,0.469,0.215,0.712,0.278c0.025,0.007,0.05,0.01,0.075,0.016
\t\tc0.267,0.063,0.537,0.102,0.807,0.102c0.001,0,0.002,0,0.002,0c0.002,0,0.003,0,0.004,0c0.27,0,0.54-0.038,0.807-0.102
\t\tc0.025-0.006,0.05-0.009,0.075-0.016c0.243-0.063,0.48-0.159,0.712-0.278c0.044-0.022,0.088-0.045,0.131-0.069
\t\tc0.041-0.023,0.084-0.04,0.124-0.065l29.796-19.16v32.551C69.295,55.771,67.86,57.206,66.097,57.206z`],
                width: "100%"
            }
        });

        const passwordInput = new AuthTextField({
            id: "password",
            type: "password",
            placeholder: "Your Strong Password",
            autoComplete: "new-password",
            required: true,
            svgProperties: {
                id: "password", viewBox: "0 0 64 64",
                className: "hidden md:inline-block w-6 h-6 overflow-hidden stroke-white/20 fill-white/20 mr-4",
                paths: [`M53.5 0h-43A10.5 10.5 0 0 0 0 10.5v43A10.5 10.5 0 0 0 10.5 64h43A10.5 10.5 0 0 0 64 53.5v-43A10.5 10.5 0 0 0 53.5 0zm-15 48h-13l2.2-17.1a9 9 0 1 1 8.7 0z`],
                width: "100%"
            }
        });

        return new FormElement({
            id: "login-form",
            className: "flex flex-col w-[80%] gap-4",
            onSubmit: (state: TextFieldComponentState) => {
                console.log("Form submitted with state: ", state);
            },
            children: [usernameInput.build(), emailInput.build(), passwordInput.build()]
        });
    }

    public buildButtons(): AElement {
        const signInButton = new ButtonElement({
            text: "Sign In",
            id: "sign-in-button",
            className: "w-[80%] h-[52px] mt-10 bg-[#0f0823]/80 rounded-[32px] border-2 border-[#b794db] shadow-[0px_0px_20px_0px_rgba(183,148,219,0.40)] text-white font-semibold"
        });

        const spacerContainer = new DivElement({
            id: "spacer-container",
            className: "flex items-center justify-center gap-4 w-full max-w-[80%]",
            children: [
                new DivElement({className: "h-px bg-white/5 flex-1"}),
                new TextElement({
                    type: "span",
                    className: "text-white/40 text-base",
                    text: "or "
                }),
                new DivElement({className: "h-px bg-white/5 flex-1"})],
        })

        const doNotHaveAccount = new TextElement({
            id: "do-not-have-account",
            className: "text-white/60",
            type: "span",
            text: "Already have an account?",
        })

        const signUpLink = new AnchorElement({
            id: "signup-anchor",
            className: "text-[#b794db] text-lg font-semibold",
            href: "/login",
            text: "Sign In"
        })

        const signUpContainer = new DivElement({
            id: "signup-container",
            className: "flex items-center justify-center gap-2 mt-2",
            children: [doNotHaveAccount, signUpLink]
        })

        return new DivElement({
            id: "buttons-container",
            className: "flex flex-col gap-4 w-full items-center justify-center",
            children: [signInButton, spacerContainer, signUpContainer]
        });
    }
}