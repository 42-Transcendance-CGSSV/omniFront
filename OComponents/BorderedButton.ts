import {ButtonComponent} from "../core/Classes/ButtonComponent";
import {DivComponent} from "../core/Classes/DivComponent";

export default class BorderedButton {
    private readonly id: string;
    private readonly textContent: string;
    private roundedValue: string = "rounded-4xl";

    private textStyle: string = "font-glacial text-2xl text-barwhite";
    private interiorStyle: string = "bg-[#0F0823] px-6 py-2";

    private borderColors: string = "bg-gradient-to-r from-[#B794DB] from-0% via-[#70559D] via-43% to-[#3A309B] to-100%";
    private borderWidth: string = "p-[2.5px]";

    private animation: string = "animate-fade-left animate-ease-linear";
    private displayCondition: string = "hidden md:inline";


    public constructor(id: string, textContent: string = "{replace this placeholder}", params?: Partial<BorderedButton>) {
        this.id = id;
        this.textContent = textContent;
        if (params)
            Object.assign(this, params);
    }

    public build(clickListener?: () => void): DivComponent {
        const buttonComponent: ButtonComponent = new ButtonComponent({
            id: "button-" + this.id,
            onClick: clickListener,
            text: this.textContent,
            className: this.roundedValue + " " + this.interiorStyle + " " + this.textStyle,
        });

        const borderDiv = new DivComponent({
            id: "border-" + this.id,
            className: this.roundedValue + " " + this.borderColors + " " + this.borderWidth,
            children: [buttonComponent],
        });


        const rootDiv: DivComponent = new DivComponent({
            id: "container-" + this.id,
            className: this.displayCondition + " " + this.animation,
            children: [borderDiv]
        });

        return rootDiv.render()
    }
}