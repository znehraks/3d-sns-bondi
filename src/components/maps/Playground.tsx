import { useRecoilState } from "recoil";
import {
  CharacterSelectFinishedAtom,
  CurrentMapAtom,
  PlayersAtom,
} from "../../store/PlayersAtom";
import { Floor } from "../structures/Floor";
import { Man } from "../players/Man";
import { Billboard, OrbitControls, Select, Text } from "@react-three/drei";
import { PlayStructure } from "../structures/PlayStructure";
import { Slide } from "../structures/Slide";
import { JungleGym } from "../structures/JungleGym";
import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { CharacterInit } from "../CharacterInit";
import { Loader } from "../utilComponents/Loader";
import { Vector3 } from "three";

export const Playground = () => {
  const [currentMap] = useRecoilState(CurrentMapAtom);
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
  console.log("players", players);
  return (
    <Suspense fallback={<Loader />}>
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
      {currentMap === "GROUND" && (
        <>
          {!characterSelectFinished && <CharacterInit />}
          {characterSelectFinished && (
            <>
              <Select>
                <Floor />
              </Select>
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

              {players.map((player) => {
                return (
                  <>
                    <Billboard
                      position={[
                        player.position[0],
                        player.position[1] + 2,
                        player.position[2],
                      ]}
                      name={`nickname-billboard-${player.id}`}
                    >
                      <Text
                        font={"/NotoSansKR-Regular.ttf"}
                        fontSize={0.25}
                        color={0x000000}
                      >
                        {`${player.nickname}[${player.jobPosition}]`}
                      </Text>
                    </Billboard>
                    <Man
                      key={player.id}
                      playerId={player.id}
                      position={
                        new Vector3(
                          player.position[0],
                          player.position[1],
                          player.position[2]
                        )
                      }
                      hairColor={player.hairColor}
                      shirtColor={player.shirtColor}
                      pantsColor={player.pantsColor}
                    />
                  </>
                );
              })}
            </>
          )}
        </>
      )}
      {currentMap === "MY_ROOM" && <></>}
    </Suspense>
  );
};
