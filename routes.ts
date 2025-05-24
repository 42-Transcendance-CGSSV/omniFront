import Router from "@classes/Router";
import HomePage from "@pages/HomePage";
import AboutPage from "@pages/AboutPage";
import ImagePage from "@pages/ImagePage";
import PongPage from "@pages/PongPage";
import UserProfilePage from "@pages/UserProfilePage";
import SignInPage from "@pages/auth/SignInPage";
import SignUpPage from "@pages/auth/SignUpPage";
import VerificationEmailPage from "@pages/auth/VerificationEmailPage";
import i18next from 'i18next';
import { getLangFromCookie } from 'utils/lang';


import en from './assets/locales/en.json';
import fr from './assets/locales/fr.json';
import es from './assets/locales/es.json';

// Configuration des routes
export const router = new Router("#app");
router
    .addRoute({
        path: "/",
        component: () => HomePage,
    })
    .addRoute({
        path: "/login",
        component: () => SignInPage,
    })
    .addRoute({
        path: "signup",
        component: () => SignUpPage,
    })
    .addRoute({
        path: "/about",
        component: () => AboutPage,
    })
    .addRoute({
        path: "/image",
        component: () => ImagePage,
    })
    .addRoute({
        path: "/users/:id",
        component: () => UserProfilePage,
    })
    .addRoute({
        path: "/pong",
        component: () => PongPage,
    })
    .addRoute({
        path: "/verify-email",
        component: () => VerificationEmailPage,
    })
    .setNotFoundComponent(() => HomePage);

i18next.init({
    lng: getLangFromCookie() || 'en',
    fallbackLng: 'en',
    resources: {
        en: { translation: en },
        fr: { translation: fr },
        es: { translation: es },
    },
    interpolation: {
        escapeValue: false,
    },
}).then(() => {
    onload = () => {
        router.start();
    }
});
