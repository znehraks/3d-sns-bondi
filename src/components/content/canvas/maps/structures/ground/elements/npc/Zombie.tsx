import { Billboard, Text, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PlayGroundStructuresBoundingBoxAtom,
  PlayerInventoryAtom,
  PlayerCompletedQuestsAtom,
} from "../../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Mesh, Vector3 } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useAnimatedText } from "../../../../../../../hooks/useAnimatedText";

const name = "ground-npc-zombie";
export const Zombie = () => {
  const ref = useRef<Mesh>(null);
  const [text, setText] = useState("으으 오늘도 야근이라니...    ");
  const { displayText } = useAnimatedText(text);

  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );

  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom);

  const [playerCompletedQuests, setPlayerCompletedQuests] = useRecoilState(
    PlayerCompletedQuestsAtom
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nameRef = useRef<any>(null);

  const { scene, animations } = useGLTF("/models/Zombie.glb");
  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-5, 0, -6), []);
  const [currentAnimation, setCurrentAnimation] = useState(
    "EnemyArmature|EnemyArmature|EnemyArmature|Attack"
  );

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    actions[currentAnimation]?.play().setDuration(0.8);
    return () => {
      actions[currentAnimation]?.stop();
    };
  }, [
    actions,
    currentAnimation,
    position,
    scene,
    setPlayGroundStructuresBoundingBox,
  ]);

  useFrame(() => {
    if (chatRef.current) chatRef.current.lookAt(10000, 10000, 10000);
    if (nameRef.current) nameRef.current.lookAt(10000, 10000, 10000);
    if (!ref.current) return;
    if (playerCompletedQuests.includes("zombie")) {
      ref.current.lookAt(-50, 0, -50);
      ref.current.position.x -= 0.02;
      ref.current.position.z -= 0.02;

      chatRef.current.position.x -= 0.02;
      chatRef.current.position.z -= 0.02;

      nameRef.current.position.x -= 0.02;
      nameRef.current.position.z -= 0.02;
    }
    if (ref.current.position.x >= 50 || ref.current.position.z >= 50) {
      ref.current.visible = false;
    }
  });
  return (
    <>
      <Billboard
        ref={chatRef}
        position={[position.x, position.y + 4.5, position.z]}
      >
        <Text font={"/NotoSansKR-Regular.ttf"} fontSize={0.25} color={0x000000}>
          {displayText}
        </Text>
      </Billboard>
      <Billboard
        ref={nameRef}
        position={[position.x, position.y + 4, position.z]}
      >
        <Text font={"/NotoSansKR-Regular.ttf"} fontSize={0.4} color={0xff71c2}>
          {`야근 좀비`}
        </Text>
      </Billboard>
      <primitive
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          if (playerInventory.includes("ticket")) {
            alert("야근좀비를 퇴근시켰습니다!");
            setText("드디어 퇴근이다!!!     ");
            setCurrentAnimation(
              "EnemyArmature|EnemyArmature|EnemyArmature|Run"
            );
            setPlayerInventory((prev) =>
              prev.filter((item) => item !== "ticket")
            );
            setPlayerCompletedQuests((prev) => [...prev, "zombie"]);
          } else {
            alert("보물상자에서 퇴근권을 찾아주세요!");
          }
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
