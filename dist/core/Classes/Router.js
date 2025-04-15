export class Router {
    /**
     * Initialise le router avec un élément conteneur où les composants seront rendus
     * @param container Élément DOM ou sélecteur CSS du conteneur
     */
    constructor(container) {
        this.routes = [];
        this.container = null;
        this.currentComponent = null;
        this.notFoundComponent = null;
        // Si on reçoit un sélecteur CSS, on cherche l'élément correspondant
        if (typeof container === 'string') {
            this.container = document.querySelector(container);
            if (!this.container) {
                throw new Error(`Container element not found: ${container}`);
            }
        }
        else {
            this.container = container;
        }
        // Écoute les changements d'URL avec l'API History
        window.addEventListener('popstate', () => this.handleRouteChange());
        // Intercepte les clics sur les liens pour la navigation SPA
        document.addEventListener('click', (e) => {
            const target = e.target;
            const anchor = target.closest('a');
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
    addRoute(route) {
        this.routes.push(route);
        return this;
    }
    /**
     * Ajoute plusieurs routes au router
     * @param routes Tableau de configurations de routes
     */
    addRoutes(routes) {
        this.routes = [...this.routes, ...routes];
        return this;
    }
    /**
     * Définit le composant à afficher quand aucune route ne correspond
     * @param component Fonction retournant le composant 404
     */
    setNotFoundComponent(component) {
        this.notFoundComponent = component;
        return this;
    }
    /**
     * Navigue vers une nouvelle URL
     * @param path Chemin de l'URL
     * @param params Paramètres optionnels à passer au composant
     */
    navigate(path, params = {}) {
        // Met à jour l'historique du navigateur
        window.history.pushState({}, '', path);
        // Gère le changement de route
        this.handleRouteChange(params);
    }
    /**
     * Gère le changement de route en fonction de l'URL actuelle
     * @param extraParams Paramètres supplémentaires à transmettre au composant
     */
    async handleRouteChange(extraParams = {}) {
        const path = window.location.pathname;
        // Trouve la route correspondante
        const route = this.findMatchingRoute(path);
        if (route) {
            // Démonte le composant actuel s'il existe
            if (this.currentComponent && typeof this.currentComponent.unmount === 'function') {
                this.currentComponent.unmount();
            }
            // Vide le conteneur
            if (this.container) {
                this.container.innerHTML = '';
            }
            // Combine les paramètres d'URL avec les paramètres extras
            const params = {
                ...this.extractPathParams(path, route.path),
                ...route.params,
                ...extraParams
            };
            try {
                // Charge et instancie le composant
                const ComponentClass = await route.component();
                this.currentComponent = new ComponentClass(params);
                // Monte le composant dans le conteneur
                if (this.container && this.currentComponent) {
                    this.currentComponent.mount(this.container);
                }
            }
            catch (error) {
                console.error('Error loading component:', error);
                this.handleNotFound();
            }
        }
        else {
            this.handleNotFound();
        }
    }
    /**
     * Trouve la route qui correspond au chemin spécifié
     * @param path Chemin de l'URL actuelle
     * @returns Route correspondante ou undefined
     */
    findMatchingRoute(path) {
        // D'abord, essaie de trouver une correspondance exacte
        let route = this.routes.find(r => r.path === path);
        // Si pas de correspondance exacte, cherche des routes avec paramètres dynamiques
        if (!route) {
            route = this.routes.find(r => {
                // Convertit le pattern de route en regex
                const pattern = r.path.replace(/:\w+/g, '([^/]+)');
                const regex = new RegExp(`^${pattern}$`);
                return regex.test(path);
            });
        }
        return route;
    }
    /**
     * Extrait les paramètres dynamiques d'un chemin d'URL
     * @param path Chemin de l'URL actuelle
     * @param routePath Pattern de la route avec paramètres (ex: /users/:id)
     * @returns Objet contenant les paramètres extraits
     */
    extractPathParams(path, routePath) {
        const params = {};
        // Si la route ne contient pas de paramètres dynamiques, retourne un objet vide
        if (!routePath.includes(':')) {
            return params;
        }
        // Extrait les valeurs des paramètres du chemin actuel
        const pathSegments = path.split('/').filter(segment => segment);
        const routeSegments = routePath.split('/').filter(segment => segment);
        for (let i = 0; i < routeSegments.length; i++) {
            if (routeSegments[i].startsWith(':')) {
                const paramName = routeSegments[i].substring(1);
                params[paramName] = pathSegments[i] || '';
            }
        }
        return params;
    }
    /**
     * Gère le cas où aucune route ne correspond (404)
     */
    async handleNotFound() {
        // Vide le conteneur
        if (this.container) {
            this.container.innerHTML = '';
        }
        // Si un composant 404 a été défini, l'affiche
        if (this.notFoundComponent && this.container) {
            try {
                const NotFoundClass = await this.notFoundComponent();
                this.currentComponent = new NotFoundClass({});
                this.currentComponent.mount(this.container);
            }
            catch (error) {
                console.error('Error loading not found component:', error);
                if (this.container) {
                    this.container.innerHTML = '<h1>Page not found (404)</h1>';
                }
            }
        }
        else if (this.container) {
            // Affiche un message 404 par défaut
            this.container.innerHTML = '<h1>Page not found (404)</h1>';
        }
    }
    /**
     * Initialise le router et charge la route correspondant à l'URL actuelle
     */
    start() {
        this.handleRouteChange();
    }
}
//# sourceMappingURL=Router.js.map