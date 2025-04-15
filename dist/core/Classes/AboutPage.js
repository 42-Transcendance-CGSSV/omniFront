import { Page } from './Page.js';
export class AboutPage extends Page {
    constructor() {
        super('about');
    }
    render() {
        const content = `
            <div class="about-container">
                <h1>À propos</h1>
                <p>Cette page contient des informations sur notre application.</p>
                <nav>
                    <a href="/">Retour à l'accueil</a>
                    <a href="/image">Voir l'image</a>
                </nav>
            </div>
        `;
        this.setContent(content);
    }
}
//# sourceMappingURL=AboutPage.js.map