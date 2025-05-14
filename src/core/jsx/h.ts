import { AComponent } from '../Classes/AComponent';

// Import All elements wrappers
import { DivComponent } from '../Classes/elementsWrappers/DivComponent';
import { ImgComponent } from '../Classes/elementsWrappers/ImgComponent';
import { TextComponent } from '../Classes/elementsWrappers/TextComponent';
import { ButtonComponent } from '../Classes/elementsWrappers/ButtonComponent';

// Import of Fragment
import { Fragment } from './Fragment';

// Un mappage simple pour les éléments HTML courants vers vos classes de composants
const nativeElementMap: { [key: string]: typeof AComponent } = {
	div: DivComponent,
	img: ImgComponent,
	p: TextComponent, // Supposons que TextComponent peut gérer <p>
	span: TextComponent, // et <span>
	button: ButtonComponent,
	// Ajoutez d'autres balises HTML et leurs composants correspondants ici
};

export function h(tag: any, props: any, ...children: any[]): AComponent | AComponent[] | string | null {
	props = props || {}; // Assurez-vous que props n'est jamais null

	// Aplatir les enfants et filtrer les valeurs null/undefined pour plus de propreté
	// Cela aide si vous avez des conditions dans votre JSX: {condition && <MonComposant />}
	const flatChildren = children.flat(Infinity).filter(child => child !== null && child !== undefined);
	if (flatChildren.length > 0) {
		props.children = flatChildren.length === 1 ? flatChildren[0] : flatChildren;
	} else {
		// Assurez-vous que props.children est défini, même vide, si aucune enfant n'est passé.
		// Cela peut simplifier la logique dans vos composants.
		props.children = [];
	}


	if (tag === Fragment) {
		// Pour les fragments, nous retournons simplement les enfants.
		// Votre moteur de rendu VDOM devra savoir comment gérer un tableau d'enfants.
		// Ou, Fragment pourrait être une classe AComponent spéciale.
		// Pour l'instant, considérons qu'il retourne les enfants directement.
		return props.children || []; // Retourne un tableau d'AComponent (ou de texte)
	}

	if (typeof tag === 'string') {
		const ComponentClass = nativeElementMap[tag.toLowerCase()];
		if (ComponentClass) {
			return new ComponentClass(props);
		} else {
			console.warn(`Balise HTML non prise en charge: ${tag}. Rendu comme un div simple.`);
			// Fallback ou erreur plus stricte
			// Pour un fallback simple, vous pourriez avoir un UnknownElementComponent
			// ou utiliser DivComponent par défaut.
			return new DivComponent({ ...props, 'data-unknown-tag': tag });
		}
	} else if (typeof tag === 'function') {
		// Si c'est une classe qui hérite de AComponent
		if (Object.prototype.isPrototypeOf.call(AComponent, tag)) {
			return new (tag as typeof AComponent)(props);
		}
		// Si c'est un composant fonctionnel (qui retourne du JSX ou un AComponent)
		// Un composant fonctionnel ne sera pas `new`-able de cette manière.
		// Il devrait être appelé comme une fonction.
		// Pour l'instant, on se concentre sur les composants de classe.
		// return tag(props, children); // Si vous supportez les composants fonctionnels
		console.error(`Le tag est une fonction mais n'hérite pas de AComponent ou n'est pas géré: ${tag.name}`);
		throw new Error(`Type de tag fonctionnel non supporté: ${tag.name}`);

	} else {
		console.error('Tag JSX invalide:', tag);
		throw new Error(`Tag JSX invalide: ${typeof tag}`);
	}
}
