import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useRecoilValue } from "recoil";
import { SelectedCharacterGlbNameIndexAtom } from "../../../store/PlayersAtom";
import { Man } from "../canvas/maps/player/Man";
import { Woman } from "../canvas/maps/player/Woman";
import { Kid } from "../canvas/maps/player/Kid";
// import { CubeMan } from "./players/CubeMan";
// import { CubeWoman } from "./players/CubeWoman";

export const CharacterInit = () => {
  const camera = useThree((three) => three.camera);
  const selectedCharacterGlbNameIndex = useRecoilValue(
    SelectedCharacterGlbNameIndexAtom
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);
  useEffect(() => {
    if (!controls.current?.target) return;
    camera.position.set(8, 8, 8);
    controls.current.target.set(0, 1, 0);
  }, [camera.position]);
  return (
    <>
      {selectedCharacterGlbNameIndex === 0 && (
        <Man
          player={undefined}
          position={new Vector3(0, 0, 0)}
          modelIndex={0}
        />
      )}
      {selectedCharacterGlbNameIndex === 1 && (
        <Woman
          player={undefined}
          position={new Vector3(0, 0, 0)}
          modelIndex={1}
        />
      )}
      {selectedCharacterGlbNameIndex === 2 && (
        <Kid
          player={undefined}
          position={new Vector3(0, 0, 0)}
          modelIndex={2}
        />
      )}

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
