import { Page } from './Page.js';

export class ImagePage extends Page {
    constructor() {
        super('image');
    }

    render(): void {
        const content = `
            <div class="image-container">
                <h1>Ma Belle Image</h1>
                <img src="/assets/image.png" alt="Une belle image" class="responsive-image">
                <p>Voici une magnifique image qui s'affiche sur notre nouvelle page !</p>
            </div>
        `;
        this.setContent(content);
    }
} 