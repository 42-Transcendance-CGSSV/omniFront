export class Page {
    protected name: string;
    protected content: string = '';

    constructor(name: string) {
        this.name = name;
    }

    protected setContent(content: string): void {
        this.content = content;
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = content;
        }
    }

    public render(): void {
        // Méthode à implémenter par les classes enfants
    }
} 