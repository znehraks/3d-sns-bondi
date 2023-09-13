import { Environment } from "@react-three/drei";

import { useRecoilState } from "recoil";
import { PlayersAtom } from "../store/PlayersAtom";
import { Floor } from "./Floor";
import { Man } from "./Man";
import { Vector3 } from "three";
export const Playground = () => {
  const [players] = useRecoilState(PlayersAtom);
  console.log("players", players);
  return (
    <>
      <Environment preset="city" />
      <ambientLight name="ambientLight" intensity={0.5} />

      <directionalLight
        castShadow
        receiveShadow
        intensity={10}
        position={[0, 50, -50]}
        shadow-normalBias={0.1}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
      />

      <Floor />
      <mesh castShadow>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      {players.map((player) => (
        <Man
          key={player.id}
          position={
            new Vector3(
              player.position[0],
              player.position[1],
              player.position[2]
            )
          }
          hairColor={player.hairColor}
          topColor={player.topColor}
          bottomColor={player.bottomColor}
        />
      ))}
    </>
  );
};
