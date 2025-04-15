import { AComponent, AComponentProps } from "./index";

interface HomePageProps extends AComponentProps {
	// Ajoutez ici les props spécifiques à HomePage si nécessaire
}

class HomePage extends AComponent<HomePageProps> {
	public render() {
		this.element = document.createElement("div");
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

export default HomePage;
