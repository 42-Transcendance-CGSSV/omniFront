
export interface AComponentProps {
	id?: string;
	className?: string;
	style?: string | Partial<CSSStyleDeclaration>;
	children?: Array<AComponent | string | number | null | undefined> | AComponent | string | number | null | undefined;
	key?: string | number; // Utile pour les listes et le diffing futur
	[key: string]: any;
}

export class AComponent<P extends AComponentProps = AComponentProps, S = Record<string, any>> {
	public element: HTMLElement | Text | DocumentFragment | null = null; // L'élément peut aussi être un nœud texte ou un fragment
	public props: P;
	protected state: S = {} as S;
	private boundEventListeners: Array<{ element: HTMLElement; type: string; handler: EventListener }> = [];
	protected _tagName: string | null = null;
	public _isTextNode: boolean = false;
	public _isFragment: boolean = false;


	constructor(props: P, tagName: string | null = null) {
		this.props = { ...props };
		this._tagName = tagName; // Défini par les sous-classes (DivComponent) ou par `h` pour les textes/fragments

		// Si c'est un composant "texte" pur, on le note.
		if (tagName === '#text') {
			this._isTextNode = true;
		}
		if (tagName === '#fragment') {
			this._isFragment = true;
		}
	}

	/**
	 * Méthode que les composants personnalisés (ex: PlayerDisplayer) DOIVENT surcharger
	 * pour retourner leur structure JSX.
	 * @returns La description JSX de la vue du composant.
	 */
	public view(): AComponent | string | null | Array<AComponent | string | null> | void {
		// Par défaut, un AComponent de base ne rend pas de structure interne propre.
		// Il affiche ses enfants si c'est un wrapper d'élément HTML.
		// Les composants personnalisés surchargeront ceci pour retourner du JSX.
		// Si c'est un wrapper (this._tagName est défini), ses enfants (this.props.children)
		// seront gérés par la fonction de rendu principale.
		if (this._tagName && !this._isTextNode && !this._isFragment) {
			// Pour les wrappers comme DivComponent, leur "vue" sont leurs enfants.
			// La fonction de rendu externe (dans vdom/render.ts) s'en chargera.
			return; // Pas besoin de retourner quelque chose ici, les enfants sont dans les props
		}
		// Si ce n'est pas un wrapper et que view() n'est pas surchargé, il ne rend rien par lui-même.
		// console.warn(`Component ${this.constructor.name} does not have a 'view' method and is not a native element wrapper.`);
	}


	/**
	 * Crée et retourne l'élément DOM pour CE composant.
	 * Ne gère PAS récursivement le rendu des enfants ici directement pour les composants personnalisés.
	 * La fonction de rendu globale (dans vdom/render.ts) orchestrera cela.
	 * @returns L'élément HTMLElement, Text, ou DocumentFragment généré.
	 */
	public createElement(): HTMLElement | Text | DocumentFragment {
		if (this._isTextNode) {
			this.element = document.createTextNode(typeof this.props.children === 'string' || typeof this.props.children === 'number' ? String(this.props.children) : '');
		} else if (this._isFragment) {
			this.element = document.createDocumentFragment();
			// Les enfants du fragment seront ajoutés par la fonction de rendu globale.
		} else if (this._tagName) {
			this.element = document.createElement(this._tagName);
			this._applyPropsToElement(this.element as HTMLElement);
			// Les enfants seront ajoutés par la fonction de rendu globale (vdom/render.ts)
			// en traitant this.props.children.
		} else {
			// C'est un composant personnalisé (ex: PlayerDisplayer)
			// Son élément réel sera la racine de ce que sa méthode `view()` retourne après traitement par `h`.
			// La fonction de rendu globale (vdom/render.ts) s'en chargera.
			// Pour l'instant, on peut créer un placeholder ou laisser this.element null
			// jusqu'à ce que son contenu soit rendu.
			// this.element = document.createComment(`${this.constructor.name} placeholder`);
			throw new Error(`Composant personnalisé ${this.constructor.name} ne doit pas appeler createElement directement sans _tagName. Sa vue JSX sera utilisée.`);
		}
		return this.element;
	}

