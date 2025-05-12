import { DivComponent } from "../core/Classes/DivComponent";
import { ImgComponent } from "../core/Classes/ImgComponent";

class PlayerDisplayer {
    private style: string = "rounded-lg px-4 py-2 flex items-center";
    private playerPicture: string;

    public constructor(playerPicture: string) {
        this.playerPicture = playerPicture;
    }

    public build(): DivComponent {
        const playerImage: ImgComponent = new ImgComponent({
            src: this.playerPicture,
            className: "w-32 h-32 rounded-full border-solid"
        });

        const rootDiv: DivComponent = new DivComponent({
            id: "content",
            className: this.style,
            children: [playerImage] // <-- C’est ici qu’on utilise le système
        });

        return rootDiv.render(); // <-- Pas de mount ici !
    }
}

export default PlayerDisplayer;
