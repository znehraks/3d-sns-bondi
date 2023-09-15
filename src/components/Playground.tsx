import { useRecoilState } from "recoil";
import { CharacterSelectFinishedAtom, PlayersAtom } from "../store/PlayersAtom";
import { Floor } from "./Floor";
import { Man } from "./Man";
import { OrbitControls, Select } from "@react-three/drei";
import { PlayStructure } from "./PlayStructure";
import { Slide } from "./Slide";
import { JungleGym } from "./JungleGym";
import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { CharacterInit } from "./CharacterInit";

export const Playground = () => {
  const [characterSelectFinished] = useRecoilState(CharacterSelectFinishedAtom);

  const [players] = useRecoilState(PlayersAtom);
  const camera = useThree((three) => three.camera);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);

  useEffect(() => {
    if (!controls.current?.target) return;
    camera.position.set(8, 8, 8);
    controls.current.target.set(0, 0, 0);
  }, [camera, camera.position, characterSelectFinished]);

  return (
    <>
      {/* <Environment preset="sunset" /> */}
      <ambientLight name="ambientLight" intensity={5} />

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

      {/* <PositionalAudio
        position={[0, 0, 0]}
        autoplay
        url="/bgm.mp3"
        distance={1000}
        loop
      /> */}
      {!characterSelectFinished && <CharacterInit />}
      {characterSelectFinished && (
        <>
          <Select>
            <Floor />
          </Select>
          {/* 
      <Torus
        args={[0.3, 0.03, 2]}
        position={[player?.position.x, player?.position.y, player?.position.z]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color={"green"} opacity={0} />
      </Torus> */}
          {/* <Text color={"lime"}>hasdsasdaasdssaia</Text> */}
          <PlayStructure />
          <Slide />
          <JungleGym />
          <OrbitControls
            ref={controls}
            minDistance={5}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            screenSpacePanning={false}
          />
          {players.map((player) => (
            <Suspense>
              <Man
                key={player.id}
                playerId={player.id}
                position={[
                  player.position[0],
                  player.position[1],
                  player.position[2],
                ]}
                hairColor={player.hairColor}
                shirtColor={player.topColor}
                pantsColor={player.bottomColor}
              />
            </Suspense>
          ))}
        </>
      )}
    </>
  );
};
