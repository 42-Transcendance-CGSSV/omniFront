/**
 * Classe de base pour créer des composants réutilisables
 */
export class AComponent {
    /**
     * Constructeur du composant
     * @param props - Propriétés du composant
     */
    constructor(props) {
        this.element = null;
        this.state = {};
        this.eventListeners = [];
        this.props = { ...props };
    }
    /**
     * Crée l'élément DOM du composant
     * @returns Le composant lui-même (pour le chaînage)
     */
    render() {
        // Cette méthode doit être surchargée par les classes enfants
        this.element = document.createElement("div");
        this.applyBasicProperties();
        return this;
    }
    /**
     * Applique les propriétés de base au composant
     */
    applyBasicProperties() {
        if (!this.element)
            return;
        if (this.props.id)
            this.element.id = this.props.id;
        if (this.props.className)
            this.element.className = this.props.className;
    }
    /**
     * Définit l'état du composant et déclenche une mise à jour
     * @param newState - Nouvel état à fusionner avec l'état actuel
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.update();
    }
    /**
     * Met à jour le composant en fonction de son état actuel
     */
    update() {
        const oldElement = this.element;
        if (!oldElement || !oldElement.parentElement)
            return;
        // Re-render le composant
        this.render();
        if (this.element && oldElement.parentElement) {
            // Remplace l'ancien élément par le nouveau
            oldElement.parentElement.replaceChild(this.element, oldElement);
            // Réapplique les écouteurs d'événements
            this.reapplyEventListeners();
        }
    }
    /**
     * Ajoute un écouteur d'événement à l'élément
     * @param type - Type d'événement (ex: 'click', 'input')
     * @param handler - Fonction de gestion de l'événement
     */
    addEventListener(type, handler) {
        if (!this.element)
            return;
        this.element.addEventListener(type, handler);
        this.eventListeners.push({ type, handler });
    }
    /**
     * Réapplique tous les écouteurs d'événements après une mise à jour
     */
    reapplyEventListeners() {
        if (!this.element)
            return;
        for (const { type, handler } of this.eventListeners) {
            this.element.addEventListener(type, handler);
        }
    }
    /**
     * Monte le composant dans un élément parent
     * @param parent - Élément parent dans lequel monter le composant
     * @returns Le composant lui-même (pour le chaînage)
     */
    mount(parent) {
        // Si on a fourni une chaîne, on cherche l'élément correspondant
        const parentElement = typeof parent === "string"
            ? document.querySelector(parent)
            : parent;
        if (!parentElement) {
            throw new Error(`Impossible de trouver l'élément parent: ${parent}`);
        }
        // Si le composant n'a pas encore été rendu, on le fait
        if (!this.element) {
            this.render();
        }
        // Si le composant a été rendu avec succès, on l'ajoute au parent
        if (this.element) {
            parentElement.appendChild(this.element);
        }
        return this;
    }
    /**
     * Démonte le composant du DOM
     */
    unmount() {
        if (this.element && this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }
    }
    /**
     * Récupère l'élément DOM du composant
     * @returns L'élément DOM du composant
     */
    getElement() {
        return this.element;
    }
}
//# sourceMappingURL=AComponent.js.map