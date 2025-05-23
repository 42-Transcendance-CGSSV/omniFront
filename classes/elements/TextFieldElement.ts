import {AElement, AComponentProps} from './AElement';

export interface TextFieldComponentState {
    isValid: boolean;
    errorMessage?: string
    sanitizedInput?: string
}

/*
   Please never use element.value directly, if you want to get the value of the input field get the textFieldComponent.sanitizedInput
 */
export interface TextFieldComponentProps extends AComponentProps {
    type: "email" | "password" | "text" | "number" | "tel";
    autoComplete?: | "off" | "email" | "new-password" | "tel";
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    disabled?: boolean;
    onType?: (state: TextFieldComponentState, element: HTMLInputElement) => void;
}

export default class TextFieldElement extends AElement<TextFieldComponentProps> {

    public render() {
        this.element = document.createElement("input");
        this.applyBasicProperties();

        this.element.setAttribute("type", this.props.type);

        if (this.props.autoComplete) this.element.setAttribute("autocomplete", this.props.autoComplete);
        if (this.props.placeholder) this.element.setAttribute("placeholder", this.props.placeholder);
        if (this.props.maxLength) this.element.setAttribute("maxlength", this.props.maxLength.toString());
        if (this.props.required) this.element.setAttribute("required", "true");
        if (this.props.disabled) this.element.setAttribute("disabled", "true");

        if (this.props.onType) {
            this.addEventListener("input", () => {
                const state = this.validateInput();
                this.props.onType!(state, this.element as HTMLInputElement);
            });
        }
        return this;
    }


    public validateInput(): TextFieldComponentState {

        if (this.props.required && !this.element) {
            return {isValid: false, errorMessage: "This field is not defined."};
        }
        const input = this.element as HTMLInputElement;

        if (this.props.required && (!input.value || !input.value.trim())) {
            return {isValid: false, errorMessage: "This field is required."};
        }

        const sanitizedInput: string = this.sanitizeInput(input.value);

        if (this.props.minLength && input.value.length < this.props.minLength) {
            return {
                isValid: false,
                errorMessage: `This field must be at least ${this.props.minLength} characters long.`
            };
        }
        if (this.props.maxLength && input.value.length > this.props.maxLength) {
            return {
                isValid: false,
                errorMessage: `This field exceeds maximum length of ${this.props.maxLength} characters.`
            };
        }

        switch (this.props.type) {
            case "email":
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    return {isValid: false, errorMessage: "Invalid email address."};
                }
                break;
            case "password":
                if (!/[A-Z]/.test(input.value)) return {
                    isValid: false,
                    errorMessage: "The password must be at least one upper character."
                };
                if (!/[a-z]/.test(input.value)) return {
                    isValid: false,
                    errorMessage: "The password must be at least one lower character."
                };
                if (!/[0-9]/.test(input.value)) return {
                    isValid: false,
                    errorMessage: "The password must be at least one number."
                };
                if (!/[^A-Za-z0-9]/.test(input.value)) return {
                    isValid: false,
                    errorMessage: "The password must be at least one special character."
                };
                break;
            case "number":
            case "tel":
                const numberRegex = /[0-9]/;
                if (!numberRegex.test(input.value)) {
                    return {isValid: false, errorMessage: "Invalid number."};
                }
                break;
        }

        return {isValid: true, sanitizedInput: sanitizedInput};
    }


    /*
        * Sanitize the input to prevent XSS attacks
        * @param input - The input string to sanitize
        * @return The sanitized input string
        *
        * This method creates a temporary DOM element, sets its text content to the input string,
        * and retrieves the inner HTML. This effectively escapes any HTML tags or special characters.
        * Note: This is a basic sanitization method and may not cover all edge cases. But i don't know other methods to sanitize the input.
     */
    public sanitizeInput(input: string): string {
        const div = document.createElement('div');
        div.textContent = input;
        const sanitizedInput = div.innerHTML;
        div.remove();
        return this.replaceHtml(sanitizedInput);
    }

    private replaceHtml(str: string) {
        return str.replace(/[&<>"'\/]/g, function (char) {
            switch (char) {
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '"':
                    return '&quot;';
                case '\\':
                    return '&#39;';
                case '/':
                    return '&#x2F;';
                default:
                    return char;
            }
        });
    }
}
