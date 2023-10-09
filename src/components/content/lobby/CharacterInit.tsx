import { OrbitControls } from "@react-three/drei";
import { Man } from "../canvas/maps/players/NewMan";
import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useRecoilValue } from "recoil";
import { SelectedCharacterGlbNameIndexAtom } from "../../../store/PlayersAtom";
import { characterGlbNameCandidates } from "../../../data/constants";
// import { CubeMan } from "./players/CubeMan";
// import { CubeWoman } from "./players/CubeWoman";

export const CharacterInit = () => {
  const camera = useThree((three) => three.camera);
  const selectedCharacterGlbName = useRecoilValue(
    SelectedCharacterGlbNameIndexAtom
  );

  console.log("selectedCharacterGlbName", selectedCharacterGlbName);
  const currentGlbName = useMemo(() => {
    return characterGlbNameCandidates[selectedCharacterGlbName ?? 0];
  }, [selectedCharacterGlbName]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);
  useEffect(() => {
    if (!controls.current?.target) return;
    camera.position.set(8, 8, 8);
    controls.current.target.set(0, 1, 0);
  }, [camera.position]);
  return (
    <>
      <Man
        player={undefined}
        position={new Vector3(0, 0, 0)}
        currentGlbName={currentGlbName}
      />
      <OrbitControls
        ref={controls}
        minDistance={1}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={-Math.PI / 2}
        autoRotate
      />
    </>
  );
};
