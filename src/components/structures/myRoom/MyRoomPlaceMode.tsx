import { useRecoilState } from "recoil";
import {
  CurrentPlacingMyRoomSkillAtom,
  PlacedMyRoomSkillsAtom,
} from "../../../store/PlayersAtom";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { calculateThreePosition } from "../../../utils";
import { useTexture } from "@react-three/drei";

export const MyRoomPlaceMode = ({
  currentPlacingMyRoomSkill,
}: {
  currentPlacingMyRoomSkill: string;
}) => {
  const { scene, gl, camera } = useThree();
  const [, setCurrentPlacingMyRoomSkill] = useRecoilState(
    CurrentPlacingMyRoomSkillAtom
  );
  const [, setPlacedMyRoomSkills] = useRecoilState(PlacedMyRoomSkillsAtom);
  const texture = useTexture(`/images/${currentPlacingMyRoomSkill}.png`);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 1;
  texture.repeat.y = 1;
  const ref = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (!currentPlacingMyRoomSkill) return;
    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      const { x, y } = calculateThreePosition({ clientX, clientY });
      const rayCaster = new THREE.Raycaster();
      rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const [intersect] = rayCaster
        .intersectObjects(scene.children)
        .filter((item) => item.object.name !== "placing");
      const currentRaycastingMeshName = intersect.object.name;

      let xOffset = 0;
      let yOffset = 0;
      let zOffset = 0;
      if (currentRaycastingMeshName === "my-room-floor") {
        yOffset = 0.25;
        if (intersect.point.x < -2) {
          xOffset += Math.abs(intersect.point.x + 2.25);
        }
        if (intersect.point.x > 2) {
          xOffset -= Math.abs(intersect.point.x - 2.25);
        }
        if (intersect.point.z < -2) {
          zOffset += Math.abs(intersect.point.z + 2.25);
        }
        if (intersect.point.z > 2) {
          zOffset -= Math.abs(intersect.point.z - 2.25);
        }
      }
      if (currentRaycastingMeshName === "my-room-left-wall") {
        xOffset = 0.25;
        if (intersect.point.y < -2) {
          yOffset += Math.abs(intersect.point.y + 2.25);
        }
        if (intersect.point.y > 2) {
          yOffset -= Math.abs(intersect.point.y - 2.25);
        }
        if (intersect.point.z < -2) {
          zOffset += Math.abs(intersect.point.z + 2.25);
        }
        if (intersect.point.z > 2) {
          zOffset -= Math.abs(intersect.point.z - 2.25);
        }
      }
      if (currentRaycastingMeshName === "my-room-right-wall") {
        zOffset = 0.25;
        if (intersect.point.x < -2) {
          xOffset += Math.abs(intersect.point.x + 2.25);
        }
        if (intersect.point.x > 2) {
          xOffset -= Math.abs(intersect.point.x - 2.25);
        }
        if (intersect.point.y < -2) {
          yOffset += Math.abs(intersect.point.y + 2.25);
        }
        if (intersect.point.y > 2) {
          yOffset -= Math.abs(intersect.point.y - 2.25);
        }
      }
      if (intersect) {
        ref.current?.position.set(
          intersect.point.x + xOffset,
          intersect.point.y + yOffset,
          intersect.point.z + zOffset
        );
      }
    };
    const handlePointerDown = () => {
      if (!ref.current) return;
      setPlacedMyRoomSkills((prev) => [
        ...prev.filter((item) => item.name !== currentPlacingMyRoomSkill),
        {
          name: currentPlacingMyRoomSkill,
          position: ref.current!.position.clone(),
        },
      ]);
      setCurrentPlacingMyRoomSkill(undefined);
    };

    console.log("currentPlacingMyRoomSkill", currentPlacingMyRoomSkill);
    gl.domElement.addEventListener("pointermove", handlePointerMove);
    gl.domElement.addEventListener("pointerdown", handlePointerDown);
    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [
    camera,
    currentPlacingMyRoomSkill,
    gl.domElement,
    scene.children,
    setCurrentPlacingMyRoomSkill,
    setPlacedMyRoomSkills,
    texture,
  ]);
  if (!currentPlacingMyRoomSkill) return null;
  return (
    <instancedMesh>
      <mesh name="placing" ref={ref}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial map={texture.clone()} />
      </mesh>
    </instancedMesh>
  );
};
