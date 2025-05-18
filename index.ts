import router from "./routes.js";
import {
	AboutPage,
	HomePage,
	ImagePage,
	PongPage,
	UserProfilePage,
} from "./pages/index.js";

// Configuration des routes
router
	.addRoute({
		path: "/",
		component: () => HomePage,
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
