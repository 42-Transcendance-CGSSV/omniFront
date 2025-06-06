import i18next from "i18next";
import {router} from "../routes";

export function getLangFromCookie(): string | undefined {
    const match = document.cookie.match(/(?:^|;\s*)lang=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : undefined;
}

export function setLangCookie(lang: string): void {
    document.cookie = `lang=${encodeURIComponent(lang)}; path=/; max-age=31536000`;
    i18next.changeLanguage(getLangFromCookie(), (error: Error | null, _t: i18next.TFunction) => {
        if (error) throw error;
        router.navigate(window.location.pathname);
    });
}