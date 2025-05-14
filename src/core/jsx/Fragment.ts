// src/core/jsx/Fragment.ts

// Souvent, Fragment est juste un symbole ou une fonction identitaire
// car `h` gère la logique de "ne pas rendre de wrapper".
// Babel s'attend à ce que `pragmaFrag` (donc 'Fragment') soit une valeur.
// Il peut être exporté comme un simple objet ou une fonction factice si votre `h`
// le gère par son nom/référence.
export const Fragment = Symbol('jsx.Fragment'); // Utiliser un Symbole est une bonne pratique

// Si votre fonction `h` a besoin que Fragment soit un composant:
// import { AComponent } from "../classes/AComponent";
// export class Fragment extends AComponent {
//   constructor(props: { children?: any[] }) {
//     super(props);
//     this.isFragment = true; // Un flag pour votre moteur de rendu
//   }
//   // Un fragment n'a généralement pas de rendu propre, il retourne ses enfants.
// }