import { useRecoilState } from "recoil";
import {
  CurrentPlacingMyRoomFurnitureAtom,
  PlacedMyRoomFurnituresAtom,
} from "../../../../store/PlayersAtom";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { calculateThreePosition, getMyRoomObjects } from "../../../../utils";
import { myRoomSize } from "../../../../data";
import { socket } from "../../../../sockets/clientSocket";
import { useGLTF } from "@react-three/drei";

const leftWallVector = new THREE.Vector3(1, 0, 0);
const rightWallVector = new THREE.Vector3(0, 0, 1);
const floorVector = new THREE.Vector3(0, 1, 0);

// 가구 배치하기
export const MyRoomFurniturePlaceMode = ({
  currentPlacingMyRoomFurniture,
}: {
  currentPlacingMyRoomFurniture: string;
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const { scene: threeScene, gl, camera } = useThree();
  const [, setCurrentPlacingMyRoomFurniture] = useRecoilState(
    CurrentPlacingMyRoomFurnitureAtom
  );
  const [placedMyRoomFurnitures, setPlacedMyRoomFurnitures] = useRecoilState(
    PlacedMyRoomFurnituresAtom
  );
  const { scene } = useGLTF(`/models/${currentPlacingMyRoomFurniture}.glb`);

  const ref = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (!ref.current) return;
    scene.traverse((obj) => {
      obj.userData.placing = true;
      if ((obj as THREE.Mesh).isMesh) {
        (obj as THREE.Mesh).geometry.computeBoundingBox();
      }
    });
    const boundingBox = new THREE.Box3().setFromObject(scene);
    console.log("boundingBox", boundingBox);
    const handlePointerMove = (e: PointerEvent) => {
      const { clientX, clientY } = e;
      const { x, y } = calculateThreePosition({ clientX, clientY });
      const rayCaster = new THREE.Raycaster();
      rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const [intersect] = rayCaster
        .intersectObjects(threeScene.children)
        .filter((item) => !item.object.userData.placing);
      intersect.normal?.clone();
      let roomTouched = false;
      let xOffset = 0;
      const yOffset = boundingBox.min.y;
      let zOffset = 0;
      if (!intersect.normal) return;

      const width = boundingBox.max.x - boundingBox.min.x;
      const depth = boundingBox.max.z - boundingBox.min.z;

      // 현재 rayCaster에 잡힌 첫번째 오브젝트의 법선벡터와 3축의 벡터가 평행하다면 각 축에 맞는 offset을 더해준다.
      if (
        1 - Math.abs(intersect.normal.clone().dot(floorVector)) < 0.1 &&
        intersect.object.name === "my-room-floor"
      ) {
        roomTouched = true;
        if (intersect.point.x < -(myRoomSize / 2 - width / 2)) {
          xOffset += Math.abs(intersect.point.x + (myRoomSize / 2 + width / 2));
        }
        if (intersect.point.x > myRoomSize / 2 + width / 2) {
          xOffset -= Math.abs(intersect.point.x - (myRoomSize / 2 + width / 2));
        }
        if (intersect.point.z < -(myRoomSize / 2 - depth / 2)) {
          zOffset += Math.abs(intersect.point.z + (myRoomSize / 2 + depth / 2));
        }
        if (intersect.point.z > myRoomSize / 2 + depth / 2) {
          zOffset -= Math.abs(intersect.point.z - (myRoomSize / 2 + depth / 2));
        }
      } else if (
        1 - Math.abs(intersect.normal.clone().dot(leftWallVector)) < 0.1 &&
        intersect.object.name === "my-room-left-wall"
      ) {
        roomTouched = true;
        xOffset += Math.abs(intersect.point.x + (myRoomSize / 2 + width / 2));
      } else if (
        1 - Math.abs(intersect.normal.clone().dot(rightWallVector)) < 0.1 &&
        intersect.object.name === "my-room-right-wall"
      ) {
        roomTouched = true;
        zOffset += Math.abs(intersect.point.z + (myRoomSize / 2 + depth / 2));
      }
      if (intersect && roomTouched) {
        ref.current?.position.set(
          intersect.point.x + xOffset,
          yOffset,
          intersect.point.z + zOffset
        );
      }
    };
    const handlePointerUp = () => {
      setPlacedMyRoomFurnitures((prev) => [
        ...prev.filter((item) => item.name !== currentPlacingMyRoomFurniture),
        {
          name: currentPlacingMyRoomFurniture,
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
    currentPlacingMyRoomFurniture,
    gl.domElement,
    threeScene,
    threeScene.children,
    setCurrentPlacingMyRoomFurniture,
    setPlacedMyRoomFurnitures,
    scene,
  ]);

  useEffect(() => {
    if (isFinished) {
      const myRoomObjects = getMyRoomObjects(threeScene);
      console.log("myRoomObjects", myRoomObjects);
      setCurrentPlacingMyRoomFurniture(undefined);
      setPlacedMyRoomFurnitures([]);
      console.log("here?");
      socket.emit("myRoomChange", { objects: myRoomObjects });
    }
  }, [
    currentPlacingMyRoomFurniture,
    isFinished,
    placedMyRoomFurnitures,
    threeScene,
    setCurrentPlacingMyRoomFurniture,
    setPlacedMyRoomFurnitures,
  ]);
  return <primitive visible name="placing" ref={ref} object={scene} />;
};
