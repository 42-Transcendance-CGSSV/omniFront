import ButtonElement from "@elements/ButtonElement";
import DivElement from "@elements/DivElement";

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

    public build(clickListener?: () => void): DivElement {
        const buttonComponent: ButtonElement = new ButtonElement({
            id: "button-" + this.id,
            onClick: clickListener,
            text: this.textContent,
            className: this.roundedValue + " " + this.interiorStyle + " " + this.textStyle + " cursor-pointer",
        });

        const borderDiv = new DivElement({
            id: "border-" + this.id,
            className: this.roundedValue + " " + this.borderColors + " " + this.borderWidth ,
            children: [buttonComponent],
        });


        return new DivElement({
            id: "container-" + this.id,
            className: this.displayCondition + " " + this.animation,
            children: [borderDiv]
        });
    }
}