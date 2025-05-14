import { h } from "../core/jsx/h";
import { DivComponent } from "../core/Classes/elementsWrappers/DivComponent";
import { ImgComponent } from "../core/Classes/elementsWrappers/ImgComponent";

// JSX-style composable component
const PlayerDisplayer = ({ playerPicture }: { playerPicture: string }) => (
    <DivComponent id="content" className="rounded-lg px-4 py-2 flex items-center" >
        <ImgComponent
            src={playerPicture}
            className="w-32 h-32 rounded-full border-solid"
        />
    </DivComponent>
);

export default PlayerDisplayer;

