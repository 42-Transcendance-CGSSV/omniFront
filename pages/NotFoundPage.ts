import { AComponent, AComponentProps } from "./index";

interface NotFoundPageProps extends AComponentProps {
	// Ajoutez ici les props spécifiques à NotFoundPage si nécessaire
}

class NotFoundPage extends AComponent<NotFoundPageProps> {
	public render() {
		this.element = document.createElement("div");
		this.element.innerHTML = `
            <h1>404 - Page non trouvée Toz</h1>
            <p>La page que vous recherchez n'existe pas</p>
            <nav>
                <a href="/">Retour à l'accueil</a>
            </nav>
        `;
		return this;
	}
}

export default NotFoundPage;
