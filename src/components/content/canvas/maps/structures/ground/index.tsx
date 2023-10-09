import { Floor } from "./elements/Floor";
import { Swing } from "./elements/Swing";
import { JungleGym } from "./elements/JungleGym";
import { Slide } from "./elements/Slide";
import { Cloud } from "@react-three/drei";
import { PlayStructure } from "./elements/PlayStructure";

export const GroundElements = () => {
  return (
    <>
      <Floor />
      <Swing />
      <Slide />
      <JungleGym />
      <PlayStructure />
      <instancedMesh>
        <Cloud
          segments={100}
          concentrate={"random"}
          opacity={0.5}
          fade={10}
          speed={1}
          position={[-25, 0, -25]}
          color={"pink"}
        />
        <Cloud
          segments={100}
          concentrate={"random"}
          opacity={0.5}
          fade={10}
          speed={1}
          position={[25, 0, -25]}
          color={"skyblue"}
        />
      </instancedMesh>
    </>
  );
};
