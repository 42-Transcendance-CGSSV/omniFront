export class Page {
    constructor(name) {
        this.content = '';
        this.name = name;
    }
    setContent(content) {
        this.content = content;
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = content;
        }
    }
    render() {
        // Méthode à implémenter par les classes enfants
    }
}
//# sourceMappingURL=Page.js.map