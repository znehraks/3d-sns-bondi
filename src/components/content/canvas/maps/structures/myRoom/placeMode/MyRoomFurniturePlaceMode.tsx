import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMyRoomPlayerAtom,
  CurrentPlacingMyRoomFurnitureAtom,
} from "../../../../../../../store/PlayersAtom";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {
  calculateThreePosition,
  getMyRoomObjects,
} from "../../../../../../../utils";
import { myRoomSize } from "../../../../../../../data/constants";
import { socket } from "../../../../../../../sockets/clientSocket";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

// // 배치할떄 버벅거리는 문제 해결해야함
// 가구 회전 기능 추가해야함
// 시작할때 캐릭터 귀여운걸로 바꿔야함

const leftWallVector = new THREE.Vector3(1, 0, 0);
const rightWallVector = new THREE.Vector3(0, 0, 1);
const floorVector = new THREE.Vector3(0, 1, 0);
const positionVector = new THREE.Vector3();

// 가구 배치하기
export const MyRoomFurniturePlaceMode = ({
  currentPlacingMyRoomFurniture,
}: {
  currentPlacingMyRoomFurniture: string;
}) => {
  const { scene: threeScene, gl, camera } = useThree();

  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  const [, setCurrentPlacingMyRoomFurniture] = useRecoilState(
    CurrentPlacingMyRoomFurnitureAtom
  );
  const { scene } = useGLTF(`/models/${currentPlacingMyRoomFurniture}.glb`);

  const ref = useRef<THREE.Mesh>(null);
  const currentObject = threeScene
    .getObjectByName(`my-room-${currentPlacingMyRoomFurniture}`)
    ?.clone();
  useEffect(() => {
    if (!ref.current) return;
    if (!scene) return;
    gsap.to(ref.current.scale, {
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      x: 1.1,
      y: 1.1,
      z: 1.1,
    });
    scene.traverse((obj) => {
      obj.userData.placing = true;
      if ((obj as THREE.Mesh).isMesh) {
        (obj as THREE.Mesh).geometry.computeBoundingBox();
      }
    });
    const boundingBox = new THREE.Box3().setFromObject(scene);
    const handlePointerMove = (e: PointerEvent) => {
      if (!ref.current) return;
      ref.current.visible = true;
      const { clientX, clientY } = e;
      const { x, y } = calculateThreePosition({ clientX, clientY });
      const rayCaster = new THREE.Raycaster();
      rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const intersects = rayCaster
        .intersectObjects(threeScene.children)
        .filter((item) =>
          ["my-room-floor", "my-room-left-wall", "my-room-right-wall"].includes(
            item.object.name
          )
        );

      const intersect = intersects[0];
      let roomTouched = false;
      let xOffset = 0;
      const yOffset = -myRoomSize / 2 - boundingBox.min.y;
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

        ref.current?.rotation.set(0, currentObject?.rotation.y ?? 0, 0);
        positionVector.copy(ref.current?.position.clone());
      }
    };

    const handlePointerUp = () => {
      if (!currentPlacingMyRoomFurniture) return;

      const myRoomObjects = getMyRoomObjects(
        threeScene,
        `my-room-${currentPlacingMyRoomFurniture}`
      );
      socket.emit(
        "myRoomChange",
        {
          objects: [
            ...myRoomObjects,
            {
              name: `my-room-${currentPlacingMyRoomFurniture}`,
              position: [positionVector.x, positionVector.y, positionVector.z],
              rotation: [
                0,
                currentObject?.rotation.y ?? ref.current!.rotation.y,
                0,
              ],
            },
          ],
        },
        currentMyRoomPlayer?.id
      );
      setCurrentPlacingMyRoomFurniture(undefined);
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    gl.domElement.addEventListener("pointerup", handlePointerUp);
    return () => {
      positionVector.set(0, 0, 0);
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
    scene,
    currentMyRoomPlayer?.id,
    currentObject?.rotation.y,
  ]);

  return (
    <primitive
      visible={false}
      name="placing"
      ref={ref}
      object={scene.clone()}
      scale={[1, 1, 1]}
    />
  );
};
