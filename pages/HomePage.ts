import {Page} from "../core/Classes/Page";
import {NavBar} from "../OComponents/NavBar";
import {DivComponent} from "../core/Classes/DivComponent";
import {TextComponent} from "../core/Classes/TextComponent";
import {ButtonComponent} from "../core/Classes/ButtonComponent";
import FeatureCard from "../OComponents/FeatureCard";
import {AComponent} from "../core/Classes/AComponent";
import axios from "axios";
import Footer from "../OComponents/Footer";

class HomePage extends Page {

    /**
     * Constructor for the HomePage class.
     * Initializes the page with a navigation bar and a content container.
     */
    constructor() {
        const homeContainer = new DivComponent({
            id: "home-content",
            className: "w-full h-screen flex flex-col items-center justify-center p-4 overflow-hidden"
        })

        super("PongPage", new NavBar({}), homeContainer);
        this.render()

        const homeContainerElement = homeContainer.getElement()!;
        this.setupTitles(homeContainerElement)
        this.setupSubtitles(homeContainerElement)
        this.setupStartButton(homeContainerElement)
        this.setupOnlineIndicator(homeContainerElement)
        this.setupPaddles(homeContainerElement)
        this.setupGameInstructions(homeContainerElement)
        this.setupFeatures().then(() => {
            document.getElementById("app")!.appendChild(new Footer().build().render().getElement()!)
        });
    }

    private setupTitles(root: HTMLElement): void {
        const titlesContainer: DivComponent = new DivComponent({
            id: "titles-container",
            className: "relative mb-6 select-none"
        }).mount(root);

        const shadowTitle = document.createElement("h2");
        shadowTitle.className = "opacity-80 z-10 text-[#7b6dff] text-5xl md:text-7xl lg:text-[84px] 2xl:text-7xl font-bold font-poppins [text-shadow:_0px_0px_30px_rgb(81_39_202_/_1.0)]";
        shadowTitle.textContent = "PONG";
        titlesContainer.getElement()?.appendChild(shadowTitle);

        const gradientTitle = document.createElement("h2");
        gradientTitle.className = "absolute inset-0 z-20 text-5xl md:text-7xl lg:text-[84px] 2xl:text-7xl font-bold font-poppins bg-gradient-to-r to-[#7B6DFF] from-[#B794DB] text-transparent bg-clip-text translate-x-[3px] translate-y-[2px]";
        gradientTitle.textContent = "PONG";
        titlesContainer.getElement()?.appendChild(gradientTitle);
    }

    private setupSubtitles(root: HTMLElement): void {
        new TextComponent({
            id: "description",
            text: "Experience the classic arcade game reimagined with modern neon aesthetics. Challenge yourself or compete with friends in this timeless battle of reflexes.",
            className: "w-full max-w-4xl 2xl:max-w-6xl text-center text-subwhite text-lg lg:text-2xl 2xl:text-2xl font-light font-poppins leading-relaxed select-none"
        }).mount(root);

        new TextComponent({
            id: "description-subtitle",
            className: "text-center text-subwhite text-base lg:text-lg 2xl:text-xl font-normal font-poppins leading-normal my-6 select-none",
            text: "CAKE IS A LIE"
        }).mount(root);
    }

    private setupOnlineIndicator(root: HTMLElement): void {
        const onlineContainer = new DivComponent({
            id: "online-container",
            className: "relative flex items-center justify-center gap-2 my-8"
        }).render();

        const onlineIndicatorsContainer = new DivComponent({
            id: "online-indicators",
            className: "relative flex"
        }).mount(onlineContainer.getElement()!);

        const firstIndicator = document.createElement("span");
        firstIndicator.className = "relative animate-ping opacity-70 bg-emerald-300 w-2.5 lg:w-4 h-2.5 lg:h-4 rounded-full";

        const secondIndicator = document.createElement("span");
        secondIndicator.className = "absolute bg-emerald-400 w-2.5 lg:w-4 h-2.5 lg:h-4 rounded-full";

        onlineIndicatorsContainer.getElement()?.appendChild(firstIndicator);
        onlineIndicatorsContainer.getElement()?.appendChild(secondIndicator);

        const playersCount = new TextComponent({
            text: "1, 129 Players Online",
            className: "text-subwhite text-sm md:text-base lg:text-lg 2xl:text-xl font-poppins select-none"
        });

        playersCount.mount(onlineContainer.getElement()!);
        onlineContainer.mount(root);
    }

