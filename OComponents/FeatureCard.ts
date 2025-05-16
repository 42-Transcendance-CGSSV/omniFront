import {DivComponent} from "../core/Classes/DivComponent";
import {TextComponent} from "../core/Classes/TextComponent";
import SvgComponent from "../core/Classes/SvgComponent";

export default class FeatureCard {

    private id: string;
    private title: string;
    private subtitle: string;

    private description: string;
    private paths: string[];

    public constructor(id: string, title: string, subtitle: string, description: string, paths: string[]) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.paths = paths;
    }

    /*
        <svg class=" hidden sm:inline fill-lavender stroke-lavender" xmlns="http://www.w3.org/2000/svg" width="100px" viewBox="0 0 370 450">
            <path d="M2.725 2.4C-.608 6-.608 57.333 2.592 60.533c1.6 1.6 4.933 2.134 14.666 2.134h12.534v305.2l4.4 3.2c5.466 4 144.266 79.6 146.133 79.6 3.467 0 161.467-80.134 162.8-82.534.933-1.733 1.333-51.066 1.333-154V62.667h12.534c9.733 0 13.066-.534 14.666-2.134 1.867-1.733 2.134-6.266 2.134-29.066 0-24.534-.267-27.2-2.4-29.2C369.125.133 354.458 0 186.858 0 12.192 0 4.725.133 2.725 2.4Zm357.067 28.933v17.334H14.458l-.4-15.867c-.133-8.8 0-16.8.267-17.733.533-1.467 31.867-1.734 173.067-1.467l172.4.4v17.333ZM330.858 212l.267 148.667-74.933 37.866-75.067 37.867-68.933-37.867L43.125 360.8V212.667c0-81.6.4-148.667.933-149.067.4-.533 65.067-.8 143.6-.667l142.8.4.4 148.667Z"/>
M183.925 90.933c-1.067 1.734-5.067 9.467-8.933 17.2l-7.067 14.267-17.867 2.4c-26.533 3.6-27.333 5.733-9.6 24.667l12 12.933-2.666 15.733c-3.467 21.067-3.467 22.667.8 25.467 3.466 2.133 3.733 2.133 20.4-6.533l16.933-8.8 16.8 8.8c16.533 8.666 16.8 8.8 20.267 6.533 4.266-2.8 4.266-4.4.933-24.933l-2.533-15.334 13.2-13.333c19.333-19.467 18.533-21.867-8.534-25.333l-18-2.4-6.933-14.8c-3.867-8.134-8-15.867-9.067-17.2-2.8-3.2-7.866-2.8-10.133.666Zm10.4 31.6c6.533 12.8 6.133 12.667 20.133 14.134 14.134 1.6 14 1.2 4.4 11.2-4.8 4.8-9.066 9.733-9.333 10.8-.4 1.2 0 6.533 1.067 12 2.8 16 3.466 15.466-10.267 8.666l-12-6.133-11.333 6.133c-6.267 3.467-11.6 6-11.734 5.734-.266-.134.534-6.267 1.6-13.467l2.134-13.067-9.734-9.733c-10.8-10.933-11.066-10.267 3.2-12.133 11.734-1.467 12.934-2.4 19.067-14.667 3.067-6.267 5.867-11.333 6.267-11.333.4 0 3.333 5.333 6.533 11.866Zm-123.866 93.2c-1.867 3.334-3.2 6.134-3.067 6.267 2.533 2.133 112 60.667 113.6 60.667 2.666 0 121.6-59.334 122.8-61.2.666-1.334-4-12.134-5.334-12.134-.4 0-26.933 13.2-59.066 29.2l-58.4 29.2-22.534-12.266c-12.533-6.8-36.533-19.867-53.6-29.067l-30.933-16.8-3.466 6.133Z" />
m239.792 282.933-58.667 29.2-52.933-28.8c-29.2-15.733-53.467-28.666-54.134-28.666-.533 0-2.4 2.666-3.866 5.866l-2.933 5.867 55.466 30.133c30.533 16.534 56.8 30.134 58.4 30.134 2.133 0 120-58.267 123.2-60.8.667-.534-4-11.067-5.067-11.734-.4-.266-27.2 12.667-59.466 28.8Z
M72.725 300.4c-.666.8-2.266 3.467-3.466 5.867l-2.134 4.266 7.067 3.867c17.467 9.867 101.466 55.2 104.4 56.267 2.8 1.066 11.6-2.934 64.533-29.334 33.733-16.933 61.333-31.2 61.333-32 0-2.4-4.533-10.666-5.866-10.666-.8 0-27.6 12.933-59.6 28.8l-58.134 28.8-49.2-26.534C68.725 295.6 74.325 298.4 72.725 300.4Zm285.067-157.067v42h13.333v-84h-13.333v42Zm0 72.667v9.333h13.333v-18.666h-13.333V216ZM3.125 220v9.333H16.46v-18.666H3.125V220Zm0 68v38.667H16.46v-77.334H3.125V288Z
        </svg>
     */

    public build(): DivComponent {

        const descriptionStyle = "text-white/80 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-normal font-inter";

        const description: TextComponent = new TextComponent({className: descriptionStyle, text: this.description});
        const subtitle: TextComponent = new TextComponent({className: descriptionStyle, text: this.subtitle});
        const title: TextComponent = new TextComponent({
            className: "h-fit text-lavender text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-semibold font-inter leading-tight",
            text: this.title,
            type: "h3"
        });

        const textContainer: DivComponent = new DivComponent({
            className: "space-y-4 w-full md:w-[90%] wrap-anywhere sm:wrap-normal",
            children: [title, subtitle, description]
        })

        const svg: SvgComponent = new SvgComponent({
            className: "hidden sm:inline fill-lavender stroke-lavender",
            width: "100px",
            viewBox: "0 0 370 450",
            paths: this.paths
        });

        const featureCard: DivComponent = new DivComponent({
            id: "feature-card-" + this.id,
            className: "w-full md:w-[90%] bg-feature-background rounded-3xl border border-white/5 flex flex-col items-center justify-between p-6 aspect-square gap-y-8",
            children: [svg, textContainer]
        });

        return featureCard.render();
    }
}
