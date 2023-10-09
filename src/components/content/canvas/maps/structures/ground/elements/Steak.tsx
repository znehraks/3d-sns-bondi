import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";

const name = "ground-steak";
export const Steak = () => {
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene } = useGLTF("/models/Steak.glb");
  const position = useMemo(() => new Vector3(-8, 0, -2), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene, setPlayGroundStructuresBoundingBox]);

  return (
    <primitive
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
      }}
      visible
      name={name}
      scale={1}
      position={position}
      object={scene}
    />
  );
};
