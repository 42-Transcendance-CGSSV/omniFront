import { Router } from './core/Classes/Router.js';
import { AComponent, AComponentProps } from './core/Classes/AComponent.js';

interface HomePageProps extends AComponentProps {
    // Ajoutez ici les props spécifiques à HomePage si nécessaire
}

class HomePage extends AComponent<HomePageProps> {
    public render() {
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

interface AboutPageProps extends AComponentProps {
    // Ajoutez ici les props spécifiques à AboutPage si nécessaire
}

class AboutPage extends AComponent<AboutPageProps> {
    public render() {
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

interface UserProfilePageProps extends AComponentProps {
    id: string;
}

class UserProfilePage extends AComponent<UserProfilePageProps> {
    public render() {
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

interface NotFoundPageProps extends AComponentProps {
    // Ajoutez ici les props spécifiques à NotFoundPage si nécessaire
}

class NotFoundPage extends AComponent<NotFoundPageProps> {
    public render() {
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