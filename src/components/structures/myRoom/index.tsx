import { useRecoilValue } from "recoil";
import { MyRoomPlaceMode } from "./MyRoomPlaceMode";
import { MyRoomFloor } from "./elements/MyRoomFloor";
import { MyRoomLeftWall } from "./elements/MyRoomLeftWall";
import { MyRoomRightWall } from "./elements/MyRoomRightWall";
import {
  CurrentPlacingMyRoomSkillAtom,
  CurrentSelectedOtherPlayerSelector,
  PlacedMyRoomSkillsAtom,
} from "../../../store/PlayersAtom";
import { MyRoomPlacedSkillBox } from "./elements/MyRoomPlacedSkillBox";
import { Suspense } from "react";
import { MyRoomElements } from "./elements";

export const MyRoom = () => {
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );
  const placedMyRoomSkills = useRecoilValue(PlacedMyRoomSkillsAtom);

  const currentSelectedOtherPlayer = useRecoilValue(
    CurrentSelectedOtherPlayerSelector
  );
  console.log("currentSelectedOtherPlayer", currentSelectedOtherPlayer);
  return (
    <Suspense>
      {currentSelectedOtherPlayer?.myRoom?.objects.map((object) => {
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
        <instancedMesh key={placedMyRoomSkill.name}>
          <MyRoomPlacedSkillBox placedMyRoomSkill={placedMyRoomSkill} />
        </instancedMesh>
      ))}
    </Suspense>
  );
};
