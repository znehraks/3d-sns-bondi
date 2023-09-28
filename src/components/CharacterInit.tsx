import { OrbitControls } from "@react-three/drei";
import { Man } from "./players/Man";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useRecoilState } from "recoil";
import {
  HairColorAtom,
  PantsColorAtom,
  ShirtColorAtom,
} from "../store/PlayersAtom";
import { Vector3 } from "three";
// import { CubeMan } from "./players/CubeMan";
// import { CubeWoman } from "./players/CubeWoman";

export const CharacterInit = () => {
  const camera = useThree((three) => three.camera);
  const [hairColor] = useRecoilState(HairColorAtom);
  const [shirtColor] = useRecoilState(ShirtColorAtom);
  const [pantsColor] = useRecoilState(PantsColorAtom);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);
  useEffect(() => {
    if (!controls.current?.target) return;
    camera.position.set(5, 5, 5);
    controls.current.target.set(0, 1, 0);
  }, [camera.position]);
  return (
    <>
      <Man
        player={undefined}
        position={new Vector3(0, 0, 0)}
        hairColor={hairColor}
        shirtColor={shirtColor}
        pantsColor={pantsColor}
      />
      {/* <CubeMan modelingType="man" /> */}
      <OrbitControls
        ref={controls}
        minDistance={1}
        maxDistance={5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={-Math.PI / 2}
        autoRotate
      />
    </>
  );
};
