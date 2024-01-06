import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PlayerInventoryAtom,
  PlayerCompletedQuestsAtom,
} from "../../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Mesh, Vector3 } from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useAnimatedText } from "../../../../../../../hooks/useAnimatedText";
import { Textboard } from "../../3dUIs/Textboard";

const name = "ground-npc-zombie";
export const Zombie = () => {
  const ref = useRef<Mesh>(null);
  const [text, setText] = useState("으으 오늘도 야근이라니...    ");
  const { displayText } = useAnimatedText(text);

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
    if (!ref.current) return;
    nameRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4,
      ref.current.position.z
    );
    chatRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4.5,
      ref.current.position.z
    );
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    actions[currentAnimation]?.play().setDuration(0.8);
    return () => {
      actions[currentAnimation]?.stop();
    };
  }, [actions, currentAnimation, position, scene]);

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
      <Textboard ref={chatRef} text={displayText} />
      <Textboard ref={nameRef} text="야근좀비" isNpc />
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
