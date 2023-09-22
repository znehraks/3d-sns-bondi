import { useRecoilState, useRecoilValue } from "recoil";
import {
  CharacterSelectFinishedAtom,
  ChatsAtom,
  CurrentMapAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
  PlayersAtom,
} from "../../store/PlayersAtom";
import { Man } from "../players/Man";
import { Billboard, Line, OrbitControls, Text } from "@react-three/drei";
// import { PlayStructure } from "../structures/ground/PlayStructure";
import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { CharacterInit } from "../CharacterInit";
import { Loader } from "../utilComponents/Loader";
import { Vector3 } from "three";
import { MyRoom } from "../structures/myRoom";
import { GroundElements } from "../structures/ground";
import _ from "lodash";
import { MiniGame } from "../structures/miniGame";

export const Playground = () => {
  const [currentMap] = useRecoilState(CurrentMapAtom);
  const chats = useRecoilValue(ChatsAtom);
  const [characterSelectFinished] = useRecoilState(CharacterSelectFinishedAtom);
  const playerGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector
  );

  const [players] = useRecoilState(PlayersAtom);

  const camera = useThree((three) => three.camera);

  const scene = useThree((three) => three.scene);
  console.log("scene", scene);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);

  useEffect(() => {
    if (currentMap === "GROUND") {
      if (!controls.current) return;
      camera.position.set(14, 14, 14);
      controls.current.target.set(0, 0, 0);
      return;
    }

    if (currentMap === "MY_ROOM") {
      if (!controls.current) return;
      camera.position.set(14, 14, 14);
      controls.current.target.set(0, 0, 0);
      return;
    }

    if (currentMap === "MINI_GAME") {
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, -10);
      return;
    }
    console.log(4);
  }, [camera, camera.position, currentMap]);

  console.log("players", players);
  console.log("controls", controls);
  console.log("camera", camera);

  const reversedChats = useMemo(() => {
    return _.uniqBy([...chats].reverse(), "senderId");
  }, [chats]);

  return (
    <>
      <ambientLight
        name="ambientLight"
        intensity={currentMap === "GROUND" ? 5 : 0.5}
      />

      {/* <PositionalAudio
        position={[0, 0, 0]}
        autoplay
        url="/bgm.mp3"
        distance={1000}
        loop
      /> */}

      {currentMap !== "MINI_GAME" && (
        <OrbitControls
          ref={controls}
          minDistance={5}
          maxDistance={1000}
          maxPolarAngle={currentMap === "MY_ROOM" ? Math.PI / 2 : Math.PI}
          maxAzimuthAngle={currentMap === "MY_ROOM" ? Math.PI / 2 : Infinity}
          minAzimuthAngle={currentMap === "MY_ROOM" ? 0 : -Infinity}
        />
      )}

      {currentMap === "GROUND" && (
        <Suspense fallback={<Loader />}>
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
              <GroundElements />
              {playerGroundStructuresFloorPlaneCorners?.map((corner) => {
                return (
                  <Line
                    key={corner.name}
                    color="red"
                    points={corner.corners.map((c) => [c.x, 0.01, c.z])}
                  />
                );
              })}

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
                      player={player}
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
              {reversedChats.map((chat) => {
                const player = players
                  .filter((p) => p.id === chat.senderId)
                  ?.at(-1);

                if (!player) return null;
                return (
                  <>
                    <Text
                      name={`chat-text-${player.id}`}
                      rotation-y={Math.PI / 4}
                      position={[
                        player.position[0] + 1,
                        player.position[1] + 3,
                        player.position[2],
                      ]}
                      font={"/NotoSansKR-Regular.ttf"}
                      fontSize={0.2}
                      fillOpacity={2}
                      color={0x33df3f}
                      overflowWrap="break-word"
                      maxWidth={1.6}
                      userData={{ timestamp: chat.timestamp }}
                    >
                      {`${chat.text}`}
                    </Text>
                  </>
                );
              })}
            </>
          )}
        </Suspense>
      )}
      {currentMap === "MY_ROOM" && (
        <Suspense fallback={<Loader />}>
          <directionalLight castShadow intensity={0.6} position={[0, 5, 5]} />
          <spotLight castShadow intensity={8} position={[-1, 5, -1]} />
          <MyRoom />
        </Suspense>
      )}
      {currentMap === "MINI_GAME" && <MiniGame />}
    </>
  );
};
