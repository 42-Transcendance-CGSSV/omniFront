import { AComponent, AComponentProps } from "../core/Classes/AComponent.js";


interface AboutPageProps extends AComponentProps {
	// Ajoutez ici les props spécifiques à AboutPage si nécessaire
}

class AboutPage extends AComponent<AboutPageProps> {
	public render() {
		this.element = document.createElement("div");
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

export default AboutPage;
