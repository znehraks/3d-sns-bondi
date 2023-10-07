import { useRecoilValue } from "recoil";
import { CharacterSelectFinishedAtom } from "../../store/PlayersAtom";
import { MainCanvas } from "./canvas/MainCanvas";
import { CanvasLayout } from "./canvasLayout/Layout";
import { Lobby } from "./lobby/Lobby";

export const Content = () => {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  if (characterSelectFinished) {
    return (
      <CanvasLayout>
        <MainCanvas />
      </CanvasLayout>
    );
  }
  return <Lobby />;
};

// npx gltfjsx public/models/Block\ Boy.glb -o src/componeDnts/Block.jsx -r public
