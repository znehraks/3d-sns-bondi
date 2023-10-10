import { Billboard, Text, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Mesh, Vector3 } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";

const name = "ground-npc-zombie";
export const Zombie = () => {
  const ref = useRef<Mesh>(null);
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nameRef = useRef<any>(null);

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

  useFrame(() => {
    if (chatRef.current) chatRef.current.lookAt(10000, 10000, 10000);
    if (nameRef.current) nameRef.current.lookAt(10000, 10000, 10000);
  });
  return (
    <>
      <Billboard
        ref={chatRef}
        position={[position.x, position.y + 4.5, position.z]}
      >
        <Text font={"/NotoSansKR-Regular.ttf"} fontSize={0.25} color={0x000000}>
          {`"으으 오늘도 야근이라니..."`}
        </Text>
      </Billboard>
      <Billboard
        ref={nameRef}
        position={[position.x, position.y + 4, position.z]}
      >
        <Text font={"/NotoSansKR-Regular.ttf"} fontSize={0.4} color={0xdd125a}>
          {`야근 좀비`}
        </Text>
      </Billboard>
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
    </>
  );
};
