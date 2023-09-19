import { useRecoilState, useRecoilValue } from "recoil";
import {
  CharacterSelectFinishedAtom,
  CurrentMapAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
  PlayersAtom,
} from "../../store/PlayersAtom";
import { Floor } from "../structures/ground/Floor";
import { Man } from "../players/Man";
import {
  Billboard,
  Line,
  OrbitControls,
  Select,
  Text,
} from "@react-three/drei";
// import { PlayStructure } from "../structures/ground/PlayStructure";
import { Slide } from "../structures/ground/Slide";
import { JungleGym } from "../structures/ground/JungleGym";
import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { CharacterInit } from "../CharacterInit";
import { Loader } from "../utilComponents/Loader";
import { Vector3 } from "three";
import { Swing } from "../structures/ground/Swing";
import { MyRoom } from "../structures/myRoom";

export const Playground = () => {
  const [currentMap] = useRecoilState(CurrentMapAtom);
  const [characterSelectFinished] = useRecoilState(CharacterSelectFinishedAtom);
  const playerGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector
  );

  const [players] = useRecoilState(PlayersAtom);
  const camera = useThree((three) => three.camera);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);
  console.log("controls", controls);
  useEffect(() => {
    if (!controls.current?.target) return;
    camera.position.set(8, 8, 8);
  }, [camera, camera.position, characterSelectFinished]);

  useEffect(() => {
    camera.position.set(14, 14, 14);
  }, [camera.position, currentMap]);

  console.log(
    "playerGroundStructuresFloorPlaneCorners",
    playerGroundStructuresFloorPlaneCorners
  );

  return (
    <>
      <ambientLight name="ambientLight" intensity={1} />

      {/* <PositionalAudio
        position={[0, 0, 0]}
        autoplay
        url="/bgm.mp3"
        distance={1000}
        loop
      /> */}
      <OrbitControls ref={controls} minDistance={5} maxDistance={20} />
      {currentMap === "GROUND" && (
        <>
          <directionalLight
            castShadow
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
          {!characterSelectFinished && <CharacterInit />}
          {characterSelectFinished && (
            <>
              <Select>
                <Floor />
              </Select>
              <Swing />
              <Slide />
              <JungleGym />
              {playerGroundStructuresFloorPlaneCorners.map((corner) => {
                return (
                  <Line
                    color="red"
                    points={corner.corners.map((c) => [c.x, 0.01, c.z])}
                  />
                );
              })}

              <Suspense fallback={<Loader />}>
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
              </Suspense>
            </>
          )}
        </>
      )}
      {currentMap === "MY_ROOM" && (
        <>
          <directionalLight castShadow intensity={1} position={[0, 5, 5]} />
          <MyRoom />
        </>
      )}
    </>
  );
};
