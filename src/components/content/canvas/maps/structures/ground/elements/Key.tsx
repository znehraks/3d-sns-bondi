import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import {
  PlayGroundStructuresBoundingBoxAtom,
  PlayerInventoryAtom,
  PlayerCompletedQuestsAtom,
} from "../../../../../../../store/PlayersAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Mesh, Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { uniq } from "lodash";

const name = "ground-key";
export const Key = () => {
  const ref = useRef<Mesh>(null);
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom);

  const playerCompletedQuests = useRecoilValue(PlayerCompletedQuestsAtom);

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

  if (
    playerCompletedQuests.includes("treasure") ||
    playerInventory.includes("key")
  ) {
    return null;
  }
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
          alert("열쇠를 얻었습니다!");
          setPlayerInventory((prev) => uniq([...prev, "key"]));
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
