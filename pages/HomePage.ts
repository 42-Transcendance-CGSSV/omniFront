import {AComponent} from "@dcomponents/AComponent";
import Page from "@classes/Page";
import DivComponent from "@dcomponents/DivComponent";
import TextComponent from "@dcomponents/TextComponent";
import ButtonComponent from "@dcomponents/ButtonComponent";
import NavBar from "@components/NavBar";
import FeatureCard from "@components/FeatureCard";
import GradientButton from "@components/GradientButton";
import Footer from "@components/Footer";
import axios from "axios";

class HomePage extends Page {

    /**
     * Constructor for the HomePage class.
     * Initializes the page with a navigation bar and a content container.
     */
    constructor() {
        super("PongPage", new NavBar({}));
        const homeContainer = new DivComponent({
            id: "home-content",
            className: "w-full h-screen flex flex-col items-center justify-center p-4 overflow-hidden",
        });

        homeContainer.addComponent(this.buildTitles());
        homeContainer.addComponents(this.buildSubtitles());
        homeContainer.addComponent(this.buildOnlineIndicator());
        homeContainer.addComponent(this.buildStartButton());
        homeContainer.addComponent(this.buildGameInstructions())
        homeContainer.addComponents(this.buildPaddles());
        this.addComponent(homeContainer);

        this.setupFeatures().then(compo => {
            this.addComponent(compo);
            this.addComponent(this.buildExplainations())
            this.addComponent(new Footer().build())
            super.render();
        })
    }

    private buildTitles(): DivComponent {
        const shadowTitle = new TextComponent({
            text: "PONG",
            type: "h2",
            className: "opacity-80 z-10 text-[#7b6dff] text-5xl md:text-7xl lg:text-[84px] 2xl:text-7xl font-bold font-poppins [text-shadow:_0px_0px_30px_rgb(81_39_202_/_1.0)]"
        });
        const gradientTitle = new TextComponent({
            text: "PONG",
            type: "h2",
            className: "absolute inset-0 z-20 text-5xl md:text-7xl lg:text-[84px] 2xl:text-7xl font-bold font-poppins bg-gradient-to-r to-[#7B6DFF] from-[#B794DB] text-transparent bg-clip-text translate-x-[3px] translate-y-[2px]"
        });

        return new DivComponent({
            id: "titles-container",
            className: "relative mb-6 select-none",
            children: [shadowTitle, gradientTitle]
        });
    }

    private buildSubtitles(): AComponent[] {
        return [
            new TextComponent({
                id: "description",
                text: "Experience the classic arcade game reimagined with modern neon aesthetics. Challenge yourself or compete with friends in this timeless battle of reflexes.",
                className: "w-full max-w-4xl 2xl:max-w-6xl text-center text-subwhite text-lg lg:text-2xl 2xl:text-2xl font-light font-poppins leading-relaxed select-none"
            }), new TextComponent({
                id: "description-subtitle",
                className: "text-center text-subwhite text-base lg:text-lg 2xl:text-xl font-normal font-poppins leading-normal my-6 select-none",
                text: "CAKE IS A LIE"
            })
        ];
    }

    private buildOnlineIndicator(): DivComponent {
        return new DivComponent({
            id: "online-container",
            className: "relative flex items-center justify-center gap-2 my-8",
            children: [
                new DivComponent({
                    id: "online-indicators",
                    className: "relative flex",
                    children: [new DivComponent({className: "relative animate-ping opacity-70 bg-emerald-300 w-2.5 lg:w-4 h-2.5 lg:h-4 rounded-full"}),
                        new DivComponent({className: "absolute bg-emerald-400 w-2.5 lg:w-4 h-2.5 lg:h-4 rounded-full"})
                    ]
                }),
                new TextComponent({
                    text: "1, 129 Players Online",
                    className: "text-subwhite text-sm md:text-base lg:text-lg 2xl:text-xl font-poppins select-none"
                })
            ]
        });
    }

    private buildStartButton(): DivComponent {
        return new DivComponent({
            id: "start-button-container",
            className: "my-8 hover:scale-110 transition-transform duration-300 hover:cursor-grab",
            children: [new ButtonComponent({
                id: "play-button",
                text: "START GAME",
                className: "px-8 py-3 bg-darkblue-950 rounded-[32px] shadow-[0px_0px_20px_0px_rgba(123,109,255,0.60)] outline-2 outline-offset-[-2px] outline-[#b794db] flex justify-center items-center text-barwhite text-lg md:text-xl lg:text-xl 2xl:text-2xl font-semibold font-poppins leading-normal select-none"
            })]
        });
    }

