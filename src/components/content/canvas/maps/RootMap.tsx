import { useRecoilState, useRecoilValue } from "recoil";
import {
  CharacterSelectFinishedAtom,
  CurrentMapAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
  PlayersAtom,
  RecentChatsSelector,
} from "../../../../store/PlayersAtom";
import { Man } from "./players/Man";
import { Line, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
// import { PlayStructure } from "../structures/ground/PlayStructure";
import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { CharacterInit } from "../../lobby/CharacterInit";
import { Loader } from "../../loader/Loader";
import { Vector3 } from "three";
import { MyRoom } from "./structures/myRoom";
import { GroundElements } from "./structures/ground";
import { MiniGame } from "./structures/miniGame";
import gsap from "gsap";
import { NicknameBoard } from "./structures/ground/3dUIs/NicknameBoard";
import { ChatBubble } from "./structures/ground/3dUIs/ChatBubble";
// import { GsapTest } from "../test/GsapTest";

export const RootMap = () => {
  // const backgroundTexture = useTexture("./images/scene_map.jpeg");
  const [currentMap] = useRecoilState(CurrentMapAtom);
  const recentChats = useRecoilValue(RecentChatsSelector);
  const [characterSelectFinished] = useRecoilState(CharacterSelectFinishedAtom);
  const playerGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector
  );

  const [players] = useRecoilState(PlayersAtom);

  const camera = useThree((three) => three.camera);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = useRef<any>(null);

  // useEffect(() => {
  //   backgroundTexture.mapping = EquirectangularReflectionMapping;
  //   scene.background = backgroundTexture;
  // }, [backgroundTexture, scene]);

  console.log("recentChats", recentChats);
  useEffect(() => {
    if (currentMap === "GROUND") {
      document.exitPointerLock();
      if (!controls.current) return;

      camera.position.set(14, 14, 14);
      controls.current.target.set(0, 0, 0);
      return;
    }

    if (currentMap === "MY_ROOM") {
      if (!controls.current) return;
      gsap.fromTo(
        camera.position,
        {
          duration: 1,
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 25,
          y: 25,
          z: 25,
        }
      );

      // camera.position.set(14, 14, 14);
      // controls.current.target.set(0, 0, 0);
      return;
    }

    if (currentMap === "MINI_GAME") {
      camera.position.set(10, 1, 10);
      camera.lookAt(0, 0, 0);
      return;
    }
  }, [camera, camera.position, currentMap]);

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
          {/* <GsapTest /> */}
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
                    <ChatBubble
                      key={player.id}
                      player={player}
                      chat={recentChats.find(
                        (recentChat) => recentChat.senderId === player.id
                      )}
                    />
                    <NicknameBoard player={player} />
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
            </>
          )}
        </Suspense>
      )}
      {currentMap === "MY_ROOM" && (
        <Suspense fallback={<Loader />}>
          <MyRoom />
        </Suspense>
      )}
      {currentMap === "MINI_GAME" && <MiniGame />}
    </>
  );
};

useGLTF.preload("/models/furniture-bed.glb");
useGLTF.preload("/models/furniture-bookcase.glb");
useGLTF.preload("/models/furniture-chair.glb");
useGLTF.preload("/models/furniture-coatRack.glb");
useGLTF.preload("/models/furniture-couch.glb");
useGLTF.preload("/models/furniture-gamingComputer.glb");
useGLTF.preload("/models/furniture-officeChair.glb");
useGLTF.preload("/models/furniture-standingDesk.glb");

useTexture.preload("/images/furnitures/furniture-bed");
useTexture.preload("/images/furnitures/furniture-bookcase");
useTexture.preload("/images/furnitures/furniture-chair");
useTexture.preload("/images/furnitures/furniture-coatRack");
useTexture.preload("/images/furnitures/furniture-couch");
useTexture.preload("/images/furnitures/furniture-gamingComputer");
useTexture.preload("/images/furnitures/furniture-officeChair");
useTexture.preload("/images/furnitures/furniture-standingDesk");