	protected _applyPropsToElement(element: HTMLElement): void {
		// Retirer les anciens listeners avant d'en ajouter de nouveaux pour éviter les doublons
		this._clearEventListeners(element);

		for (const propName in this.props) {
			if (propName === 'children' || propName === 'key' || propName === '_tagName') {
				continue;
			}

			const propValue = this.props[propName];

			// Gestion des événements (ex: onClick, onInput)
			if (propName.startsWith('on') && typeof propValue === 'function') {
				const eventType = propName.substring(2).toLowerCase();
				// Utiliser une fonction fléchée pour conserver le `this` du composant si nécessaire,
				// mais ici, c'est le handler fourni directement.
				const handler = propValue as EventListener;
				element.addEventListener(eventType, handler);
				this.boundEventListeners.push({ element, type: eventType, handler });
			}
			// Gestion des classes
			else if (propName === 'className') {
				if (propValue) element.className = propValue as string;
				else element.className = ''; // Retirer la classe si propValue est vide
			}
			// Gestion de l'ID
			else if (propName === 'id') {
				element.id = propValue as string;
			}
			// Gestion du style
			else if (propName === 'style') {
				if (typeof propValue === 'string') {
					element.style.cssText = propValue;
				} else if (typeof propValue === 'object' && propValue !== null) {
					Object.assign(element.style, propValue);
				}
			}
			// Attributs booléens (disabled, checked, etc.)
			else if (typeof propValue === 'boolean') {
				if (propValue) {
					element.setAttribute(propName, ''); // Les attributs booléens vrais ont juste le nom
				} else {
					element.removeAttribute(propName);
				}
			}
			// Propriétés spécifiques (value pour input/textarea/select)
			else if (propName === 'value' && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT')) {
				(element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value = propValue as string;
			}
			// Tous les autres attributs
			else if (propValue != null) { // Ne pas définir si null ou undefined
				element.setAttribute(propName, String(propValue));
			}
		}
	}

	protected setState(newState: Partial<S>): void { // S est le type de votre état, par ex. Record<string, any>
		const prevState = { ...this.state };
		this.state = { ...this.state, ...newState };

		// Appeler un hook ou une méthode pour notifier qu'un rerender est nécessaire
		// Par exemple, si vous avez une fonction de rendu globale :
		// globalRenderQueue.scheduleUpdate(this, prevState);

		this.performUpdate(prevState); // Appel direct pour une mise à jour simplifiée
	}

	/**
	 * Logique de mise à jour du composant.
	 * Ceci est une version TRES simplifiée. Un vrai framework utiliserait un VDOM et un diffing.
	 */
	public performUpdate(_prevState: S): void {
		const oldElement = this.element;
		if (!oldElement || !oldElement.parentElement) {
			console.warn(`[${this.constructor.name}] Impossible de mettre à jour : ancien élément ou parent non trouvé.`);
			return;
		}
		const parent = oldElement.parentElement;

		// Pour les composants personnalisés, il faut obtenir la nouvelle vue JSX
		let newRenderedComponent: AComponent<P, S> | null = null;
		if (!this._tagName || this._isFragment) { // Si c'est un composant personnalisé ou un fragment
			const newViewJsx = this.view(); // Récupère la nouvelle structure JSX
			if (newViewJsx) {
				// `h` va traiter ce JSX. Supposons que `h` retourne une instance de AComponent.
				// Ceci est une simplification, la fonction de rendu globale orchestrerait ça.
				// @ts-ignore - Assume h is defined elsewhere in the application
				newRenderedComponent = h(newViewJsx as any, this.props); // Simule l'appel à h
			}
		} else { // C'est un wrapper d'élément natif ou un nœud texte
			newRenderedComponent = this; // Le composant lui-même est la "vue"
		}

		if (!newRenderedComponent) {
			if (oldElement) parent.removeChild(oldElement);
			this.element = null;
			return;
		}

		const newElement = newRenderedComponent.createElement(); // Crée le nouvel élément DOM

		// Si c'est un wrapper d'élément HTML, il faut s'assurer que ses enfants sont aussi mis à jour/recréés.
		// Cette partie est complexe sans VDOM. Pour l'instant, on assume que createElement +
		// la fonction de rendu globale (vdom/render.ts) gèrent les enfants.
		// Ici, on se contente de remplacer l'élément principal du composant.
		if (newRenderedComponent !== this) { // Si la vue a retourné un NOUVEAU composant (pas le même wrapper)
			// Il faut transférer les enfants de this.props.children vers le newRenderedComponent
			// et laisser le moteur de rendu (vdom/render.ts) les ajouter.
			// C'est là que la logique devient compliquée sans un système de VDOM clair.
			// Pour la simplicité, on assume que si view() retourne qqch, c'est une nouvelle structure.
		}
		// Appliquer les props au *nouvel* élément si le composant est un wrapper et s'est mis à jour lui-même
		if (newRenderedComponent === this && newElement instanceof HTMLElement) {
			this._applyPropsToElement(newElement);
		}

		parent.replaceChild(newElement, oldElement);
		this.element = newElement; // Mettre à jour la référence à l'élément
		// Les event listeners ont été appliqués par _applyPropsToElement sur le nouvel élément
	}


	private _clearEventListeners(element: HTMLElement | null = this.element as HTMLElement): void {
		if (!element) return;
		this.boundEventListeners.forEach(listener => {
			if (listener.element === element) { // S'assurer qu'on retire de cet élément précis
				element.removeEventListener(listener.type, listener.handler);
			}
		});
		// Filtrer pour ne garder que les listeners des autres éléments (si AComponent gère plusieurs éléments, ce qui n'est pas le cas ici)
		this.boundEventListeners = this.boundEventListeners.filter(l => l.element !== element);
	}

	public mount(parent: HTMLElement | string): this {
		const parentElement = typeof parent === 'string' ? document.querySelector<HTMLElement>(parent) : parent;
		if (!parentElement) throw new Error(`Parent element not found: ${parent}`);

		// La création de l'élément et le rendu des enfants seront gérés par la fonction de rendu globale
		// (vdom/render.ts) qui utilisera `this.view()` pour les composants personnalisés
		// et `this.createElement()` pour les wrappers/textes.
		// `mount` ici signifierait juste "ajouter l'élément déjà rendu au parent spécifié".
		// Pour cela, l'élément doit déjà exister.

		// Simplification : on assume que `mount` est appelé sur un composant dont l'élément
		// est sur le point d'être créé ou l'a déjà été par un appel externe (rare).
		// La logique de rendu principale (vdom/render.ts) devrait être le point d'entrée.
		if (!this.element) {
			console.warn(`[${this.constructor.name}] mount() appelé mais this.element est null. Le rendu doit être orchestré par le système (vdom/render.ts).`);
			// Normalement, la fonction render globale (dans vdom/render.ts) s'occupe de ça.
			// Elle appellerait this.createElement() ou traiterait le JSX de this.view().
			// this.createElement(); // Ne pas faire ça ici sans contexte.
			return this;
		}

		parentElement.appendChild(this.element);
		return this;
	}

	public unmount(): void {
		if (this.element) {
			this._clearEventListeners(this.element as HTMLElement);
			if (this.element.parentElement) {
				this.element.parentElement.removeChild(this.element);
			}
			this.element = null;
		}
	}

	public getElement(): HTMLElement | Text | DocumentFragment | null {
		return this.element;
	}
}