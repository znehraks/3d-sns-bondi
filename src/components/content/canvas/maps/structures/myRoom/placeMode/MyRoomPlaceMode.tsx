import { useCallback, useMemo, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  CurrentMyRoomPlayerAtom,
  CurrentPlacingMyRoomFurnitureAtom,
  CurrentPlacingMyRoomMemoAtom,
  CurrentPlacingMyRoomSkillAtom,
} from "../../../../../../../store/PlayersAtom";
import {
  myRoomMemoBoxSize,
  myRoomSkillBoxSize,
} from "../../../../../../../data/constants";
import {
  usePlacementMode,
  emitRoomChange,
  PlacementResult,
  ObjectSize,
} from "./usePlacementMode";

// Surface filter for furniture placement
const FURNITURE_SURFACES = ["my-room-floor", "my-room-left-wall", "my-room-right-wall"];

interface PlaceModeProps {
  type: "furniture" | "memo" | "skill";
  itemName?: string;
}

/**
 * Unified placement mode component for furniture, memo, and skill items
 */
export const MyRoomPlaceMode = ({ type, itemName }: PlaceModeProps) => {
  switch (type) {
    case "furniture":
      return <FurniturePlacement itemName={itemName!} />;
    case "memo":
      return <MemoPlacement />;
    case "skill":
      return <SkillPlacement itemName={itemName!} />;
  }
};

/**
 * Furniture placement component
 */
function FurniturePlacement({ itemName }: { itemName: string }) {
  const { scene: threeScene } = useThree();
  const [, setCurrentPlacing] = useRecoilState(CurrentPlacingMyRoomFurnitureAtom);
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const { scene } = useGLTF(`/models/${itemName}.glb`);

  // Get existing object rotation if it exists
  const existingObject = threeScene.getObjectByName(`my-room-${itemName}`);
  const existingRotationY = existingObject?.rotation.y ?? 0;

  // Compute bounding box from model
  const objectSize = useMemo<ObjectSize>(() => {
    scene.traverse((obj) => {
      obj.userData.placing = true;
      if ((obj as THREE.Mesh).isMesh) {
        (obj as THREE.Mesh).geometry.computeBoundingBox();
      }
    });
    const boundingBox = new THREE.Box3().setFromObject(scene);
    return {
      width: boundingBox.max.x - boundingBox.min.x,
      height: -(boundingBox.min.y), // Height from floor
      depth: boundingBox.max.z - boundingBox.min.z,
    };
  }, [scene]);

  const handlePlace = useCallback(
    (result: PlacementResult) => {
      emitRoomChange(
        threeScene,
        `my-room-${itemName}`,
        {
          position: [result.position.x, result.position.y, result.position.z],
          rotation: [0, existingRotationY, 0],
        },
        currentMyRoomPlayer?.id,
        `my-room-${itemName}`
      );
    },
    [threeScene, itemName, currentMyRoomPlayer?.id, existingRotationY]
  );

  const handleComplete = useCallback(() => {
    setCurrentPlacing(undefined);
  }, [setCurrentPlacing]);

  const { meshRef } = usePlacementMode({
    objectSize,
    animationScale: { x: 1.1, y: 1.1, z: 1.1 },
    filterSurfaces: FURNITURE_SURFACES,
    onPlace: handlePlace,
    onComplete: handleComplete,
  });

  // Override default rotation behavior for furniture
  useEffect(() => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.rotation.set(0, existingRotationY, 0);
    }
  }, [meshRef, existingRotationY]);

  return (
    <primitive
      visible={false}
      name="placing"
      ref={meshRef}
      object={scene.clone()}
      scale={[1, 1, 1]}
    />
  );
}

/**
 * Memo placement component
 */
