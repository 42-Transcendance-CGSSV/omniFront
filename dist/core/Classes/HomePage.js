import { Page } from './Page.js';
export class HomePage extends Page {
    constructor() {
        super('home');
    }
    render() {
        const content = `
            <div class="home-container">
                <h1>Bienvenue sur notre site</h1>
                <p>Ceci est la page d'accueil de notre application.</p>
                <nav>
                    <a href="/about">À propos</a>
                    <a href="/image">Voir l'image</a>
                </nav>
            </div>
        `;
        this.setContent(content);
    }
}
//# sourceMappingURL=HomePage.js.map