import {AComponent, AComponentProps} from "../core/Classes/AComponent";
import BorderedButton from "./BorderedButton";

export class NavBar extends AComponent {

    private navLinks: { url?: string, name: string }[];

    constructor(props: AComponentProps) {
        super(props);
        this.navLinks = [
            {name: "Accueil"},
            {url: "/pong", name: "Pong"},
            {url: "/rgrgrg", name: "Discussions"},
            {url: "/grggrg", name: "Github"},
        ];
        this.render();
    }

    public render(): NavBar {
        super.render();
        this.element = document.createElement("header");
        this.applyBasicProperties();

        // Créer la structure de base
        const navElement = document.createElement("nav");
        navElement.className = "py-3 px-10";

        const navbarContainer = document.createElement("div");
        navbarContainer.id = "navbar-container";
        navbarContainer.className = "min-h-14 min-w-fit max-w-full flex flex-col md:flex-row items-center justify-between";

        // Logo et bouton de menu
        const logoContainer = document.createElement("div");
        logoContainer.className = "max-w-full flex items-center justify-between gap-8";

        // Ajouter le titre
        const title = document.createElement("h1");
        title.className = "md:animate-typing md:border-r-3 border-r-darkblue-300 text-xl lg:text-2xl font-bold font-poppins bg-gradient-to-r to-[#7B6DFF] from-[#B794DB] inline-block text-transparent bg-clip-text antialiased";
        title.textContent = "TRANSCENDENCE";
        logoContainer.appendChild(title);

        // Ajouter le bouton mobile
        const mobileButton = document.createElement("button");
        mobileButton.setAttribute("data-collapse-toggle", "navbar-default");
        mobileButton.type = "button";
        mobileButton.className = "inline-flex items-center w-8 h-10 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400";
        mobileButton.setAttribute("aria-controls", "navbar-default");
        mobileButton.setAttribute("aria-expanded", "false");

        const mobileButtonSpan = document.createElement("span");
        mobileButtonSpan.className = "sr-only";
        mobileButtonSpan.textContent = "Open main menu";
        mobileButton.appendChild(mobileButtonSpan);

        const mobileButtonSvg = document.createElement("svg");
        mobileButtonSvg.className = "w-8 h-8";
        mobileButtonSvg.setAttribute("aria-hidden", "true");
        mobileButtonSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        mobileButtonSvg.setAttribute("fill", "none");
        mobileButtonSvg.setAttribute("viewBox", "0 0 17 14");

        const mobileButtonPath = document.createElement("path");
        mobileButtonPath.setAttribute("stroke", "currentColor");
        mobileButtonPath.setAttribute("stroke-linecap", "round");
        mobileButtonPath.setAttribute("stroke-linejoin", "round");
        mobileButtonPath.setAttribute("stroke-width", "2");
        mobileButtonPath.setAttribute("d", "M1 1h15M1 7h15M1 13h15");
        mobileButtonSvg.appendChild(mobileButtonPath);

        mobileButton.appendChild(mobileButtonSvg);
        logoContainer.appendChild(mobileButton);

        // Ajouter les liens
        const navLinksContainer = document.createElement("div");
        navLinksContainer.className = "hidden w-full md:block";
        navLinksContainer.id = "navbar-default";

        const navLinksList = document.createElement("ul");
        navLinksList.id = "nav-links";
        navLinksList.className = "flex flex-col md:flex-row items-center justify-center gap-6 2xl:gap-9 text-barwhite text-2xl font-glacial antialiased";

        const links = ["Accueil", "Pong", "Discussions", "Github"];
        links.forEach(linkText => {
            const listItem = document.createElement("li");
            listItem.className = "hover:duration-100 hover:transition-all hover:scale-115 hover:ease-linear";
            const link = document.createElement("a");
            link.href = this.navLinks.find(link => link.name === linkText)?.url || "#"; // Utiliser l'URL correspondante
            link.textContent = linkText;
            listItem.appendChild(link);
            navLinksList.appendChild(listItem);
        });

        navLinksContainer.appendChild(navLinksList);

        // Ajouter le bouton de connexion - UTILISER CORRECTEMENT LE COMPOSANT
        const loginButton = new BorderedButton("login", "Connexion").build();

        // Structure finale
        navbarContainer.appendChild(logoContainer);
        navbarContainer.appendChild(navLinksContainer);
        navbarContainer.appendChild(loginButton.getElement()!); // Ajouter l'élément complet

        navElement.appendChild(navbarContainer);
        this.element.appendChild(navElement);

        return this;
    }
}
