import router from "./routes.js";
import {
    AboutPage,
    HomePage,
    ImagePage,
    PongPage,
    UserProfilePage,
    NotFoundPage
} from "./pages/index.js";

// Configuration des routes
router
    .addRoute({
        path: "/",
        component: () => Promise.resolve(HomePage),
    })
    .addRoute({
        path: "/about",
        component: () => Promise.resolve(AboutPage),
    })
    .addRoute({
        path: "/image",
        component: () => Promise.resolve(ImagePage),
    })
    .addRoute({
        path: "/users/:id",
        component: () => Promise.resolve(UserProfilePage),
    })
    .addRoute({
        path: "/pong",
        component: () => Promise.resolve(PongPage),
    })
    .setNotFoundComponent(() => Promise.resolve(NotFoundPage));

router.start();