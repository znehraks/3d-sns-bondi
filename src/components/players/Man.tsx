/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/Hoodie Character.glb -o src/components/Man.jsx -r public 
*/

import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useGraph, useThree } from "@react-three/fiber";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMyRoomPlayerAtom,
  IPlayer,
  MeAtom,
  PlayerGroundStructuresFloorPlaneCornersSelector,
} from "../../store/PlayersAtom";
import { calculateMinimapPosition } from "../../utils";

interface IMan {
  player?: IPlayer;
  hairColor: string;
  shirtColor: string;
  pantsColor: string;
  position: THREE.Vector3;
}
export function Man({
  player,
  hairColor,
  shirtColor,
  pantsColor,
  position,
}: IMan) {
  const playerId = player?.id;
  const [, setCurrentMyRoomPlayer] = useRecoilState(CurrentMyRoomPlayerAtom);
  const playerGroundStructuresFloorPlaneCorners = useRecoilValue(
    PlayerGroundStructuresFloorPlaneCornersSelector
  );

  const memoizedPosition = useMemo(
    () => position,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const group = useRef<THREE.Group>(null);
  const threeScene = useThree((three) => three.scene);
  const point = document.getElementById(`player-point-${playerId}`);
  const nicknameBillboard = threeScene.getObjectByName(
    `nickname-billboard-${playerId}`
  );
  const me = useRecoilValue(MeAtom);

  const { scene, materials, animations } = useGLTF(
    "/models/Hoodie Character.glb"
  ) as GLTF & { materials: { [key: string]: THREE.MeshStandardMaterial } };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clone = useMemo(() => SkeletonUtils.clone(scene), []);
  const objectMap = useGraph(clone);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodes = objectMap.nodes as any;
  const [animation, setAnimation] = useState("CharacterArmature|Idle");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[animation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [actions, animation]);
  // const clock = new THREE.Clock();

  useFrame(({ camera }) => {
    if (!group.current) return;
    if (group.current.position.distanceTo(position) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(position)
        .normalize()
        .multiplyScalar(0.04);
      group.current.position.sub(direction);
      group.current.lookAt(position);
      // api.position.copy(group.current.position);
      // api.quaternion.copy(group.current.quaternion);

      if (point) {
        point.style.transform = `translate(
          ${calculateMinimapPosition(group.current.position).x}px,
          ${calculateMinimapPosition(group.current.position).y}px
          )`;
      }

      setAnimation("CharacterArmature|Run");
    } else {
      setAnimation("CharacterArmature|Idle");
    }
    if (nicknameBillboard) {
      nicknameBillboard.position.set(
        group.current.position.x,
        group.current.position.y + 2,
        group.current.position.z
      );
      nicknameBillboard.lookAt(10000, 10000, 10000);
    }
    if (
      me?.id !== undefined &&
      player?.id !== undefined &&
      me?.id === playerId
    ) {
      camera.position.set(
        group.current.position.x + 12,
        group.current.position.y + 12,
        group.current.position.z + 12
      );
      camera.lookAt(group.current.position);

      playerGroundStructuresFloorPlaneCorners.filter((structure) => {
        if (group.current) {
          if (
            group.current.position.x < structure.corners[0].x &&
            group.current.position.x > structure.corners[2].x &&
            group.current.position.z < structure.corners[0].z &&
            group.current.position.z > structure.corners[2].z
          ) {
            console.info("에 들어옴");
          }
        }
      });
    }
  });
  return (
    <>
      <group
        ref={group}
        position={memoizedPosition}
        dispose={null}
        name={playerId ?? ""}
        onClick={(e) => {
          e.stopPropagation();
          if (me?.id !== playerId) {
            setCurrentMyRoomPlayer(player);
          }
        }}
      >
        <group name="Root_Scene">
          <group name="RootNode">
            <group
              name="CharacterArmature"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <primitive object={nodes.Root} />
            </group>
            <group
              name="Casual_Feet"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Feet_1"
                geometry={nodes.Casual_Feet_1.geometry}
                material={materials.White}
                skeleton={nodes.Casual_Feet_1.skeleton}
              >
                {/* <meshStandardMaterial color="red" /> */}
              </skinnedMesh>
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Feet_2"
                geometry={nodes.Casual_Feet_2.geometry}
                material={materials.Purple}
                skeleton={nodes.Casual_Feet_2.skeleton}
              >
                {/* <meshStandardMaterial color="red" /> */}
              </skinnedMesh>
            </group>
            <group
              name="Casual_Legs"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Legs_1"
                geometry={nodes.Casual_Legs_1.geometry}
                material={materials.Skin}
                skeleton={nodes.Casual_Legs_1.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Legs_2"
                geometry={nodes.Casual_Legs_2.geometry}
                material={materials.LightBlue}
                skeleton={nodes.Casual_Legs_2.skeleton}
              >
                <meshStandardMaterial color={pantsColor} />
              </skinnedMesh>
            </group>
            <group
              name="Casual_Head"
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Head_1"
                geometry={nodes.Casual_Head_1.geometry}
                material={materials.Skin}
                skeleton={nodes.Casual_Head_1.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Head_2"
                geometry={nodes.Casual_Head_2.geometry}
                material={materials.Eyebrows}
                skeleton={nodes.Casual_Head_2.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Head_3"
                geometry={nodes.Casual_Head_3.geometry}
                material={materials.Eye}
                skeleton={nodes.Casual_Head_3.skeleton}
              />
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Head_4"
                geometry={nodes.Casual_Head_4.geometry}
                material={materials.Hair}
                skeleton={nodes.Casual_Head_4.skeleton}
              >
                <meshStandardMaterial color={hairColor} />
              </skinnedMesh>
            </group>
            <group
              name="Casual_Body"
              position={[0, 0.007, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            >
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Body_1"
                geometry={nodes.Casual_Body_1.geometry}
                material={materials.Purple}
                skeleton={nodes.Casual_Body_1.skeleton}
              >
                <meshStandardMaterial color={shirtColor} />
              </skinnedMesh>
              <skinnedMesh
                castShadow
                receiveShadow
                name="Casual_Body_2"
                geometry={nodes.Casual_Body_2.geometry}
                material={materials.Skin}
                skeleton={nodes.Casual_Body_2.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/Hoodie Character.glb");
