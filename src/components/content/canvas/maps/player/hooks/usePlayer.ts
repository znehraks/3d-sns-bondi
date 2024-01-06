import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useGraph, useThree } from "@react-three/fiber";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMapAtom,
  CurrentMyRoomPlayerAtom,
  IPlayer,
  MeAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
} from "../../../../../../store/PlayersAtom";
import { calculateMinimapPosition } from "../../../../../../utils";
import gsap from "gsap";

interface IUsePlayer {
  player?: IPlayer;
  position: THREE.Vector3;
  modelIndex: number;
}
export const usePlayer = ({ player, position, modelIndex }: IUsePlayer) => {
  const playerId = player?.id;
  const currentMap = useRecoilValue(CurrentMapAtom);
  const [, setCurrentMyRoomPlayer] = useRecoilState(CurrentMyRoomPlayerAtom);
  const playerGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector
  );
  const nicknameRef = useRef<THREE.Group>(null);

  const memoizedPosition = useMemo(
    () => position,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const point = document.getElementById(`player-point-${playerId}`);
  const objectInteractionDiv = document.getElementById("object-interaction");

  const playerRef = useRef<THREE.Group>(null);
  const { scene: threeScene } = useThree();
  const chatBubbleBoard = threeScene.getObjectByName(
    `chat-bubble-billboard-${playerId}`
  );

  const me = useRecoilValue(MeAtom);

  const { scene, materials, animations } = useGLTF(
    (() => {
      switch (modelIndex) {
        case 0:
          return `/models/CubeGuyCharacter.glb`;
        case 1:
          return `/models/CubeWomanCharacter.glb`;
        case 2:
          return `/models/Steve.glb`;
        default:
          return "";
      }
    })()
  ) as GLTF & {
    materials: { [key: string]: THREE.MeshStandardMaterial };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodes = objectMap.nodes as any;

  const [animation, setAnimation] = useState(
    "CharacterArmature|CharacterArmature|CharacterArmature|Idle"
  );
  const { actions } = useAnimations(animations, playerRef);

  useEffect(() => {
    if (!playerRef.current) return;
    if (me?.id === playerId && currentMap === "GROUND") {
      gsap.fromTo(
        playerRef.current.scale,
        {
          duration: 2,
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
        }
      );
    }
  }, [currentMap, me?.id, nodes, playerId, scene]);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [actions, animation]);

  // const clock = new THREE.Clock();

  // const tempVec3 = new THREE.Vector3();

  useFrame(({ camera }) => {
    if (!player) return;
    if (!playerRef.current) return;
    if (playerRef.current.position.distanceTo(position) > 0.1) {
      const direction = playerRef.current.position
        .clone()
        .sub(position)
        .normalize()
        .multiplyScalar(0.04);
      playerRef.current.position.sub(direction);
      playerRef.current.lookAt(position);

      if (point) {
        point.style.transform = `translate(
          ${calculateMinimapPosition(playerRef.current.position).x}px,
          ${calculateMinimapPosition(playerRef.current.position).y}px
          )`;
      }

      setAnimation("CharacterArmature|CharacterArmature|CharacterArmature|Run");
    } else {
      setAnimation(
        "CharacterArmature|CharacterArmature|CharacterArmature|Idle"
      );
    }
    if (nicknameRef.current) {
      nicknameRef.current.position.set(
        playerRef.current.position.x,
        playerRef.current.position.y + 3.5,
        playerRef.current.position.z
      );
      nicknameRef.current.lookAt(10000, 10000, 10000);
    }
    if (chatBubbleBoard) {
      chatBubbleBoard.position.set(
        playerRef.current.position.x,
        playerRef.current.position.y + 4,
        playerRef.current.position.z
      );
      chatBubbleBoard.lookAt(10000, 10000, 10000);
    }

    if (me?.id === playerId) {
      camera.position.set(
        playerRef.current.position.x + 12,
        playerRef.current.position.y + 12,
        playerRef.current.position.z + 12
      );
      camera.lookAt(playerRef.current.position);

      const currentCloseStructure =
        playerGroundStructuresFloorPlaneCorners.find((structure) => {
          return (
            playerRef.current!.position.x < structure.corners[0].x &&
            playerRef.current!.position.x > structure.corners[2].x &&
            playerRef.current!.position.z < structure.corners[0].z &&
            playerRef.current!.position.z > structure.corners[2].z
          );
        });
      if (currentCloseStructure) {
        if (objectInteractionDiv) {
          objectInteractionDiv.innerText = currentCloseStructure.name;
          objectInteractionDiv.style.display = "block";
          camera.lookAt(currentCloseStructure.position);
          camera.position.set(
            playerRef.current.position.x + 6,
            playerRef.current.position.y + 6,
            playerRef.current.position.z + 6
          );
        }
      } else {
        if (objectInteractionDiv) {
          objectInteractionDiv.innerText = "";
          objectInteractionDiv.style.display = "none";
        }
      }
    }
  });
  return {
    me,
    nicknameRef,
    playerRef,
    memoizedPosition,
    playerId,
    nodes,
    materials,
    setCurrentMyRoomPlayer,
  };
};
