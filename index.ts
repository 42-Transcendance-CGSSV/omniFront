import routes from "./routes.js";
import {
	AboutPage,
	HomePage,
	ImagePage,
	PongPage,
	UserProfilePage,
	NotFoundPage,
	HomeTest,
} from "./pages/index.js";

// Configuration des routes
routes
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
	.addRoute({
		path: "/test",
		component: () => Promise.resolve(HomeTest),
	})
	.setNotFoundComponent(() => Promise.resolve(NotFoundPage));

// Démarrer le router
routes.start();
