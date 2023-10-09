import { useEffect, useState } from "react";
import { calculateMinimapPosition } from "../../../../../../utils";
import { useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRecoilValue } from "recoil";
import {
  CurrentMapAtom,
  IPlayer,
  MeAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
} from "../../../../../../store/PlayersAtom";
import * as THREE from "three";
import gsap from "gsap";
export const usePlayer = ({
  player,
  position,
  scene,
  playerRef,
  animations,
}: {
  player: IPlayer | undefined;
  position: THREE.Vector3;
  scene: THREE.Group<THREE.Object3DEventMap>;
  animations: THREE.AnimationClip[];
  playerRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
}) => {
  const playerId = player?.id;
  const me = useRecoilValue(MeAtom);
  const currentMap = useRecoilValue(CurrentMapAtom);
  const playerGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector
  );
  const { scene: threeScene } = useThree();

  const point = document.getElementById(`player-point-${playerId}`);
  const objectInteractionDiv = document.getElementById("object-interaction");

  const nicknameBillboard = threeScene.getObjectByName(
    `nickname-billboard-${playerId}`
  );
  const chatBuubleBoard = threeScene.getObjectByName(
    `chat-bubble-billboard-${playerId}`
  );
  const [animation, setAnimation] = useState(
    "CharacterArmature|CharacterArmature|CharacterArmature|Idle"
  );
  const { actions } = useAnimations(animations, playerRef);
  useEffect(() => {
    if (!playerRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scene.traverse((mesh: any) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
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
  }, [currentMap, me?.id, playerId, playerRef, scene]);

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
    if (nicknameBillboard) {
      nicknameBillboard.position.set(
        playerRef.current.position.x,
        playerRef.current.position.y + 3.5,
        playerRef.current.position.z
      );
      nicknameBillboard.lookAt(10000, 10000, 10000);
    }
    if (chatBuubleBoard) {
      chatBuubleBoard.position.set(
        playerRef.current.position.x,
        playerRef.current.position.y + 4,
        playerRef.current.position.z
      );
      chatBuubleBoard.lookAt(10000, 10000, 10000);
    }

    if (
      me?.id !== undefined &&
      player?.id !== undefined &&
      me?.id === playerId
    ) {
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
};
