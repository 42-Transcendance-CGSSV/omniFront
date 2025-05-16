import {DivComponent} from "../core/Classes/DivComponent";
import {TextComponent} from "../core/Classes/TextComponent";
import {AComponent} from "../core/Classes/AComponent";
import ListComponent from "../core/Classes/ListComponent";
import ListItemComponent from "../core/Classes/ListItemComponent";

export default class Footer {

    private readonly contacts: { text: string, url: string }[];
    private readonly links: { text: string, url: string }[];

    constructor() {
        this.contacts = [{text: "Github", url: "https://github.com/42-Transcendance-CGSSV/"}];
        this.links = [
            {text: "Home", url: "/"},
            {text: "Profile", url: "/profile"},
            {text: "Tournaments", url: "/tournaments"},
        ];
    }

    public build(): AComponent {

        const copyrightText: TextComponent = new TextComponent({
            id: "copyright-text",
            text: "© 2024 FT_TRANSCENDANCE. All rights reserved.",
            className: "text-white/60 text-sm font-normal font-inter leading-[21px] text-center"
        });

        const copyrightContainer: DivComponent = new DivComponent({
            id: "copyright-container",
            className: "w-full border-t border-white/20 mx-auto px-4 py-4",
            children: [copyrightText]
        });

        const listContactItems: AComponent[] = [];

        for (let contact of this.contacts) {
            listContactItems.push(new ListItemComponent({
                id: "contact-" + contact.text.toLowerCase(),
                type: "li",
                text: contact.text,
                href: contact.url,
                className: "text-white/80 text-base font-normal font-inter leading-normal"
            }));
        }

        const contactList: ListComponent = new ListComponent({
            id: "contact-list",
            className: "space-y-2",
            type: "ul",
            children: listContactItems
        });

        const contactTitle: TextComponent = new TextComponent({
            id: "contact-title",
            text: "Contact",
            className: "text-lavender text-2xl font-semibold font-inter leading-9 mb-2"
        });

        const contactContainer: DivComponent = new DivComponent({
            id: "contact-container",
            className: "w-full md:w-auto",
            children: [contactTitle, contactList]
        });

        const listLinksItems: ListItemComponent[] = [];
        for (let link of this.links) {
            listLinksItems.push(new ListItemComponent({
                id: "link-" + link.text,
                type: "li",
                text: link.text,
                href: link.url,
                className: "text-white/80 text-base font-normal font-inter leading-normal"
            }));
        }

        const linkList: ListComponent = new ListComponent({
            id: "link-list",
            className: "space-y-2",
            type: "ul",
            children: listLinksItems
        });

        const linkTitle: TextComponent = new TextComponent({
            id: "link-title",
            text: "Quick Links",
            className: "text-lavender text-2xl font-semibold font-inter leading-9 mb-2"
        });

        const linkContainer: DivComponent = new DivComponent({
            id: "link-container",
            className: "w-full md:w-auto",
            children: [linkTitle, linkList]
        });

        const aboutText: TextComponent = new TextComponent({
            id: "about-us-text",
            text: "We're passionate about bringing classic games to life with modern technology and design.",
            className: "text-white/80 text-base font-normal font-inter leading-normal"
        });
        const aboutTitle: TextComponent = new TextComponent({
            id: "about-us-title",
            text: "About Us",
            className: "text-lavender text-2xl font-semibold font-inter leading-9 mb-4"
        });
        const aboutContainer: DivComponent = new DivComponent({
            id: "about-us-container",
            className: "w-full md:w-auto",
            children: [aboutTitle, aboutText]
        });

        const footerFlex: DivComponent = new DivComponent({
            id: "footer-flex", className: "flex flex-col md:flex-row justify-center md:justify-between gap-8 md:gap-12",
            children: [aboutContainer, linkContainer, contactContainer]
        });

        const footerCenter: DivComponent = new DivComponent({
            id: "footer-center",
            className: "container mx-auto px-4 py-8",
            children: [footerFlex]
        });

        return new DivComponent({
            id: "footer-container",
            className: "w-full mt-40 bg-transparent border-t-[1.5px] border-white/10",
            children: [footerCenter, copyrightContainer]
        });
    }
}