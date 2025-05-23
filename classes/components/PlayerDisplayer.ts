import DivElement from "@elements/DivElement";
import ImgElement from "@elements/ImgElement";

class PlayerDisplayer {
    private style: string = "rounded-lg px-4 py-2 flex items-center";
    private playerPicture: string;

    public constructor(playerPicture: string) {
        this.playerPicture = playerPicture;
    }

    public build(): DivElement {
        const playerImage: ImgElement = new ImgElement({
            src: this.playerPicture,
            className: "w-32 h-32 rounded-full border-solid"
        });

        const rootDiv: DivElement = new DivElement({
            id: "content",
            className: this.style,
            children: [playerImage] // <-- C’est ici qu’on utilise le système
        });

        return rootDiv // <-- Pas de mount ici ! + pas de render non plus sinon ca ne s'affichera pas pour les composants complexes
    }
}

export default PlayerDisplayer;
