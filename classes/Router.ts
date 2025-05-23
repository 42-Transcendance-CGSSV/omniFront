import Page from "./Page";

type Route = {
    path: string;
    component: () => any;
};

export default class Router {
    private routes: Route[] = [];
    private container: HTMLElement | null = null;
    private currentComponent: any = null;
    private notFoundComponent: (() => any) | null = null;
    private firstLoad: boolean = true;

    /**
     * Initialise le router avec un élément conteneur où les composants seront rendus
     * @param container Élément DOM ou sélecteur CSS du conteneur
     */
    public constructor(container: HTMLElement | string) {
        // Si on reçoit un sélecteur CSS, on cherche l'élément correspondant
        if (typeof container === 'string') {
            this.container = document.querySelector(container);
            if (!this.container) {
                throw new Error(`Container element not found: ${container}`);
            }
        } else {
            this.container = container;
        }

        // Écoute les changements d'URL avec l'API History
        window.addEventListener('popstate', () => this.handleRouteChange());

        // Intercepte les clics sur les liens pour la navigation SPA
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a') as HTMLAnchorElement;

            if (anchor && anchor.href && !anchor.getAttribute('target') && !anchor.getAttribute('download')) {
                // Vérifie que le lien pointe vers notre domaine
                const url = new URL(anchor.href);
                if (url.origin === window.location.origin) {
                    e.preventDefault();
                    this.navigate(url.pathname);
                }
            }
        });
    }

    /**
     * Ajoute une route au router
     * @param route Configuration de la route
     */
    public addRoute(route: Route): Router {
        this.routes.push(route);
        return this;
    }

    /**
     * Ajoute plusieurs routes au router
     * @param routes Tableau de configurations de routes
     */
    public addRoutes(routes: Route[]): Router {
        this.routes = [...this.routes, ...routes];
        return this;
    }

    /**
     * Définit le composant à afficher quand aucune route ne correspond
     * @param component Fonction retournant le composant 404
     */
    public setNotFoundComponent(component: any): Router {
        this.notFoundComponent = component;
        return this;
    }

    /**
     * Navigue vers une nouvelle URL
     * @param path Chemin de l'URL
     */
    public navigate(path: string): void {
        // Met à jour l'historique du navigateur
        window.history.pushState({}, '', path);

        // Gère le changement de route
        this.handleRouteChange();
    }

    /**
     * Gère le changement de route en fonction de l'URL actuelle
     */
    private handleRouteChange(): void {
        const path = window.location.pathname;
        const route = this.findMatchingRoute(path);

        if (route) {
            if (this.currentComponent && typeof this.currentComponent.unmount === 'function') {
                this.currentComponent.unmount();
            }

            if (this.container) {
                this.container.innerHTML = '';
            }

            try {
                const Component = route.component();
                const params = this.extractRouteParams(route.path, path);

                // Check if the component is a Page
                if (Component.prototype instanceof Page) {
                    if (this.firstLoad) {
                        const loaderElement = window.document.getElementById("loader");
                        this.firstLoad = false;
                        loaderElement!.classList.add("hidden");
                        this.currentComponent = new Component();
                        this.currentComponent.render();
                    } else {
                        this.currentComponent = new Component();
                        this.currentComponent.render();
                    }

                } else {
                    this.currentComponent = new Component(params);
                    this.currentComponent.render();
                    if (this.container) {
                        this.currentComponent.mount(this.container);
                    }
                }
            } catch (error) {
                console.error('Error loading component:', error);
                this.handleNotFound();
            }
        } else {
            this.handleNotFound();
        }
    }

    /**
     * Extracts route parameters from the current path
     * @param routePath The route path pattern (e.g., '/users/:id')
     * @param currentPath The current URL path
     * @returns Object containing route parameters
     */
    private extractRouteParams(routePath: string, currentPath: string): Record<string, string> {
        const params: Record<string, string> = {};
        const routeSegments = routePath.split('/').filter(Boolean);
        const pathSegments = currentPath.split('/').filter(Boolean);

        for (let i = 0; i < routeSegments.length; i++) {
            const routeSegment = routeSegments[i];
            if (routeSegment.startsWith(':')) {
                const paramName = routeSegment.slice(1);
                params[paramName] = pathSegments[i];
            }
        }

        return params;
    }

    /**
     * Trouve la route qui correspond au chemin spécifié
     * @param path Chemin de l'URL actuelle
     * @returns Route correspondante ou undefined
     */
    private findMatchingRoute(path: string): Route | undefined {
        // Split the path into segments
        const pathSegments = path.split('/').filter(Boolean);

        // Try to find a matching route
        return this.routes.find(route => {
            const routeSegments = route.path.split('/').filter(Boolean);

            // If the number of segments doesn't match, it's not a match
            if (pathSegments.length !== routeSegments.length) {
                return false;
            }

            // Compare each segment
            for (let i = 0; i < routeSegments.length; i++) {
                const routeSegment = routeSegments[i];
                const pathSegment = pathSegments[i];

                // If the route segment is a parameter (starts with ':'), it matches any value
                if (routeSegment.startsWith(':')) {
                    continue;
                }

                // Otherwise, segments must match exactly
                if (routeSegment !== pathSegment) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Gère le cas où aucune route ne correspond (404)
     */
    private handleNotFound(): void {
        // Vide le conteneur
        if (this.container) {
            this.container.innerHTML = '';
        }

        const loaderElement = window.document.getElementById("loader");
        loaderElement! .classList.add("hidden");

        // Si un composant 404 a été défini, l'affiche
        if (this.notFoundComponent && this.container) {
            try {
                const NotFoundComponent = this.notFoundComponent();
                this.currentComponent = new NotFoundComponent();
                this.currentComponent.render();
                //this.currentComponent.mount(this.container);
            } catch (error) {
                console.error('Error loading not found component:', error);
                if (this.container) {
                    this.container.innerHTML = '<h1>Page not found (404)</h1>';
                }
            }
        } else if (this.container) {
            // Affiche un message 404 par défaut
            this.container.innerHTML = '<h1>Page not found (404)</h1>';
        }
    }

    /**
     * Initialise le router et charge la route correspondant à l'URL actuelle
     */
    public start(): void {
        this.handleRouteChange();
    }
}
