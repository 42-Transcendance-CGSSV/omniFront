import {AComponentProps, AElement} from "@elements/AElement";
import DivElement from "@elements/DivElement";
import TextElement from "@elements/TextElement";
import ButtonElement from "@elements/ButtonElement";


interface ModeContainerComponentProps extends AComponentProps {
    modalTitle?: string;
    modalSubtitle?: string;

    closeButtonEvent: () => void;
    content?: DivElement[];
}


export default class ModeContainer extends AElement<ModeContainerComponentProps> {

    public render(): ModeContainer {
        const modalContainer = new DivElement({
            id: this.props.id + "-modal-container",
            className: "fixed z-100 top-0 inset-0 w-screen bg-transparent backdrop-blur-md overflow-auto"
        });

        const modal = new DivElement({
            id: this.props.id + "-modal",
            className: "relative h-fit pb-10 lg:pb-0 lg:h-[70%] mt-[5%] w-[90%] max-w-5xl bg-darkblue-950 rounded-3xl border-3 border-white/10 flex flex-col items-center justify-center mx-auto"
        });

        modal.addComponent(new ButtonElement({
            id: "close-modal-button",
            className: "absolute top-4 right-4 text-white/80 text-3xl hover:text-white transition-colors",
            text: "✕",
            onClick: () => this.props.closeButtonEvent()
        }));

        if (this.props.modalTitle || this.props.modalSubtitle) {

            const titleContainer = new DivElement({
                id: "title-container",
                className: "flex flex-col items-center text-center my-4 gap-y-2"
            });
            if (this.props.modalTitle) {
                titleContainer.addComponent(new TextElement({
                    id: "modal-title",
                    text: this.props.modalTitle,
                    className: "text-3xl sm:text-4xl lg:text-5xl font-bold text-[#bebfff]",
                    type: "h1"
                }));
            }

            if (this.props.modalSubtitle) {
                titleContainer.addComponent(new TextElement({
                    id: "modal-subtitle",
                    text: this.props.modalSubtitle,
                    className: "text-lg lg:text-xl text-[#bebfff] max-w-2xl",
                    type: "p"
                }));
            }
            modal.addComponent(titleContainer);
        }

        const flexContainer = new DivElement({
            id: this.props.id + "-content",
            className: "flex flex-wrap justify-center items-center my-4 lg:my-8 gap-4 lg:gap-6"
        });

        if (this.props.content) {
            this.props.content.forEach((item) => flexContainer.addComponent(item));
            modal.addComponent(flexContainer);
        }
        modalContainer.addComponent(modal);
        this.element = modalContainer.render().getElement();
        return this;
    }
}