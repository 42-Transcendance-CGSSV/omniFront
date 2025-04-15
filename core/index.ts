import { App } from "./Classes/App.js";
import { AComponent } from "./Classes/AComponent.js";
import { TextComponent } from "./Classes/TextComponent.js";
import { Router } from './Classes/Router.js';
import { HomePage } from './Classes/HomePage.js';
import { AboutPage } from './Classes/AboutPage.js';
import { ImagePage } from './Classes/ImagePage.js';

export { App, AComponent, TextComponent };

// Création du routeur
const router = new Router('#app');

// Ajout des routes
router.addRoutes([
    {
        path: '/',
        component: async () => {
            const page = new HomePage();
            page.render();
            return page;
        }
    },
    {
        path: '/about',
        component: async () => {
            const page = new AboutPage();
            page.render();
            return page;
        }
    },
    {
        path: '/image',
        component: async () => {
            const page = new ImagePage();
            page.render();
            return page;
        }
    }
]);

// Démarrage du routeur
router.start();
