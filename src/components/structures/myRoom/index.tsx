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

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );
  const placedMyRoomSkills = useRecoilValue(PlacedMyRoomSkillsAtom);
  return (
    <>
      <MyRoomFloor />
      <MyRoomLeftWall />
      <MyRoomRightWall />
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
    </>
  );
};
