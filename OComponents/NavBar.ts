import {AComponent, AComponentProps} from "@dcomponents/AComponent";
import GradientButton from "./GradientButton";
import {router} from "../routes";
import i18next from "i18next";
import * as langFonctions from "../utils/lang";

const SUPPORTED_LANGUAGES = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" }
  ];
  

export default class NavBar extends AComponent {

    private navLinks: { url?: string, name: string }[];

    constructor(props: AComponentProps) {
        super(props);
        this.navLinks = [
            {name: "Home"},
            {url: "/pong", name: "Pong"},
            {url: "/rgrgrg", name: "Discussions"},
            {url: "https://github.com/42-Transcendance-CGSSV", name: "Github"},
        ];
        this.render();
    }

    public render(): NavBar {
        super.render();
        this.element = document.createElement("header");
        this.applyBasicProperties();

        const navElement = document.createElement("nav");
        navElement.className = "py-3 px-6 md:px-10 relative";

        const navbarContainer = document.createElement("div");
        navbarContainer.id = "navbar-container";
        navbarContainer.className = "min-h-14 max-w-full flex flex-col lg:flex-row items-center justify-between";

        const logoContainer = document.createElement("div");
        logoContainer.className = "flex items-center justify-between w-full lg:w-auto";

        const mobileButtonContainer = document.createElement("div");
        mobileButtonContainer.className = "flex lg:hidden order-first";

        const mobileButton = document.createElement("button");
        mobileButton.setAttribute("data-collapse-toggle", "navbar-default");
        mobileButton.type = "button";
        mobileButton.className = "inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600";
        mobileButton.setAttribute("aria-controls", "navbar-default");
        mobileButton.setAttribute("aria-expanded", "false");

        const mobileButtonSpan = document.createElement("span");
        mobileButtonSpan.className = "sr-only";
        mobileButtonSpan.textContent = "Open main menu";
        mobileButton.appendChild(mobileButtonSpan);

        const svgNS = "http://www.w3.org/2000/svg";
        const mobileButtonSvg = document.createElementNS(svgNS, "svg");
        mobileButtonSvg.classList.add("w-5", "h-5");
        mobileButtonSvg.setAttribute("aria-hidden", "true");
        mobileButtonSvg.setAttribute("fill", "none");
        mobileButtonSvg.setAttribute("viewBox", "0 0 17 14");

        const mobileButtonPath = document.createElementNS(svgNS, "path");
        mobileButtonPath.setAttribute("stroke", "currentColor");
        mobileButtonPath.setAttribute("stroke-linecap", "round");
        mobileButtonPath.setAttribute("stroke-linejoin", "round");
        mobileButtonPath.setAttribute("stroke-width", "2");
        mobileButtonPath.setAttribute("d", "M1 1h15M1 7h15M1 13h15");
        mobileButtonSvg.appendChild(mobileButtonPath);

        mobileButton.appendChild(mobileButtonSvg);
        mobileButtonContainer.appendChild(mobileButton);

        const titleContainer = document.createElement("div");
        titleContainer.className = "hidden xxs:flex lg:flex";

        const title = document.createElement("h1");
        title.className = "max-w-fit animate-typing select-none md:border-r-3 border-r-darkblue-300 text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-bold font-poppins bg-gradient-to-r to-[#7B6DFF] from-[#B794DB] inline-block text-transparent bg-clip-text antialiased";
        title.textContent = "TRANSCENDENCE";
        titleContainer.appendChild(title);

        logoContainer.appendChild(mobileButtonContainer);
        logoContainer.appendChild(titleContainer);

        const rightSpacerContainer = document.createElement("div");
        rightSpacerContainer.className = "w-10 lg:hidden"; // Même largeur que le bouton
        logoContainer.appendChild(rightSpacerContainer);



        const navLinksContainer = document.createElement("div");
        navLinksContainer.className = "hidden w-full md:w-auto lg:block";
        const navLinksList = document.createElement("ul");
        navLinksList.id = "nav-links";
        navLinksList.className = "flex flex-col lg:flex-row items-center justify-center gap-6 2xl:gap-9 text-barwhite text-xl font-glacial antialiased";
        this.navLinks.forEach(link => {
            const listItem = document.createElement("li");
            listItem.className = "hover:duration-100 hover:transition-all hover:scale-115 hover:ease-linear";
            const a = document.createElement("a");
            a.href = link.url || "/";
            // Utilise i18next pour traduire
            a.textContent = i18next.t(`nav.${link.name.toLowerCase()}`) || link.name;
            listItem.appendChild(a);
            navLinksList.appendChild(listItem);
        });
        navLinksContainer.appendChild(navLinksList);

        // Bouton de connexion
        const loginButton = new GradientButton("login", "%nav.login%", { displayCondition: "hidden lg:inline" }) //Traduction fonctionnelle ! 
        .build(() => router.navigate("login"))
        .render();

        // Sélecteur de langue
        const langSelector = document.createElement("select");
        langSelector.className = "ml-4 px-2 py-1 rounded bg-darkblue-700 text-white";
        SUPPORTED_LANGUAGES.forEach(lang => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.textContent = lang.label;
        langSelector.appendChild(option);
        });

        // Sélectionne la langue courante
        const currentLang = langFonctions.getLangFromCookie() || i18next.language || "fr";
        langSelector.value = currentLang;

        langSelector.addEventListener("change", (event) => {
        const newLang = (event.target as HTMLSelectElement).value;
        langFonctions.setLangCookie(newLang);
        i18next.changeLanguage(newLang);
        window.location.reload(); // Recharge la page pour tout mettre à jour
        });

        // Ajoute tout dans la navbar
        navbarContainer.appendChild(navLinksContainer);
        navbarContainer.appendChild(loginButton.getElement()!);
        navbarContainer.appendChild(langSelector);

        navElement.appendChild(navbarContainer);
        this.element.appendChild(navElement);

        return this;
        // const navLinksContainer = document.createElement("div");
        // navLinksContainer.className = "hidden w-full md:w-auto lg:block";

        // const navLinksList = document.createElement("ul");
        // navLinksList.id = "nav-links";
        // navLinksList.className = "flex flex-col lg:flex-row items-center justify-center gap-6 2xl:gap-9 text-barwhite text-xl font-glacial antialiased";

        // const links = ["Accueil", "Pong", "Discussions", "Github"];
        // links.forEach(linkText => {
        //     const listItem = document.createElement("li");
        //     listItem.className = "hover:duration-100 hover:transition-all hover:scale-115 hover:ease-linear";
        //     const link = document.createElement("a");
        //     link.href = this.navLinks.find(link => link.name === linkText)?.url || "/";
        //     link.textContent = linkText;
        //     listItem.appendChild(link);
        //     navLinksList.appendChild(listItem);
        // });

        // navLinksContainer.appendChild(navLinksList);

        // const loginButton = new GradientButton("login", "Connexion", {displayCondition: "hidden lg:inline"}).build(() => router.navigate("login")).render();

        // navbarContainer.appendChild(logoContainer);
        // navbarContainer.appendChild(navLinksContainer);
        // navbarContainer.appendChild(loginButton.getElement()!);

        // navElement.appendChild(navbarContainer);
        // this.element.appendChild(navElement);

        // return this;
    }
}
