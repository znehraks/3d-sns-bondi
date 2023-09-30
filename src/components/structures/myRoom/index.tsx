import { useRecoilValue } from "recoil";
import { MyRoomSkillPlaceMode } from "./placeMode/MyRoomSkillPlaceMode";
import { MyRoomFloor } from "./elements/MyRoomFloor";
import { MyRoomLeftWall } from "./elements/MyRoomLeftWall";
import { MyRoomRightWall } from "./elements/MyRoomRightWall";
import {
  CurrentPlacingMyRoomSkillAtom,
  CurrentMyRoomPlayerAtom,
  PlacedMyRoomSkillsAtom,
  CurrentPlacingMyRoomMemoAtom,
  PlacedMyRoomMemosAtom,
  CurrentPlacingMyRoomFurnitureAtom,
  PlacedMyRoomFurnituresAtom,
} from "../../../store/PlayersAtom";

import { MyRoomElements } from "./elements";
import { MyRoomPlacedSkillBox } from "./elements/MyRoomPlacedSkillBox";
import { MyRoomMemoPlaceMode } from "./placeMode/MyRoomMemoPlaceMode";
import { MyRoomPlacedMemo } from "./elements/MyRoomPlacedMemo";
import { MyRoomFurniturePlaceMode } from "./placeMode/MyRoomFurniturePlaceMode";
import { MyRoomPlacedFurniture } from "./elements/MyRoomPlacedFurniture";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );

  const currentPlacingMyRoomFurniture = useRecoilValue(
    CurrentPlacingMyRoomFurnitureAtom
  );
  const currentPlacingMyRoomMemo = useRecoilValue(CurrentPlacingMyRoomMemoAtom);

  const placedMyRoomSkills = useRecoilValue(PlacedMyRoomSkillsAtom);
  const placedMyRoomFurnitures = useRecoilValue(PlacedMyRoomFurnituresAtom);
  const placedMyRoomMemos = useRecoilValue(PlacedMyRoomMemosAtom);

  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);

  console.log("currentMyRoomPlayer", currentMyRoomPlayer);
  return (
    <>
      {/* 배치된 오브젝트들 */}
      {currentMyRoomPlayer?.myRoom?.objects.map((object) => {
        return <MyRoomElements key={object.name} object={object} />;
      })}
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

      {/* 임시 배치 메시 */}
      {placedMyRoomSkills.map((placedMyRoomSkill) => (
        <instancedMesh key={placedMyRoomSkill.name}>
          <MyRoomPlacedSkillBox placedMyRoomSkill={placedMyRoomSkill} />
        </instancedMesh>
      ))}
      {placedMyRoomFurnitures.map((placedMyRoomFurniture) => (
        <MyRoomPlacedFurniture
          key={placedMyRoomFurniture.name}
          placedMyRoomFurniture={placedMyRoomFurniture}
        />
      ))}
      {placedMyRoomMemos.map((placedMyRoomMemo) => (
        <instancedMesh
          key={`${placedMyRoomMemo.authorNickname}-${placedMyRoomMemo.timestamp}`}
        >
          <MyRoomPlacedMemo placedMyRoomMemo={placedMyRoomMemo} />
        </instancedMesh>
      ))}
    </>
  );
};