    private buildGameInstructions(): DivComponent {
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

        return new DivComponent({
            id: "game-instructions",
            className: "w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center select-none text-subwhite",
            children: [instruction1, instruction2, instruction3]
        });
    }

    private buildPaddles(): DivComponent[] {
        return [new DivComponent({
            id: "paddle-left",
            className: `left-[8%] hidden lg:block w-3 h-32 2xl:h-48 absolute top-1/2 -mt-16 bg-[#b794db] rounded-md shadow-[0px_0px_20px_0px_rgba(183,148,219,0.40)] animate-paddle-move-1`
        }), new DivComponent({
            id: "paddle-right",
            className: `right-[8%] hidden lg:block w-3 h-32 2xl:h-48 absolute top-1/2 -mt-16 bg-[#b794db] rounded-md shadow-[0px_0px_20px_0px_rgba(183,148,219,0.40)] animate-paddle-move-2`
        })];
    }

    private async setupFeatures(): Promise<DivComponent> {
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

        return new DivComponent({
            id: "features-container",
            className: "container mx-auto flex flex-col items-center",
            children: [title, grid]
        });
    }

    private buildExplainations(): DivComponent {

        const baseTextClass = "select-none";
        const titleTextClass = `${baseTextClass} text-white text-xl sm:text-2xl font-bold`;
        const descriptionTextClass = `${baseTextClass} text-white/80 py-6 text-base sm:text-lg leading-loose w-full px-10`;
        const sectionContainerClass = "w-[60%] mx-auto flex flex-col items-center gap-6 text-center";
        const boxContainerClass = "w-full h-fit flex flex-col justify-center items-center rounded-3xl bg-feature-background border border-white/5";

        const containerTitle = new TextComponent({
            id: "explaination-title",
            text: "How Our Game Works",
            className: `${baseTextClass} text-[#bebfff] text-3xl sm:text-4xl md:text-5xl font-bold leading-tight`
        });

        const containerSubtitle = new TextComponent({
            id: "explaination-subtitle",
            text: "A Simple guide to the different parts that make our game run smoothly",
            className: `${baseTextClass} text-white/80 text-base sm:text-lg md:text-xl leading-relaxed`
        });

        const titlesContainer = new DivComponent({
            id: "titles-container",
            className: "max-w-3xl mx-auto flex flex-col items-center gap-4 text-center mb-16",
            children: [containerTitle, containerSubtitle]
        });

        const higtlightedExample = new GradientButton("highlighted-example", "Gateway Service", {
            displayCondition: "inline",
            animation: "",
            borderColors: "bg-[#0f0823]/70 rounded-full shadow-[0px_0px_20px_rgba(123,109,255,0.6)] border-2 border-[#b794db]"
        });

        const otherExample = new GradientButton("unslected-example", "Other Example", {
            displayCondition: "inline",
            animation: "",
            borderColors: "bg-darkblue-950 rounded-full border-2 border-subwhite"
        });

        const tagsContainer = new DivComponent({
            id: "tag-container",
            className: "flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-20",
            children: [higtlightedExample.build(), otherExample.build()]
        });

        const boxTitle = new TextComponent({
            id: "box-title",
            type: "h2",
            className: titleTextClass,
            text: "Service Explanation"
        });

        const boxDescription = new TextComponent({
            id: "box-description",
            className: descriptionTextClass,
            text: "Explain how the service works."
        });

        const boxBackground = new DivComponent({
            id: "box-container",
            className: boxContainerClass,
            children: [boxDescription]
        });

        const explainationContainer = new DivComponent({
            id: "explaination-container",
            className: sectionContainerClass,
            children: [titlesContainer, tagsContainer, boxTitle, boxBackground]
        });

        const microserviceTitle = new TextComponent({
            id: "microservice-title",
            className: titleTextClass,
            text: "How They All Work Together"
        });

        const microserviceDescription = new TextComponent({
            id: "microservice-description",
            className: descriptionTextClass,
            text: "Imagine these services as different departments in a company. They each have their specific job, but they work together seamlessly to create your complete gaming experience. When you play, these services communicate with each other instantly to make everything happen smoothly."
        });

        const microserviceBox = new DivComponent({
            id: "microservice-box",
            className: boxContainerClass,
            children: [microserviceDescription]
        });

        const microserviceContainer = new DivComponent({
            id: "microservice-container",
            className: sectionContainerClass,
            children: [microserviceTitle, microserviceBox]
        });

        return new DivComponent({
            id: "section-container",
            className: "flex flex-col h-fit w-full px-4 py-8 gap-y-8 lg:gap-y-28 items-center justify-center",
            children: [explainationContainer, microserviceContainer]
        });

    }


    render(): void {
        super.render();
    }

}

export default HomePage;