function MemoPlacement() {
  const [currentPlacingMemo, setCurrentPlacing] = useRecoilState(CurrentPlacingMyRoomMemoAtom);
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const { scene: threeScene } = useThree();

  const objectSize = useMemo<ObjectSize>(
    () => ({
      width: myRoomMemoBoxSize[0],
      height: myRoomMemoBoxSize[1],
      depth: myRoomMemoBoxSize[2],
    }),
    []
  );

  const handlePlace = useCallback(
    (result: PlacementResult) => {
      if (!currentPlacingMemo) return;

      const objectName = `my-room-memo-${currentPlacingMemo.authorNickname}-${currentPlacingMemo.timestamp}`;
      emitRoomChange(
        threeScene,
        objectName,
        {
          text: currentPlacingMemo.text,
          authorNickname: currentPlacingMemo.authorNickname,
          timestamp: currentPlacingMemo.timestamp,
          position: [result.position.x, result.position.y, result.position.z],
          rotation: [result.rotation.x, result.rotation.y, result.rotation.z],
        },
        currentMyRoomPlayer?.id
      );
    },
    [threeScene, currentPlacingMemo, currentMyRoomPlayer?.id]
  );

  const handleComplete = useCallback(() => {
    setCurrentPlacing(undefined);
  }, [setCurrentPlacing]);

  const { meshRef } = usePlacementMode({
    objectSize,
    animationScale: { x: 1.3, y: 1.3 },
    onPlace: handlePlace,
    onComplete: handleComplete,
  });

  return (
    <instancedMesh>
      <mesh name="placing" ref={meshRef}>
        <boxGeometry args={[myRoomMemoBoxSize[0], myRoomMemoBoxSize[1], myRoomMemoBoxSize[2]]} />
        <meshStandardMaterial depthTest={false} color="yellow" />
      </mesh>
    </instancedMesh>
  );
}

/**
 * Skill placement component
 */
function SkillPlacement({ itemName }: { itemName: string }) {
  const [, setCurrentPlacing] = useRecoilState(CurrentPlacingMyRoomSkillAtom);
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const { scene: threeScene } = useThree();

  const texture = useTexture(`/images/skills/${itemName}.webp`);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 1;
  texture.repeat.y = 1;

  const objectSize = useMemo<ObjectSize>(
    () => ({
      width: myRoomSkillBoxSize,
      height: myRoomSkillBoxSize,
      depth: myRoomSkillBoxSize,
    }),
    []
  );

  const handlePlace = useCallback(
    (result: PlacementResult) => {
      emitRoomChange(
        threeScene,
        `my-room-${itemName}`,
        {
          position: [result.position.x, result.position.y, result.position.z],
          rotation: [result.rotation.x, result.rotation.y, result.rotation.z],
        },
        currentMyRoomPlayer?.id,
        `my-room-${itemName}`
      );
    },
    [threeScene, itemName, currentMyRoomPlayer?.id]
  );

  const handleComplete = useCallback(() => {
    setCurrentPlacing(undefined);
  }, [setCurrentPlacing]);

  const { meshRef } = usePlacementMode({
    objectSize,
    animationScale: { x: 1.2, y: 1.2, z: 1.2 },
    onPlace: handlePlace,
    onComplete: handleComplete,
  });

  return (
    <mesh name="placing" ref={meshRef}>
      <boxGeometry args={[myRoomSkillBoxSize, myRoomSkillBoxSize, myRoomSkillBoxSize]} />
      <meshStandardMaterial map={texture.clone()} />
    </mesh>
  );
}

// Legacy wrapper components for backward compatibility
export const MyRoomFurniturePlaceMode = ({
  currentPlacingMyRoomFurniture,
}: {
  currentPlacingMyRoomFurniture: string;
}) => <FurniturePlacement itemName={currentPlacingMyRoomFurniture} />;

export const MyRoomMemoPlaceMode = () => <MemoPlacement />;

export const MyRoomSkillPlaceMode = ({
  currentPlacingMyRoomSkill,
}: {
  currentPlacingMyRoomSkill: string;
}) => <SkillPlacement itemName={currentPlacingMyRoomSkill} />;
