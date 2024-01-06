import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { useAnimatedText } from "../../../../../../../hooks/useAnimatedText";
import { Textboard } from "../../3dUIs/Textboard";

const name = "ground-npc-dinosaur";
const text = "나는 무서운 육식 공룡이야..! 크아앙~   ";
export const Dinosaur = () => {
  const ref = useRef<Mesh>(null);
  const { displayText } = useAnimatedText(text);
  const { scene } = useGLTF("/models/CuteRedDino.glb");
  const position = useMemo(() => new Vector3(0, 0, -5), []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nameRef = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chatRef.current) chatRef.current.lookAt(10000, 10000, 10000);
    if (nameRef.current) nameRef.current.lookAt(10000, 10000, 10000);
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
  }, [position, scene]);

  return (
    <>
      <Textboard ref={chatRef} text={displayText} />
      <Textboard ref={nameRef} text="디노" isNpc />
      <primitive
        ref={ref}
        visible
        name={name}
        scale={2}
        position={position}
        object={scene}
      />
    </>
  );
};
