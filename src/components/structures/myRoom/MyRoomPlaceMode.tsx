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
import { myRoomSize, myRoomSkillBoxSize } from "../../../data";

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

      console.log("intersect", intersect);
      let xOffset = 0;
      let yOffset = 0;
      let zOffset = 0;
      if (currentRaycastingMeshName === "my-room-floor") {
        yOffset = myRoomSkillBoxSize / 2 + 0.01;
        if (intersect.point.x < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          xOffset += Math.abs(
            intersect.point.x + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.x > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          xOffset -= Math.abs(
            intersect.point.x - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.z < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          zOffset += Math.abs(
            intersect.point.z + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.z > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          zOffset -= Math.abs(
            intersect.point.z - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
      }
      if (currentRaycastingMeshName === "my-room-left-wall") {
        xOffset = myRoomSkillBoxSize / 2 + 0.01;
        if (intersect.point.y < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          yOffset += Math.abs(
            intersect.point.y + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.y > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          yOffset -= Math.abs(
            intersect.point.y - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.z < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          zOffset += Math.abs(
            intersect.point.z + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.z > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          zOffset -= Math.abs(
            intersect.point.z - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
      }
      if (currentRaycastingMeshName === "my-room-right-wall") {
        zOffset = myRoomSkillBoxSize / 2 + 0.01;
        if (intersect.point.x < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          xOffset += Math.abs(
            intersect.point.x + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.x > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          xOffset -= Math.abs(
            intersect.point.x - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.y < -(myRoomSize / 2 - myRoomSkillBoxSize / 2)) {
          yOffset += Math.abs(
            intersect.point.y + (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
        }
        if (intersect.point.y > myRoomSize / 2 + myRoomSkillBoxSize / 2) {
          yOffset -= Math.abs(
            intersect.point.y - (myRoomSize / 2 + myRoomSkillBoxSize / 2)
          );
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
    const handlePointerUp = () => {
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
    gl.domElement.addEventListener("pointerup", handlePointerUp);
    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerup", handlePointerUp);
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
        <boxGeometry
          args={[myRoomSkillBoxSize, myRoomSkillBoxSize, myRoomSkillBoxSize]}
        />
        <meshStandardMaterial map={texture.clone()} />
      </mesh>
    </instancedMesh>
  );
};
