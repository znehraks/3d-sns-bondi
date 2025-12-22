import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useRecoilValue } from "recoil";
import gsap from "gsap";
import { calculateThreePosition, getMyRoomObjects } from "../../../../../../../utils";
import { myRoomSize } from "../../../../../../../data/constants";
import { socket } from "../../../../../../../sockets/clientSocket";
import { CurrentMyRoomPlayerAtom } from "../../../../../../../store/PlayersAtom";

// Shared direction vectors
const LEFT_WALL_VECTOR = new THREE.Vector3(1, 0, 0);
const RIGHT_WALL_VECTOR = new THREE.Vector3(0, 0, 1);
const FLOOR_VECTOR = new THREE.Vector3(0, 1, 0);

// Threshold for detecting surface alignment
const SURFACE_ALIGNMENT_THRESHOLD = 0.1;

export type PlacementType = "furniture" | "memo" | "skill";

export type SurfaceType = "floor" | "left-wall" | "right-wall" | null;

export interface ObjectSize {
  width: number;
  height: number;
  depth: number;
}

export interface PlacementResult {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  surface: SurfaceType;
}

interface UsePlacementModeOptions {
  objectSize: ObjectSize;
  animationScale?: { x: number; y: number; z?: number };
  filterSurfaces?: string[];
  onPlace: (result: PlacementResult) => void;
  onComplete: () => void;
}

/**
 * Determines which surface was hit by the raycast
 */
function detectSurface(
  normal: THREE.Vector3,
  objectName: string,
  filterSurfaces?: string[]
): SurfaceType {
  // Check if the surface passes the filter
  if (filterSurfaces && !filterSurfaces.includes(objectName)) {
    return null;
  }

  const isFloor = 1 - Math.abs(normal.clone().dot(FLOOR_VECTOR)) < SURFACE_ALIGNMENT_THRESHOLD;
  const isLeftWall = 1 - Math.abs(normal.clone().dot(LEFT_WALL_VECTOR)) < SURFACE_ALIGNMENT_THRESHOLD;
  const isRightWall = 1 - Math.abs(normal.clone().dot(RIGHT_WALL_VECTOR)) < SURFACE_ALIGNMENT_THRESHOLD;

  if (isFloor) return "floor";
  if (isLeftWall) return "left-wall";
  if (isRightWall) return "right-wall";
  return null;
}

/**
 * Calculates boundary offsets to keep object within room bounds
 */
function calculateBoundaryOffset(
  point: number,
  halfRoomSize: number,
  halfObjectSize: number
): number {
  const minBoundary = -(halfRoomSize - halfObjectSize);
  const maxBoundary = halfRoomSize + halfObjectSize;

  if (point < minBoundary) {
    return Math.abs(point + (halfRoomSize + halfObjectSize));
  }
  if (point > maxBoundary) {
    return -Math.abs(point - (halfRoomSize + halfObjectSize));
  }
  return 0;
}

/**
 * Calculates offsets for a given surface to keep object in bounds
 */
function calculateSurfaceOffsets(
  intersectPoint: THREE.Vector3,
  surface: SurfaceType,
  objectSize: ObjectSize
): { x: number; y: number; z: number } {
  const halfRoom = myRoomSize / 2;
  const halfWidth = objectSize.width / 2;
  const halfHeight = objectSize.height / 2;
  const halfDepth = objectSize.depth / 2;

  let xOffset = 0;
  let yOffset = 0;
  let zOffset = 0;

  switch (surface) {
    case "floor":
      xOffset = calculateBoundaryOffset(intersectPoint.x, halfRoom, halfWidth);
      zOffset = calculateBoundaryOffset(intersectPoint.z, halfRoom, halfDepth);
      break;

    case "left-wall":
      yOffset = calculateBoundaryOffset(intersectPoint.y, halfRoom, halfHeight);
      zOffset = calculateBoundaryOffset(intersectPoint.z, halfRoom, halfDepth);
      break;

    case "right-wall":
      xOffset = calculateBoundaryOffset(intersectPoint.x, halfRoom, halfWidth);
      yOffset = calculateBoundaryOffset(intersectPoint.y, halfRoom, halfHeight);
      break;
  }

  return { x: xOffset, y: yOffset, z: zOffset };
}

