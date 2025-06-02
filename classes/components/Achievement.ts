import {AComponentProps, AElement} from "@elements/AElement";
import DivElement from "@elements/DivElement";
import ImgElement from "@elements/ImgElement";
import TextElement from "@elements/TextElement";

interface AchievementComponentsProps extends AComponentProps {
    achievementIcon: string;
    achievementTitle: string;
    achievementDescription: string;
    achievementProgress?: number;
    achievementGoal?: number;
}


export default class Achievement extends AElement<AchievementComponentsProps> {

    public render(): Achievement {

        const achievementContainer: DivElement = new DivElement({
            id: "achievement-" + this.props.id,
            className: "flex items-center gap-4 p-3 bg-white/4 rounded-lg",
            onClick: () => this.props.onClick()
        });

        const achievementIcon: DivElement = new ImgElement({
            id: "achievement-icon-" + this.props.id,
            className: "w-10 h-10 rounded-lg ",
            src: this.props.achievementIcon,
        });

        const modeTitle: TextElement = new TextElement({
            id: "achievement-title-" + this.props.id,
            className: "text-white text-sm md:text-base font-semibold truncate font-poppins",
            type: "h3",
            text: this.props.achievementTitle
        })

        const modeDescription: TextElement = new TextElement({
            id: "achievement-description-" + this.props.id,
            className: "text-white text-xs md:text-sm font-poppins",
            type: "p",
            text: this.props.achievementDescription
        })

        const achievementInformationContainer: DivElement = new DivElement({
            id: "achievement-infos-" + this.props.id,
            className: "flex-1 min-w-0",
            children: [modeTitle, modeDescription]
        });

        achievementContainer.addComponents([achievementIcon, achievementInformationContainer]);

        this.element = achievementContainer.render().getElement();
        return this;
    }
}