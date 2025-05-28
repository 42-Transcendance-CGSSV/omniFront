import {AComponentProps, AElement} from "@elements/AElement";
import DivElement from "@elements/DivElement";
import ImgElement from "@elements/ImgElement";
import TextElement from "@elements/TextElement";


interface GameModeComponentProps extends AComponentProps {
    icon: string;

    title: string;
    description?: string;
    onClick: () => void;
}


export default class CardMode extends AElement<GameModeComponentProps> {

    public render(): CardMode {
        const cardBackground: DivElement = new DivElement({
            id: "card-background-" + this.props.id,
            className: "hover:scale-105 transition-transform duration-300 rounded-3xl bg-white/1 border border-white/10 hover:border-white/15 p-6 lg:p-8 flex flex-col items-center text-center space-y-4",
            onClick: () => this.props.onClick()
        });

        const modeIcon: DivElement = new ImgElement({
            id: "mode-icon-" + this.props.id,
            className: "w-12 h-12 lg:w-16 lg:h-16",
            src: this.props.icon,
        });

        const modeGradient: DivElement = new DivElement({
            id: "mode-gradient-" + this.props.id,
            className: "w-20 h-20 sm:mt-10 lg:w-24 lg:h-24 bg-gradient-to-r from-lavender to-darkblue-400 rounded-full shadow-lg shadow-lavender/40 flex items-center justify-center",
            children: [modeIcon]
        });

        const modeTitle: TextElement = new TextElement({
            id: "mode-title-" + this.props.id,
            className: "font-inter md:pt-10 text-xl lg:text-2xl font-bold text-blue-lavender",
            type: "h3",
            text: this.props.title
        })
        cardBackground.addComponents([modeGradient, modeTitle]);

        if (this.props.description) {
            const modeDescription: TextElement = new TextElement({
                id: "mode-description-" + this.props.id,
                className: "font-inter text-sm lg:text-base text-white/80 max-w-[200px]",
                type: "p",
                text: this.props.description
            })
            cardBackground.addComponent(modeDescription);
        }

        this.element = cardBackground.render().getElement();
        return this;
    }
}