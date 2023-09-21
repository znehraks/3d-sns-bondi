import { useRecoilValue } from "recoil";
import { MyRoomPlaceMode } from "./MyRoomSkillPlaceMode";
import { MyRoomFloor } from "./elements/MyRoomFloor";
import { MyRoomLeftWall } from "./elements/MyRoomLeftWall";
import { MyRoomRightWall } from "./elements/MyRoomRightWall";
import {
  CurrentPlacingMyRoomSkillAtom,
  CurrentMyRoomPlayerAtom,
  PlacedMyRoomSkillsAtom,
  CurrentPlacingMyRoomMemoAtom,
  PlacedMyRoomMemosAtom,
} from "../../../store/PlayersAtom";

import { Suspense } from "react";
import { MyRoomElements } from "./elements";
import { MyRoomPlacedSkillBox } from "./elements/MyRoomPlacedSkillBox";
import { MyRoomMemoPlaceMode } from "./MyRoomMemoPlaceMode";
import { MyRoomPlacedMemo } from "./elements/MyRoomPlacedMemo";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );
  const placedMyRoomSkills = useRecoilValue(PlacedMyRoomSkillsAtom);

  const currentPlacingMyRoomMemo = useRecoilValue(CurrentPlacingMyRoomMemoAtom);
  const placedMyRoomMemos = useRecoilValue(PlacedMyRoomMemosAtom);

  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  return (
    <Suspense>
      {currentMyRoomPlayer?.myRoom?.objects.map((object) => {
        return (
          <>
            <MyRoomElements key={object.name} object={object} />
          </>
        );
      })}
      <MyRoomFloor />
      <MyRoomLeftWall />
      <MyRoomRightWall />
      {currentPlacingMyRoomSkill && (
        <MyRoomPlaceMode
          currentPlacingMyRoomSkill={currentPlacingMyRoomSkill}
        />
      )}
      {currentPlacingMyRoomMemo && <MyRoomMemoPlaceMode />}

      {placedMyRoomSkills.map((placedMyRoomSkill) => (
        <instancedMesh key={placedMyRoomSkill.name}>
          <MyRoomPlacedSkillBox placedMyRoomSkill={placedMyRoomSkill} />
        </instancedMesh>
      ))}
      {placedMyRoomMemos.map((placedMyRoomMemo) => (
        <instancedMesh
          key={`${placedMyRoomMemo.authorNickname}-${placedMyRoomMemo.timestamp}`}
        >
          <MyRoomPlacedMemo placedMyRoomMemo={placedMyRoomMemo} />
        </instancedMesh>
      ))}
    </Suspense>
  );
};