/**
 * Gets the default Y offset and rotation for a surface
 */
function getSurfaceDefaults(
  surface: SurfaceType,
  objectSize: ObjectSize
): { yOffset: number; rotation: THREE.Euler } {
  const halfHeight = objectSize.height / 2;

  switch (surface) {
    case "floor":
      return {
        yOffset: halfHeight + 0.01,
        rotation: new THREE.Euler(-Math.PI / 2, 0, 0),
      };
    case "left-wall":
      return {
        yOffset: 0,
        rotation: new THREE.Euler(0, -Math.PI / 2, 0),
      };
    case "right-wall":
      return {
        yOffset: 0,
        rotation: new THREE.Euler(0, 0, 0),
      };
    default:
      return {
        yOffset: 0,
        rotation: new THREE.Euler(0, 0, 0),
      };
  }
}

/**
 * Custom hook for placement mode functionality
 * Handles raycasting, boundary detection, and pointer events
 */
export function usePlacementMode(options: UsePlacementModeOptions) {
  const { objectSize, animationScale, filterSurfaces, onPlace, onComplete } = options;

  const { scene, gl, camera } = useThree();
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const meshRef = useRef<THREE.Mesh>(null);
  const placementResultRef = useRef<PlacementResult | null>(null);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const mesh = meshRef.current;
      if (!mesh) return;

      mesh.visible = true;

      const { clientX, clientY } = e;
      const { x, y } = calculateThreePosition({ clientX, clientY });

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      const intersects = raycaster
        .intersectObjects(scene.children)
        .filter((item) => !item.object.userData.placing && item.object.name !== "placing");

      const intersect = intersects[0];
      if (!intersect?.normal) return;

      const surface = detectSurface(intersect.normal, intersect.object.name, filterSurfaces);
      if (!surface) return;

      // Calculate offsets for boundaries
      const boundaryOffsets = calculateSurfaceOffsets(intersect.point, surface, objectSize);
      const surfaceDefaults = getSurfaceDefaults(surface, objectSize);

      // Calculate base offset based on surface
      let baseXOffset = 0;
      let baseYOffset = surfaceDefaults.yOffset;
      let baseZOffset = 0;

      if (surface === "left-wall") {
        baseXOffset = objectSize.width / 2 + 0.01;
      } else if (surface === "right-wall") {
        baseZOffset = objectSize.depth / 2 + 0.01;
      }

      const finalPosition = new THREE.Vector3(
        intersect.point.x + boundaryOffsets.x + baseXOffset,
        intersect.point.y + boundaryOffsets.y + baseYOffset,
        intersect.point.z + boundaryOffsets.z + baseZOffset
      );

      mesh.position.copy(finalPosition);
      mesh.rotation.copy(surfaceDefaults.rotation);

      placementResultRef.current = {
        position: finalPosition.clone(),
        rotation: mesh.rotation.clone(),
        surface,
      };
    },
    [camera, scene.children, objectSize, filterSurfaces]
  );

  const handlePointerUp = useCallback(() => {
    if (!placementResultRef.current) return;
    onPlace(placementResultRef.current);
    onComplete();
  }, [onPlace, onComplete]);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Setup pulse animation
    const scale = animationScale ?? { x: 1.1, y: 1.1, z: 1.1 };
    gsap.to(mesh.scale, {
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      x: scale.x,
      y: scale.y,
      z: scale.z ?? 1,
    });

    // Add event listeners
    gl.domElement.addEventListener("pointermove", handlePointerMove);
    gl.domElement.addEventListener("pointerup", handlePointerUp);

    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerup", handlePointerUp);
    };
  }, [gl.domElement, handlePointerMove, handlePointerUp, animationScale]);

  return {
    meshRef,
    currentMyRoomPlayerId: currentMyRoomPlayer?.id,
    scene,
  };
}

/**
 * Helper to emit room changes via socket
 */
export function emitRoomChange(
  scene: THREE.Scene,
  objectName: string,
  objectData: Record<string, unknown>,
  playerId?: string,
  excludeName?: string
) {
  const myRoomObjects = getMyRoomObjects(scene, excludeName);
  socket.emit(
    "myRoomChange",
    {
      objects: [...myRoomObjects, { name: objectName, ...objectData }],
    },
    playerId
  );
}
