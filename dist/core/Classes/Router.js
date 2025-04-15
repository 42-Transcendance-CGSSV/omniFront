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
     */
    navigate(path) {
        // Met à jour l'historique du navigateur
        window.history.pushState({}, '', path);
        // Gère le changement de route
        this.handleRouteChange();
    }
    /**
     * Gère le changement de route en fonction de l'URL actuelle
     */
    async handleRouteChange() {
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
                const component = await route.component();
                this.currentComponent = component;
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
        return this.routes.find(r => r.path === path);
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
                const notFoundComponent = await this.notFoundComponent();
                this.currentComponent = notFoundComponent;
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