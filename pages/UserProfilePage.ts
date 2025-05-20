import { AComponent, AComponentProps } from "../classes/dcomponents/AComponent";


interface UserProfilePageProps extends AComponentProps {
	id: string;
}

class UserProfilePage extends AComponent<UserProfilePageProps> {
	public render() {
		this.element = document.createElement("div");
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

export default UserProfilePage;
