import { Router } from './core/Classes/Router.js';
import { AComponent } from './core/Classes/AComponent.js';
class HomePage extends AComponent {
    render() {
        this.element = document.createElement('div');
        this.element.innerHTML = `
            <h1>Bienvenue sur la page d'accueil</h1>
            <p>Ceci est un test du router SPA</p>
            <nav>
                <a href="/about">Aller à la page About</a>
                <a href="/users/42">Voir le profil utilisateur 42</a>
            </nav>
        `;
        return this;
    }
}
class AboutPage extends AComponent {
    render() {
        this.element = document.createElement('div');
        this.element.innerHTML = `
            <h1>À propos</h1>
            <p>Ceci est la page À propos</p>
            <nav>
                <a href="/">Retour à l'accueil</a>
                <a href="/users/42">Voir le profil utilisateur 42</a>
            </nav>
        `;
        return this;
    }
}
class UserProfilePage extends AComponent {
    render() {
        this.element = document.createElement('div');
        this.element.innerHTML = `
            <h1>Profil Utilisateur ${this.props.id}</h1>
            <p>Ceci est le profil de l'utilisateur ${this.props.id}</p>
            <nav>
                <a href="/">Retour à l'accueil</a>
                <a href="/about">Aller à la page About</a>
            </nav>
        `;
        return this;
    }
}
class NotFoundPage extends AComponent {
    render() {
        this.element = document.createElement('div');
        this.element.innerHTML = `
            <h1>404 - Page non trouvée</h1>
            <p>La page que vous recherchez n'existe pas</p>
            <nav>
                <a href="/">Retour à l'accueil</a>
            </nav>
        `;
        return this;
    }
}
// Création du router
const router = new Router('#app');
// Configuration des routes
router
    .addRoute({
    path: '/',
    component: () => Promise.resolve(HomePage)
})
    .addRoute({
    path: '/about',
    component: () => Promise.resolve(AboutPage)
})
    .addRoute({
    path: '/users/:id',
    component: () => Promise.resolve(UserProfilePage)
})
    .setNotFoundComponent(() => Promise.resolve(NotFoundPage));
// Démarrer le router
router.start();
//# sourceMappingURL=index.js.map