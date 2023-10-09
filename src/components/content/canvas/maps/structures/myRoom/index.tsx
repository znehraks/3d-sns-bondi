import { useRecoilValue } from "recoil";
import { MyRoomSkillPlaceMode } from "./placeMode/MyRoomSkillPlaceMode";
import { MyRoomFloor } from "./elements/MyRoomFloor";
import { MyRoomLeftWall } from "./elements/MyRoomLeftWall";
import { MyRoomRightWall } from "./elements/MyRoomRightWall";
import {
  CurrentPlacingMyRoomSkillAtom,
  CurrentMyRoomPlayerAtom,
  CurrentPlacingMyRoomMemoAtom,
  CurrentPlacingMyRoomFurnitureAtom,
  CurrentRotationingMyRoomObjectAtom,
} from "../../../../../../store/PlayersAtom";

import { MyRoomElements } from "./elements";
import { MyRoomMemoPlaceMode } from "./placeMode/MyRoomMemoPlaceMode";
import { MyRoomFurniturePlaceMode } from "./placeMode/MyRoomFurniturePlaceMode";
import { MyRoomFurnitureRotationMode } from "./rotationMode/MyRoomFurnitureRotationMode";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );

  const currentPlacingMyRoomFurniture = useRecoilValue(
    CurrentPlacingMyRoomFurnitureAtom
  );
  const currentPlacingMyRoomMemo = useRecoilValue(CurrentPlacingMyRoomMemoAtom);

  const currentRotationingMyRoomObject = useRecoilValue(
    CurrentRotationingMyRoomObjectAtom
  );

  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);

  return (
    <>
      {/* 배치된 오브젝트들 */}
      {currentMyRoomPlayer?.myRoom?.objects.map((object) => {
        return <MyRoomElements key={object.name} object={object} />;
      })}

      <directionalLight
        castShadow
        intensity={1}
        position={[0, 20, 20]}
        shadow-camera-bias={1}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <spotLight castShadow intensity={10} position={[-1, 10, -1]} />
      {/* 기본 바닥, 벽 */}
      <MyRoomFloor />
      <MyRoomLeftWall />
      <MyRoomRightWall />

      {/* 배치모드  */}
      {currentPlacingMyRoomSkill && (
        <MyRoomSkillPlaceMode
          currentPlacingMyRoomSkill={currentPlacingMyRoomSkill}
        />
      )}
      {currentPlacingMyRoomFurniture && (
        <MyRoomFurniturePlaceMode
          currentPlacingMyRoomFurniture={currentPlacingMyRoomFurniture}
        />
      )}
      {currentPlacingMyRoomMemo && <MyRoomMemoPlaceMode />}

      {/* 변형모드 */}
      {currentRotationingMyRoomObject && <MyRoomFurnitureRotationMode />}
    </>
  );
};
