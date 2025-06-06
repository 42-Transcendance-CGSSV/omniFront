import { AElement, AComponentProps } from "@elements/AElement";


interface ImagePage extends AComponentProps {
	// Ajoutez ici les props spécifiques à HomePage si nécessaire
}

class ImagePage extends AElement<ImagePage> {
	public render() {
		this.element = document.createElement("img");
		this.element.innerHTML = `
            <div class="image-container">
                <h1>Ma Belle Image</h1>
                <img src="/src/assetssets/image.png" alt="Une belle image" class="responsive-image">
                <p>Voici une magnifique image qui s'affiche sur notre nouvelle page !</p>
            </div>
        `;
		return this;
	}
}

export default ImagePage;
