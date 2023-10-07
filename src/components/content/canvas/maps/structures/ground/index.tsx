import { Floor } from "./elements/Floor";
import { Swing } from "./elements/Swing";
import { JungleGym } from "./elements/JungleGym";
import { Slide } from "./elements/Slide";
import { Suspense } from "react";
import { Loader } from "../../../../loader/Loader";
import { Cloud } from "@react-three/drei";

export const GroundElements = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Floor />
      <Swing />
      <Slide />
      <JungleGym />
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
    </Suspense>
  );
};
