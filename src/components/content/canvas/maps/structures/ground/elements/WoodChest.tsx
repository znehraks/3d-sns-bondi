import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Mesh, Vector3 } from "three";
import gsap from "gsap";
import { ThreeEvent } from "@react-three/fiber";

const name = "ground-wood-chest";
export const WoodChest = () => {
  const ref = useRef<Mesh>(null);
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene } = useGLTF("/models/Wood Chest.glb");
  const position = useMemo(() => new Vector3(8, 0, 0), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene, setPlayGroundStructuresBoundingBox]);

  useEffect(() => {
    if (ref.current)
      gsap.to(ref.current.scale, {
        yoyo: true,
        repeat: -1,
        x: 1.1,
        y: 1.1,
        z: 1.1,
      });
  }, []);
  return (
    <>
      <rectAreaLight
        args={["yellow", 50, 5, 5]}
        position={[position.x, 0, position.z]}
        rotation-x={Math.PI / 2}
      />
      <primitive
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          // 키를 안가졌을 때는 키 가져오라고 보여주고, 키 가졌을땐 보물 획득
        }}
        ref={ref}
        name={name}
        scale={1}
        position={position}
        object={scene}
      />
    </>
  );
};
