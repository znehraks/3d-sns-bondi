import { useRecoilValue } from "recoil";
import { CharacterSelectFinishedAtom } from "../store/PlayersAtom";
import { MainCanvas } from "./canvas/MainCanvas";
import { Layout } from "./layout/Layout";
import { Lobby } from "./layout/gameInterfaces/Lobby";

export const Content = () => {
  const characterSelectFinished = useRecoilValue(CharacterSelectFinishedAtom);
  if (characterSelectFinished) {
    return (
      <Layout>
        <MainCanvas />
      </Layout>
    );
  }
  return <Lobby />;
};

// npx gltfjsx public/models/Block\ Boy.glb -o src/componeDnts/Block.jsx -r public