    private setupStartButton(root: HTMLElement): void {

        const buttonContainer = new DivComponent({
            id: "start-button-container",
            className: "my-8 hover:scale-110 transition-transform duration-300 hover:cursor-grab"
        }).render();

        const button = new ButtonComponent({
            id: "play-button",
            text: "START GAME",
            className: "px-8 py-3 bg-darkblue-950 rounded-[32px] shadow-[0px_0px_20px_0px_rgba(123,109,255,0.60)] outline-2 outline-offset-[-2px] outline-[#b794db] flex justify-center items-center text-barwhite text-lg md:text-xl lg:text-xl 2xl:text-2xl font-semibold font-poppins leading-normal select-none"
        })

        button.mount(buttonContainer.getElement()!)
        buttonContainer.mount(root)
    }

    private setupGameInstructions(root: HTMLElement): void {
        const instructionsContainer = new DivComponent({
            id: "game-instructions",
            className: "w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center select-none text-subwhite"
        }).render();

        const baseStyle = "md:inline text-sm md:text-base lg:text-lg 2xl:text-xl font-poppins";

        const instruction1 = new TextComponent({
            className: "hidden " + baseStyle,
            text: "Use ↑↓ keys to move"
        });

        const instruction2 = new TextComponent({
            className: baseStyle,
            text: "First to 11 points wins"
        });

        const instruction3 = new TextComponent({
            className: "hidden " + baseStyle,
            text: "Press ESC to pause"
        });

        instruction1.mount(instructionsContainer.getElement()!);
        instruction2.mount(instructionsContainer.getElement()!);
        instruction3.mount(instructionsContainer.getElement()!);

        instructionsContainer.mount(root);
    }

    private setupPaddles(root: HTMLElement): void {
        const paddleStyle = "hidden lg:block w-3 h-32 2xl:h-48 absolute top-1/2 -mt-16 bg-[#b794db] rounded-md shadow-[0px_0px_20px_0px_rgba(183,148,219,0.40)]"
        new DivComponent({
            id: "paddle-left",
            className: paddleStyle + " left-[8%] animate-paddle-move-1"
        }).mount(root)

        new DivComponent({
            id: "paddle-right",
            className: paddleStyle + " right-[8%] animate-paddle-move-2"
        }).mount(root)
    }

    private async setupFeatures(): Promise<void> {
        return new Promise(async (resolve, _reject) => {

            const response = await axios.get("/assets/features/features.json");
            const featuresCards: AComponent[] = [];

            const features = response.data.features;
            const lang = "fr_FR"; // TODO: get the language from the user
            for (const featureKey in features) {
                const feature = features[featureKey];
                if (!feature.enabled) continue;

                const title = feature[lang].title;
                const subtitle = feature[lang].subtitle;
                const description = feature[lang].description;

                type PathObj = { path: string };
                const svgPaths: string[] = [];

                for (const p of Object.values(feature.svg_path) as PathObj[]) {
                    svgPaths.push(p.path);
                }
                featuresCards.push(new FeatureCard(featureKey, title, subtitle, description, svgPaths).build());
            }

            const grid: DivComponent = new DivComponent({
                id: "features-grid",
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-6 gap-x-4",
                children: featuresCards
            });

            const title = new TextComponent({
                type: "h2",
                id: "features-title",
                text: "Features of Game",
                className: "w-full text-center text-lavender pb-10 xl:pb-18 text-base md:text-xl lg:text-2xl xl:text-3xl font-bold font-inter leading-tight select-none"
            });

            const container: DivComponent = new DivComponent({
                id: "features-container",
                className: "container mx-auto flex flex-col items-center",
                children: [title, grid]
            });

            document.getElementById("app")!.appendChild(container.render().getElement()!)
            return resolve();
        });
    }


    render(): void {
        super.render();
    }

}

export default HomePage;
