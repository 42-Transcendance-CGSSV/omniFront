import Router from "./classes/Router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ImagePage from "./pages/ImagePage";
import PongPage from "./pages/PongPage";
import UserProfilePage from "./pages/UserProfilePage";
import SignInPage from "@pages/auth/SignInPage";
import SignUpPage from "@pages/auth/SignUpPage";

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
    });
router.start();