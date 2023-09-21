import { useRecoilValue } from "recoil";
import { MyRoomPlaceMode } from "./MyRoomPlaceMode";
import { MyRoomFloor } from "./elements/MyRoomFloor";
import { MyRoomLeftWall } from "./elements/MyRoomLeftWall";
import { MyRoomRightWall } from "./elements/MyRoomRightWall";
import {
  CurrentPlacingMyRoomSkillAtom,
  CurrentMyRoomPlayerAtom,
  PlacedMyRoomSkillsAtom,
} from "../../../store/PlayersAtom";

import { Suspense } from "react";
import { MyRoomElements } from "./elements";
import { MyRoomPlacedSkillBox } from "./elements/MyRoomPlacedSkillBox";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );
  const placedMyRoomSkills = useRecoilValue(PlacedMyRoomSkillsAtom);

  const currentMyRoomPlayer = useRecoilValue(CurrentMyRoomPlayerAtom);
  console.log("currentMyRoomPlayer", currentMyRoomPlayer);
  return (
    <Suspense>
      {currentMyRoomPlayer?.myRoom?.objects.map((object) => {
        return (
          <>
            <MyRoomElements object={object} />
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
      {placedMyRoomSkills.map((placedMyRoomSkill) => (
        <instancedMesh  key={placedMyRoomSkill.name}>
          <MyRoomPlacedSkillBox placedMyRoomSkill={placedMyRoomSkill} />
        </instancedMesh>
      ))}
    </Suspense>
  );
};
