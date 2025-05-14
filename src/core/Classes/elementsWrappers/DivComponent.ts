// Fichier : src/core/classes/elementWrappers/DivComponent.ts (ou votre chemin)
import { AComponent, AComponentProps } from '../AComponent'; // Ajustez le chemin

// Pas besoin de props spécifiques à DivComponent pour l'instant si AComponentProps gère tout.
interface DivComponentProps extends AComponentProps {
    // onClick et autres événements sont gérés par AComponent via props
}

export class DivComponent extends AComponent<DivComponentProps> {
    constructor(props: DivComponentProps) {
        // Indique à AComponent que cette instance doit créer un 'div'
        super(props, 'div');
    }

}