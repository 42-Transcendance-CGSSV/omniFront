import DivElement from "@elements/DivElement";
import TextElement from "@elements/TextElement";
import SvgElement from "@elements/SvgElement";

export default class FeatureCard {

    private readonly id: string;
    private readonly title: string;
    private readonly subtitle: string;

    private readonly description: string;
    private readonly paths: string[];

    public constructor(id: string, title: string, subtitle: string, description: string, paths: string[]) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.paths = paths;
    }

    public build(): DivElement {

        const descriptionStyle = "text-white/80 text-sm md:text-base lg:text-lg xl:text-xl font-normal font-inter select-none";

        const description: TextElement = new TextElement({className: descriptionStyle, text: this.description});
        const subtitle: TextElement = new TextElement({className: descriptionStyle, text: this.subtitle});
        const title: TextElement = new TextElement({
            className: "h-fit text-lavender text-lg md:text-xl xl:text-2xl font-semibold font-inter leading-tight select-none",
            text: this.title,
            type: "h3"
        });

        const textContainer: DivElement = new DivElement({
            className: "space-y-4 w-full md:w-[90%] wrap-anywhere sm:wrap-normal",
            children: [title, subtitle, description]
        })

        const svg: SvgElement = new SvgElement({
            className: "hidden sm:inline fill-lavender stroke-lavender",
            width: "100px",
            viewBox: "0 0 370 450",
            paths: this.paths
        });

        return new DivElement({
            id: "feature-card-" + this.id,
            className: "w-full md:w-[80%] bg-feature-background hover:scale-105 transition-transform duration-300 rounded-3xl border border-white/5 flex flex-col items-center justify-between p-6 aspect-square gap-y-8",
            children: [svg, textContainer]
        });
    }
}
