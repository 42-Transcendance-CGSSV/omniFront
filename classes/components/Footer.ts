import {AElement} from "@elements/AElement";
import DivElement from "@elements/DivElement";
import TextElement from "@elements/TextElement";
import ListElement from "@elements/ListElement";
import ListItemElement from "@elements/ListItemElement";

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

    public build(): AElement {

        const copyrightText: TextElement = new TextElement({
            id: "copyright-text",
            text: "© 2024 FT_TRANSCENDANCE. All rights reserved.",
            className: "text-white/60 text-sm font-normal font-inter leading-[21px] text-center select-none"
        });

        const copyrightContainer: DivElement = new DivElement({
            id: "copyright-container",
            className: "w-full border-t border-white/20 mx-auto px-4 py-4",
            children: [copyrightText]
        });

        const listContactItems: AElement[] = [];

        for (let contact of this.contacts) {
            listContactItems.push(new ListItemElement({
                id: "contact-" + contact.text.toLowerCase(),
                type: "li",
                text: contact.text,
                href: contact.url,
                className: "text-white/80 text-base font-normal font-inter leading-normal select-none"
            }));
        }

        const contactList: ListElement = new ListElement({
            id: "contact-list",
            className: "space-y-2",
            type: "ul",
            children: listContactItems
        });

        const contactTitle: TextElement = new TextElement({
            id: "contact-title",
            text: "Contact",
            className: "text-blue-lavender text-2xl font-semibold font-inter leading-9 mb-2 select-none"
        });

        const contactContainer: DivElement = new DivElement({
            id: "contact-container",
            className: "w-full md:w-auto",
            children: [contactTitle, contactList]
        });

        const listLinksItems: ListItemElement[] = [];
        for (let link of this.links) {
            listLinksItems.push(new ListItemElement({
                id: "link-" + link.text,
                type: "li",
                text: link.text,
                href: link.url,
                className: "text-white/80 text-base font-normal font-inter leading-normal select-none"
            }));
        }

        const linkList: ListElement = new ListElement({
            id: "link-list",
            className: "space-y-2",
            type: "ul",
            children: listLinksItems
        });

        const linkTitle: TextElement = new TextElement({
            id: "link-title",
            text: "Quick Links",
            className: "text-blue-lavender text-2xl font-semibold font-inter leading-9 mb-2 select-none"
        });

        const linkContainer: DivElement = new DivElement({
            id: "link-container",
            className: "w-full md:w-auto",
            children: [linkTitle, linkList]
        });

        const aboutText: TextElement = new TextElement({
            id: "about-us-text",
            text: "We're passionate about bringing classic games to life with modern technology and design.",
            className: "text-white/80 text-base font-normal font-inter leading-normal select-none"
        });
        const aboutTitle: TextElement = new TextElement({
            id: "about-us-title",
            text: "About Us",
            className: "text-blue-lavender text-2xl font-semibold font-inter leading-9 mb-4 select-none"
        });
        const aboutContainer: DivElement = new DivElement({
            id: "about-us-container",
            className: "w-full md:w-auto",
            children: [aboutTitle, aboutText]
        });

        const footerFlex: DivElement = new DivElement({
            id: "footer-flex", className: "flex flex-col md:flex-row justify-center md:justify-between gap-8 md:gap-12",
            children: [aboutContainer, linkContainer, contactContainer]
        });

        const footerCenter: DivElement = new DivElement({
            id: "footer-center",
            className: "container mx-auto px-4 py-8",
            children: [footerFlex]
        });

        return new DivElement({
            id: "footer-container",
            className: "w-full mt-40 bg-transparent border-t-[1.5px] border-white/10",
            children: [footerCenter, copyrightContainer]
        });
    }
}