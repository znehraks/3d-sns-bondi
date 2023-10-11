import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Mesh, Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";

const name = "ground-key";
export const Key = () => {
  const ref = useRef<Mesh>(null);
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene } = useGLTF("/models/Key.glb");
  const position = useMemo(() => new Vector3(22, 1, -18), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    if (ref.current)
      gsap.to(ref.current.rotation, {
        duration: 3,
        repeat: -1,
        repeatDelay: 0,
        y: Math.PI * 6,
      });
  }, [position, scene, setPlayGroundStructuresBoundingBox]);

  return (
    <>
      <rectAreaLight
        args={["yellow", 30, 5, 5]}
        position={[position.x, 0, position.z]}
        rotation-x={Math.PI / 2}
      />
      <primitive
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
        }}
        ref={ref}
        visible
        name={name}
        scale={1}
        position={position}
        rotation-z={Math.PI / 2.5}
        object={scene}
      />
    </>
  );
};
