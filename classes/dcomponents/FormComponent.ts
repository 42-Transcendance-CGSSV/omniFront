import {AComponent, AComponentProps} from "@dcomponents/AComponent";
import TextFieldComponent, {TextFieldComponentState} from "@dcomponents/TextFieldComponent";

interface FormComponentProps extends AComponentProps {
    onSubmit?: (arg0: TextFieldComponentState) => void;
}

export default class FormComponent extends AComponent<FormComponentProps> {

    public render() {
        this.element = document.createElement("form");
        this.applyBasicProperties();

        if (this.props.onSubmit) {
            this.addEventListener("submit", event => {
                event?.preventDefault();
                if (this.props.onSubmit) {
                    if (this.props.children) {
                        for (let child of this.props.children) {
                            if (child instanceof TextFieldComponent) {
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