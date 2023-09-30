import { useRecoilState } from "recoil";
import {
  CurrentPlacingMyRoomSkillAtom,
  PlacedMyRoomSkillsAtom,
} from "../../../../store/PlayersAtom";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { calculateThreePosition, getMyRoomObjects } from "../../../../utils";
import { useTexture } from "@react-three/drei";
import { myRoomSize, myRoomSkillBoxSize } from "../../../../data";
import { socket } from "../../../../sockets/clientSocket";

const leftWallVector = new THREE.Vector3(1, 0, 0);
const rightWallVector = new THREE.Vector3(0, 0, 1);
const floorVector = new THREE.Vector3(0, 1, 0);

// 가구 배치하기
export const MyRoomFurniturePlaceMode = ({
  currentPlacingMyRoomSkill,
}: {
  currentPlacingMyRoomSkill: string;
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const { scene, gl, camera } = useThree();
  const [, setCurrentPlacingMyRoomSkill] = useRecoilState(
    CurrentPlacingMyRoomSkillAtom
  );
  const [placedMyRoomSkills, setPlacedMyRoomSkills] = useRecoilState(
    PlacedMyRoomSkillsAtom
  );
  const texture = useTexture(`/images/${currentPlacingMyRoomSkill}.webp`);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 1;
  texture.repeat.y = 1;
  const ref = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (!ref.current) return;
    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      const { x, y } = calculateThreePosition({ clientX, clientY });
      const rayCaster = new THREE.Raycaster();
      rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const [intersect] = rayCaster
        .intersectObjects(scene.children)
        .filter((item) => item.object.name !== "placing");
      intersect.normal?.clone();
      let roomTouched = false;
      let xOffset = 0;
      let yOffset = 0;
      let zOffset = 0;
      if (!intersect.normal) return;

      // 현재 rayCaster에 잡힌 첫번째 오브젝트의 법선벡터와 3축의 벡터가 평행하다면 각 축에 맞는 offset을 더해준다.
      if (1 - Math.abs(intersect.normal.clone().dot(floorVector)) < 0.1) {
        roomTouched = true;
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
      if (1 - Math.abs(intersect.normal.clone().dot(leftWallVector)) < 0.1) {
        roomTouched = true;
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
      if (1 - Math.abs(intersect.normal.clone().dot(rightWallVector)) < 0.1) {
        roomTouched = true;
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
      if (intersect && roomTouched) {
        ref.current?.position.set(
          intersect.point.x + xOffset,
          intersect.point.y + yOffset,
          intersect.point.z + zOffset
        );
      }
    };
    const handlePointerUp = () => {
      setPlacedMyRoomSkills((prev) => [
        ...prev.filter((item) => item.name !== currentPlacingMyRoomSkill),
        {
          name: currentPlacingMyRoomSkill,
          position: [
            ref.current!.position.x,
            ref.current!.position.y,
            ref.current!.position.z,
          ],
        },
      ]);

      setIsFinished(true);

      // socket.emit 하기 배치했음을 알려야함
    };

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
    scene,
    scene.children,
    setCurrentPlacingMyRoomSkill,
    setPlacedMyRoomSkills,
    texture,
  ]);

  useEffect(() => {
    if (isFinished) {
      const myRoomObjects = getMyRoomObjects(scene);
      setCurrentPlacingMyRoomSkill(undefined);
      setPlacedMyRoomSkills([]);
      socket.emit("myRoomChange", { objects: myRoomObjects });
    }
  }, [
    currentPlacingMyRoomSkill,
    isFinished,
    placedMyRoomSkills,
    scene,
    setCurrentPlacingMyRoomSkill,
    setPlacedMyRoomSkills,
  ]);
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
