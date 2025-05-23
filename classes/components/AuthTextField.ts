import TextFieldElement, {TextFieldComponentProps} from "@elements/TextFieldElement";
import SvgElement, {SvgProps} from "@elements/SvgElement";
import DivElement from "@elements/DivElement";

interface AuthTextFieldProps extends TextFieldComponentProps {
    svgProperties?: SvgProps;
}

export default class AuthTextField {

    private properties: AuthTextFieldProps;

    constructor(props: AuthTextFieldProps) {
        this.properties = props;
    }

    public build(): DivElement {
        const inputField = new TextFieldElement({
            id: this.properties.id + "-input",
            type: this.properties.type,
            placeholder: this.properties.placeholder,
            required: this.properties.required,
            autoComplete: this.properties.autoComplete,

            className: "w-full inline-block h-14 pl-4 rounded-xl font-glacial text-white text-md lg:text-xl outline-none",
            onType: (state, element) => {
                if (this.properties.onType)
                    this.properties.onType(state, element)
            }
        });

        const inputContainer = new DivElement({
            id: this.properties.id + "-container",
            className: "flex flex-row items-center justify-center bg-white/7 rounded-xl h-14",
            children: [inputField]
        });


        if (this.properties.svgProperties) {
            const svgProps = this.properties.svgProperties;
            svgProps.id = this.properties.id + "-icon";
            const icon = new SvgElement(svgProps);
            inputContainer.addComponent(icon);
        }

        return inputContainer;
    }
}