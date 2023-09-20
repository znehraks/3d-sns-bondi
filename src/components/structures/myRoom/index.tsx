import { useRecoilValue } from "recoil";
import { MyRoomPlaceMode } from "./MyRoomPlaceMode";
import { MyRoomFloor } from "./elements/MyRoomFloor";
import { MyRoomLeftWall } from "./elements/MyRoomLeftWall";
import { MyRoomRightWall } from "./elements/MyRoomRightWall";
import {
  CurrentPlacingMyRoomSkillAtom,
  PlacedMyRoomSkillsAtom,
} from "../../../store/PlayersAtom";
import { MyRoomPlacedSkillBox } from "./elements/MyRoomPlacedSkillBox";
import { MyRoomChair } from "./elements/MyRoomChair";
import { Suspense } from "react";
import { MyRoomStandingDesk } from "./elements/MyRoomDesk";
import { MyRoomBed } from "./elements/MyRoomBed";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );
  const placedMyRoomSkills = useRecoilValue(PlacedMyRoomSkillsAtom);
  return (
    <Suspense>
      <MyRoomFloor />
      <MyRoomLeftWall />
      <MyRoomRightWall />
      <MyRoomChair />
      <MyRoomStandingDesk />
      <MyRoomBed />
      {currentPlacingMyRoomSkill && (
        <MyRoomPlaceMode
          currentPlacingMyRoomSkill={currentPlacingMyRoomSkill}
        />
      )}
      {placedMyRoomSkills.map((placedMyRoomSkill) => (
        <instancedMesh key={placedMyRoomSkill.name}>
          <MyRoomPlacedSkillBox placedMyRoomSkill={placedMyRoomSkill} />
        </instancedMesh>
      ))}
    </Suspense>
  );
};
