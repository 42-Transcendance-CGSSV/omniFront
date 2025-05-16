import {ButtonComponent} from "../core/Classes/ButtonComponent";
import {DivComponent} from "../core/Classes/DivComponent";

export default class GradientButton {
    private readonly id: string;
    private readonly textContent: string;
    public roundedValue: string = "rounded-4xl";

    public textStyle: string = "font-glacial text-xl text-barwhite";
    public interiorStyle: string = "bg-darkblue-950 px-6 py-2";

    public borderColors: string = "bg-gradient-to-r from-[#B794DB] from-0% via-[#70559D] via-43% to-[#3A309B] to-100%";
    public borderWidth: string = "p-[2.5px]";

    public animation: string = "animate-fade-left animate-ease-linear";
    public displayCondition: string = "hidden md:inline";


    public constructor(id: string, textContent: string = "{replace this placeholder}", params?: Partial<GradientButton>) {
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
            className: this.roundedValue + " " + this.interiorStyle + " " + this.textStyle + " cursor-pointer",
        });

        const borderDiv = new DivComponent({
            id: "border-" + this.id,
            className: this.roundedValue + " " + this.borderColors + " " + this.borderWidth ,
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