import {AElement, AComponentProps} from "@elements/AElement";
import GradientButton from "./GradientButton";
import {router} from "../../routes";
import HeaderElement from "@elements/HeaderElement";
import NavElement from "@elements/NavElement";
import DivElement from "@elements/DivElement";
import ButtonElement from "@elements/ButtonElement";
import SvgElement from "@elements/SvgElement";
import TextElement from "@elements/TextElement";
import ListElement from "@elements/ListElement";
import ListItemElement from "@elements/ListItemElement";

type Link = {
    name: string;
    url?: string;
}

export default class NavBar extends AElement {

    private mobileIsOpen: boolean;
    private mobilesElements: string[];

    constructor(props: AComponentProps) {
        super(props);
        this.mobileIsOpen = false;
        this.mobilesElements = ["fixed", "top-0", "left-0", "w-50", "h-full", "bg-slate-900/20", "z-28", "backdrop-blur-md", "border-r", "border-slate-700/50", "py-14"];
        this.render();

        onresize = () => this.closeMobileNavbar();
        onscroll = () => this.closeMobileNavbar();

    }

    private closeMobileNavbar() {
        if (this.mobileIsOpen) {
            const navlinks = document.getElementById("navlinks-container");
            if (navlinks) {
                navlinks.classList.remove(...this.mobilesElements);
                navlinks.classList.add("hidden");
            }
            this.mobileIsOpen = false;
        }
    }

    public render(): NavBar {
        const header = new HeaderElement({});
        const navElement = new NavElement({id: "nav", className: "py-3 px-6 md:px-10 relative"});

        const navbarContainer = new DivElement({
            id: "navbar-container",
            className: "min-h-14 max-w-full flex flex-col lg:flex-row items-center justify-between"
        });
        const logoContainer = new DivElement({
            id: "logo-container",
            className: "flex items-center justify-between w-full lg:w-auto"
        });

        const mobileButtonContainer = new DivElement({
            id: "mobile-button-container",
            className: "flex lg:hidden order-first"
        });

        const mobileButton = new ButtonElement({
            id: "mobile-button",
            className: "z-30 inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600",
            onClick: event => {
                event.preventDefault();
                const navlinks = document.getElementById("navlinks-container");
                if (navlinks) {
                    if (!this.mobileIsOpen) {
                        navlinks.classList.remove("hidden", "w-full");
                        navlinks.classList.add(...this.mobilesElements);
                        this.mobileIsOpen = true;
                        return;
                    }
                    this.closeMobileNavbar();
                }
            }
        });

        const mobileButtonSvg = new SvgElement({
            id: "mobile-svg",
            viewBox: "0 0 17 14",
            className: "w-5 h-5 stroke-white fill-white stroke-2 ",
            paths: ["M1 1h15M1 7h15M1 13h15"],
            width: "100%"
        });

        mobileButton.addComponent(mobileButtonSvg);
        mobileButtonContainer.addComponent(mobileButton);

        const titleContainer = new DivElement({id: "title-container", className: "hidden xxs:flex lg:flex"});

        const title = new TextElement({
            id: "title", type: "h1", text: "TRANSCENDENCE",
            className: "max-w-fit animate-typing select-none md:border-r-3 border-r-darkblue-300 text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-bold font-poppins bg-gradient-to-r to-[#7B6DFF] from-[#B794DB] inline-block text-transparent bg-clip-text antialiased"
        });

        titleContainer.addComponent(title);
        logoContainer.addComponent(mobileButtonContainer);
        logoContainer.addComponent(titleContainer);
        logoContainer.addComponent(new DivElement({id: "spacer", className: "w-10 lg:hidden"}));

        const navLinksContainer = new DivElement({
            id: "navlinks-container",
            className: "hidden w-full lg:block"
        });

        const navLinksList = new ListElement({
            id: "nav-links",
            type: "ul",
            className: "flex flex-col lg:flex-row items-center justify-center gap-6 2xl:gap-9 text-barwhite text-xl font-glacial antialiased"
        });

        const links: Link[] = [
            {name: "%nav.home%", url: "/"},
            {name: "%nav.pong%", url: "/pong"},
            {name: "%nav.github%", url: "https://github.com"},
        ];

        links.forEach(link => {
            const item = new ListItemElement({
                type: "li", href: link.url,
                text: link.name,
                className: "hover:duration-100 hover:transition-all hover:scale-115 hover:ease-linear"
            })
            navLinksList.addComponent(item);
        });

        const mobileLogin = new GradientButton("mobile-login", "%nav.login%", {
            displayCondition: "lg:hidden",
            animation: ""
        }).build(() => router.navigate("/login"));
        navLinksList.addComponent(mobileLogin);

        navLinksContainer.addComponent(navLinksList);

        navbarContainer.addComponent(logoContainer);
        navbarContainer.addComponent(navLinksContainer);

        const loginButton = new GradientButton("login", "%nav.login%", {displayCondition: "hidden lg:inline"}).build(() => router.navigate("/login"));
        navbarContainer.addComponent(loginButton);

        navElement.addComponent(navbarContainer);
        header.addComponent(navElement);

        this.element = header.render().getElement();
        return this;
    }
}
