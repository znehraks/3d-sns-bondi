import { Billboard, Text, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { PlayGroundStructuresBoundingBoxAtom } from "../../../../../../../../store/PlayersAtom";
import { useRecoilState } from "recoil";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useAnimatedText } from "../../../../../../../hooks/useAnimatedText";

const name = "ground-npc-dinosaur";
const text = "나는 무서운 육식 공룡이야..! 크아앙~   ";
export const Dinosaur = () => {
  const { displayText } = useAnimatedText(text);
  const [, setPlayGroundStructuresBoundingBox] = useRecoilState(
    PlayGroundStructuresBoundingBoxAtom
  );
  const { scene } = useGLTF("/models/CuteRedDino.glb");
  const position = useMemo(() => new Vector3(0, 0, -5), []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nameRef = useRef<any>(null);

  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene, setPlayGroundStructuresBoundingBox]);

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
          {displayText}
        </Text>
      </Billboard>
      <Billboard
        ref={nameRef}
        position={[position.x, position.y + 4, position.z]}
      >
        <Text font={"/NotoSansKR-Regular.ttf"} fontSize={0.4} color={0xff71c2}>
          {`디노`}
        </Text>
      </Billboard>
      <primitive
        visible
        name={name}
        scale={2}
        position={position}
        object={scene}
      />
    </>
  );
};
