import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Vector3 } from "three";

const name = "ground-npc-dinosaur";
export const Dinosaur = () => {
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene } = useGLTF("/models/CuteRedDino.glb");
  const position = useMemo(() => new Vector3(0, 0, 0), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene, setPlayGroundStructuresBoundingBox]);

  return (
    <primitive
      visible
      name={name}
      scale={2}
      position={position}
      object={scene}
    />
  );
};
