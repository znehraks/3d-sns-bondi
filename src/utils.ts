import { Camera, Scene, Vector3 } from "three";
import { IMyRoom, IMyRoomObject } from "./store/PlayersAtom";

export const isValidText = (text: string | undefined) => {
  return Boolean(text && text.trim() !== "");
};

export const calculateMinimapPosition = (originalPosition: Vector3) => {
  return {
    //  초기위치가 미니맵상 중심점이므로,
    // 점 위치(4 * 현재 캐릭터 위치의 x 좌표) - 점 자체 의 width의 절반
    x: 4 * originalPosition.x - 5,
    // 점 위치(4 * 현재 캐릭터 위치의 z 좌표) - 점 자체 의 height의 절반
    y: 4 * originalPosition.z - 5,
  };
};

interface ICalculateThreePosition {
  clientX: number;
  clientY: number;
}
export const calculateThreePosition = ({
  clientX,
  clientY,
}: ICalculateThreePosition) => {
  return {
    x: (clientX / window.innerWidth) * 2 - 1,
    y: -(clientY / window.innerHeight) * 2 + 1,
  };
};

interface IGetClientPosition {
  position: Vector3;
  camera: Camera;
}
export const getClientPosition = ({ position, camera }: IGetClientPosition) => {
  position.project(camera);

  // 스크린 좌표를 클라이언트 좌표로 변환
  const widthHalf = window.innerWidth / 2;
  const heightHalf = window.innerHeight / 2;
  const x = position.x * widthHalf + widthHalf;
  const y = -(position.y * heightHalf) + heightHalf;

  return { x, y };
};

export const getMyRoomObjects = (scene: Scene, currentObjectName?: string) => {
  const myRoomObjects: IMyRoom["objects"] = [];
  scene.children.forEach((child) =>
    child.traverse((obj) => {
      if (obj.name.includes("my-room")) {
        const myRoomObject: IMyRoomObject = {
          name: obj.name,
          position: [obj.position.x, obj.position.y, obj.position.z],
          rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
          authorNickname: obj.userData.authorNickname,
          text: obj.userData.text,
          timestamp: obj.userData.timestamp,
        };
        myRoomObjects.push(myRoomObject);
      }
    })
  );
  return myRoomObjects.filter((obj) => obj.name !== currentObjectName);
};
