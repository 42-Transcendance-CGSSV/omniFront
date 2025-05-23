import {AElement, AComponentProps} from "@elements/AElement";
import TextFieldElement, {TextFieldComponentState} from "@elements/TextFieldElement";

interface FormComponentProps extends AComponentProps {
    onSubmit?: (arg0: TextFieldComponentState) => void;
}

export default class FormElement extends AElement<FormComponentProps> {

    public render(): AElement<FormComponentProps> {
        this.element = document.createElement("form");
        this.applyBasicProperties();

        if (this.props.onSubmit) {
            this.addEventListener("submit", event => {
                event?.preventDefault();
                if (this.props.onSubmit) {
                    if (this.props.children) {
                        for (let child of this.props.children) {
                            if (child instanceof TextFieldElement) {
                                const state = child.validateInput();
                                if (state.isValid) {
                                    this.props.onSubmit(state);
                                }
                            }
                        }
                    }
                }
            });
        }
        return this;
    }

}