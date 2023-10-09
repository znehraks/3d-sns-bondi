import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Mesh, Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";

const name = "ground-npc-zombie";
export const Zombie = () => {
  const ref = useRef<Mesh>(null);
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene, animations } = useGLTF("/models/Zombie.glb");
  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-5, 0, -6), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    actions["EnemyArmature|EnemyArmature|EnemyArmature|Attack"]
      ?.play()
      .setDuration(0.8);
    return () => {
      actions["EnemyArmature|EnemyArmature|EnemyArmature|Attack"]?.stop();
    };
  }, [actions, position, scene, setPlayGroundStructuresBoundingBox]);

  return (
    <primitive
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        console.log("좀비와 대화하기");
        // 눌렀을 때 카메라 각도 바뀌면서 좀비랑 대화하는 구도
      }}
      scale={1.2}
      ref={ref}
      visible
      name={name}
      position={position}
      object={scene}
    />
  );
};
