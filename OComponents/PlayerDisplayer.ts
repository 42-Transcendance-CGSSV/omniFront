import {DivComponent} from "../core/Classes/DivComponent";
import {ImgComponent} from "../core/Classes/ImgComponent";


class PlayerDisplayer {
    private style: string = "rounded-lg px-4 py-2 flex items-center";
    private playerPicture: string;
    public rootDiv: DivComponent;

    public constructor(playerPicture: string) {
        this.playerPicture = playerPicture;
        this.rootDiv = new DivComponent({
            id: "content",
            className: this.style
        }).render();
    }

    /**
     *  <img src="./assets/image.png" alt="Player 1" class="player-image"
     *              style="width: 32px; height: 32px; border-radius: 32px; border-style: solid;"/>
     *         <span class="player-name" style="margin-left: 10px">Player 1</span>
     */

    public build(): DivComponent {
        const playerImage: ImgComponent = new ImgComponent({
            src: this.playerPicture,
            className: "w-32 h-32 rounded-4x1 border-solid"
        });


        //// ---------
        const divElement = this.rootDiv.getElement();
        if (!divElement) throw new Error("Error on mounting playerDisplayerElement");

        playerImage.mount(divElement).render();


        /* const playerNameElement = new TextComponent({text: this.playerName}).render();
         const nameElement = playerNameElement.getElement();
         if (nameElement) {
             nameElement.style.marginLeft = "10px";
             playerNameElement.mount(playerDisplayerElement);
         }

         */

        return this.rootDiv.render();
    }


}

export default PlayerDisplayer;