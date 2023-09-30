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
} from "../../../store/PlayersAtom";

import { MyRoomElements } from "./elements";
import { MyRoomMemoPlaceMode } from "./placeMode/MyRoomMemoPlaceMode";
import { MyRoomFurniturePlaceMode } from "./placeMode/MyRoomFurniturePlaceMode";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );

  const currentPlacingMyRoomFurniture = useRecoilValue(
    CurrentPlacingMyRoomFurnitureAtom
  );
  const currentPlacingMyRoomMemo = useRecoilValue(CurrentPlacingMyRoomMemoAtom);

  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);

  return (
    <>
      {/* 배치된 오브젝트들 */}
      {currentMyRoomPlayer?.myRoom?.objects.map((object) => {
        return <MyRoomElements key={object.name} object={object} />;
      })}

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
    </>
  );
};
