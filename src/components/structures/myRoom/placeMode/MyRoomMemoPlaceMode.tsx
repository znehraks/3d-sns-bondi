import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMyRoomPlayerAtom,
  CurrentPlacingMyRoomMemoAtom,
} from "../../../../store/PlayersAtom";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { calculateThreePosition, getMyRoomObjects } from "../../../../utils";
import { myRoomMemoBoxSize, myRoomSize } from "../../../../data";
import { socket } from "../../../../sockets/clientSocket";

const leftWallVector = new THREE.Vector3(1, 0, 0);
const rightWallVector = new THREE.Vector3(0, 0, 1);
const floorVector = new THREE.Vector3(0, 1, 0);

export const MyRoomMemoPlaceMode = () => {
  const { scene, gl, camera } = useThree();
  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const [currentPlacingMyRoomMemo, setCurrentPlacingMyRoomMemo] =
    useRecoilState(CurrentPlacingMyRoomMemoAtom);

  const ref = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (!ref.current) return;
    const handlePointerMove = (e: PointerEvent) => {
      if (!ref.current) return;
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
      ref.current.rotation.set(0, 0, 0);

      // 현재 rayCaster에 잡힌 첫번째 오브젝트의 법선벡터와 3축의 벡터가 평행하다면 각 축에 맞는 offset을 더해준다.
      if (1 - Math.abs(intersect.normal.clone().dot(floorVector)) < 0.1) {
        ref.current.rotation.x = -Math.PI / 2;
        roomTouched = true;
        yOffset = 0.01;
        if (intersect.point.x < -(myRoomSize / 2 - myRoomMemoBoxSize[0] / 2)) {
          xOffset += Math.abs(
            intersect.point.x + (myRoomSize / 2 + myRoomMemoBoxSize[0] / 2)
          );
        }
        if (intersect.point.x > myRoomSize / 2 + myRoomMemoBoxSize[0] / 2) {
          xOffset -= Math.abs(
            intersect.point.x - (myRoomSize / 2 + myRoomMemoBoxSize[0] / 2)
          );
        }
        if (intersect.point.z < -(myRoomSize / 2 - myRoomMemoBoxSize[2] / 2)) {
          zOffset += Math.abs(
            intersect.point.z + (myRoomSize / 2 + myRoomMemoBoxSize[2] / 2)
          );
        }
        if (intersect.point.z > myRoomSize / 2 + myRoomMemoBoxSize[2] / 2) {
          zOffset -= Math.abs(
            intersect.point.z - (myRoomSize / 2 + myRoomMemoBoxSize[2] / 2)
          );
        }
      }
      if (1 - Math.abs(intersect.normal.clone().dot(leftWallVector)) < 0.1) {
        ref.current.rotation.y = -Math.PI / 2;
        roomTouched = true;
        xOffset = 0.01;
        if (intersect.point.y < -(myRoomSize / 2 - myRoomMemoBoxSize[1] / 2)) {
          yOffset += Math.abs(
            intersect.point.y + (myRoomSize / 2 + myRoomMemoBoxSize[1] / 2)
          );
        }
        if (intersect.point.y > myRoomSize / 2 + myRoomMemoBoxSize[1] / 2) {
          yOffset -= Math.abs(
            intersect.point.y - (myRoomSize / 2 + myRoomMemoBoxSize[1] / 2)
          );
        }
        if (intersect.point.z < -(myRoomSize / 2 - myRoomMemoBoxSize[2] / 2)) {
          zOffset += Math.abs(
            intersect.point.z + (myRoomSize / 2 + myRoomMemoBoxSize[2] / 2)
          );
        }
        if (intersect.point.z > myRoomSize / 2 + myRoomMemoBoxSize[2] / 2) {
          zOffset -= Math.abs(
            intersect.point.z - (myRoomSize / 2 + myRoomMemoBoxSize[2] / 2)
          );
        }
      }
      if (1 - Math.abs(intersect.normal.clone().dot(rightWallVector)) < 0.1) {
        roomTouched = true;
        zOffset = 0.01;
        if (intersect.point.x < -(myRoomSize / 2 - myRoomMemoBoxSize[0] / 2)) {
          xOffset += Math.abs(
            intersect.point.x + (myRoomSize / 2 + myRoomMemoBoxSize[0] / 2)
          );
        }
        if (intersect.point.x > myRoomSize / 2 + myRoomMemoBoxSize[0] / 2) {
          xOffset -= Math.abs(
            intersect.point.x - (myRoomSize / 2 + myRoomMemoBoxSize[0] / 2)
          );
        }
        if (intersect.point.y < -(myRoomSize / 2 - myRoomMemoBoxSize[1] / 2)) {
          yOffset += Math.abs(
            intersect.point.y + (myRoomSize / 2 + myRoomMemoBoxSize[1] / 2)
          );
        }
        if (intersect.point.y > myRoomSize / 2 + myRoomMemoBoxSize[1] / 2) {
          yOffset -= Math.abs(
            intersect.point.y - (myRoomSize / 2 + myRoomMemoBoxSize[1] / 2)
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
      if (!currentPlacingMyRoomMemo) return;
      const myRoomObjects = getMyRoomObjects(scene);
      // `my-room-memo-${placedMyRoomMemo.authorNickname}-${placedMyRoomMemo.timestamp}`
      socket.emit(
        "myRoomChange",
        {
          objects: [
            ...myRoomObjects,
            {
              name: `my-room-memo-${currentPlacingMyRoomMemo.authorNickname}-${currentPlacingMyRoomMemo.timestamp}`,
              text: currentPlacingMyRoomMemo.text,
              authorNickname: currentPlacingMyRoomMemo.authorNickname,
              timestamp: currentPlacingMyRoomMemo.timestamp,
              position: [
                ref.current!.position.x,
                ref.current!.position.y,
                ref.current!.position.z,
              ],
              rotation: [
                ref.current!.rotation.x,
                ref.current!.rotation.y,
                ref.current!.rotation.z,
              ],
            },
          ],
        },
        currentMyRoomPlayer?.id
      );
      setCurrentPlacingMyRoomMemo(undefined);
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    gl.domElement.addEventListener("pointerup", handlePointerUp);
    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerup", handlePointerUp);
    };
  }, [
    camera,
    currentMyRoomPlayer?.id,
    currentPlacingMyRoomMemo,
    gl.domElement,
    scene,
    scene.children,
    setCurrentPlacingMyRoomMemo,
  ]);

  return (
    <instancedMesh>
      <mesh name="placing" ref={ref}>
        <boxGeometry
          args={[
            myRoomMemoBoxSize[0],
            myRoomMemoBoxSize[1],
            myRoomMemoBoxSize[2],
          ]}
        />
        <meshStandardMaterial color={"yellow"} />
      </mesh>
    </instancedMesh>
  );
};
