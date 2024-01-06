import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  PlayerCompletedQuestsAtom,
  PlayerInventoryAtom,
} from "../../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Mesh, Vector3 } from "three";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useAnimatedText } from "../../../../../../../hooks/useAnimatedText";
import { Textboard } from "../../3dUIs/Textboard";

const name = "ground-shiba-inu";
export const ShibaInu = () => {
  const ref = useRef<Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nameRef = useRef<any>(null);
  const [text, setText] = useState("멍멍! 내 고기가 어디갔지..?   ");

  const { displayText } = useAnimatedText(text);

  const threeScene = useThree((three) => three.scene);
  const [playerInventory, setPlayerInventory] =
    useRecoilState(PlayerInventoryAtom);

  const [playerCompletedQuests, setPlayerCompletedQuests] = useRecoilState(
    PlayerCompletedQuestsAtom
  );
  const { scene, animations } = useGLTF("/models/Shiba Inu.glb");
  const { actions } = useAnimations(animations, ref);
  const position = useMemo(() => new Vector3(-1, 0, 21), []);
  useEffect(() => {
    if (!ref.current) return;
    nameRef.current.position.set(
      ref.current.position.x,
      ref.current.position.y + 4,
      ref.current.position.z
    );
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
    let animation: gsap.core.Tween;
    if (playerCompletedQuests.includes("dog")) {
      setText("멍멍! 고마워!   ");
      actions["Walk"]?.stop();
      actions["Eating"]?.play();
      ref.current?.lookAt(3, 0, 21);
      const steak = threeScene.getObjectByName("ground-steak");
      if (steak) {
        steak.visible = true;
        steak?.position.set(
          ref.current.position.x + 1,
          0,
          ref.current.position.z
        );
      }
    } else {
      actions["Walk"]?.play();
      animation = gsap.to(ref.current.position, {
        duration: 5,
        yoyo: true,
        repeat: -1,
        x: 3,
        ease: "linear",
        onUpdate: () => {
          const progress = animation.progress();
          if (Math.abs(progress) < 0.01) {
            ref.current?.lookAt(3, 0, 21);
          } else if (Math.abs(progress) > 0.99) {
            ref.current?.lookAt(-1, 0, 21);
          }
        },
      });
      animation.play();
    }

    return () => {
      animation.pause();
    };
  }, [actions, playerCompletedQuests, position, scene, threeScene]);

  useFrame(() => {
    if (!ref.current) return;
    if (chatRef.current) {
      chatRef.current.position.set(
        ref.current.position.x,
        ref.current.position.y + 3.5,
        ref.current.position.z
      );
      chatRef.current.lookAt(10000, 10000, 10000);
    }
    if (nameRef.current) {
      nameRef.current.position.set(
        ref.current.position.x,
        ref.current.position.y + 3,
        ref.current.position.z
      );
      nameRef.current.lookAt(10000, 10000, 10000);
    }
  });

  return (
    <>
      <Textboard ref={chatRef} text={displayText} />
      <Textboard ref={nameRef} text="댕댕이" isNpc />
      <primitive
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          if (playerInventory.includes("food")) {
            alert("강아지에게 고기를 주었습니다. 강아지가 당신을 좋아합니다.");
            setPlayerInventory((prev) =>
              prev.filter((item) => item !== "food")
            );
            setPlayerCompletedQuests((prev) => [...prev, "dog"]);
          } else {
            alert("강아지에게 먹일 고기를 갖다주세요.");
          }
        }}
        scale={0.7}
        ref={ref}
        visible
        name={name}
        position={position}
        rotation-y={Math.PI / 1.5}
        object={scene}
      />
    </>
  );
};
