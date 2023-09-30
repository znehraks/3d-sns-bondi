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
  CurrentSelectedMyRoomObjectAtom,
} from "../../../store/PlayersAtom";

import { MyRoomElements } from "./elements";
import { MyRoomMemoPlaceMode } from "./placeMode/MyRoomMemoPlaceMode";
import { MyRoomFurniturePlaceMode } from "./placeMode/MyRoomFurniturePlaceMode";
import { MyRoomObjectRotationMode } from "./rotationMode/MyRoomObjectRotationMode";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );

  const currentPlacingMyRoomFurniture = useRecoilValue(
    CurrentPlacingMyRoomFurnitureAtom
  );
  const currentPlacingMyRoomMemo = useRecoilValue(CurrentPlacingMyRoomMemoAtom);

  const currentSelectedMyRoomObject = useRecoilValue(
    CurrentSelectedMyRoomObjectAtom
  );

  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);

  return (
    <>
      {/* 배치된 오브젝트들 */}
      {currentMyRoomPlayer?.myRoom?.objects.map((object) => {
        return <MyRoomElements key={object.name} object={object} />;
      })}

      <directionalLight castShadow intensity={1} position={[0, 10, 10]} />
      <spotLight castShadow intensity={8} position={[-1, 10, -1]} />
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
      {currentSelectedMyRoomObject && <MyRoomObjectRotationMode />}
    </>
  );
};
