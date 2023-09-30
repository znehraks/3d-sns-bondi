import { useGLTF } from "@react-three/drei";
import { IMyRoomObject } from "../../../../store/PlayersAtom";
import { MyRoomPlacedFurniture } from "./MyRoomPlacedFurniture";
import { MyRoomPlacedMemo } from "./MyRoomPlacedMemo";
import { MyRoomPlacedSkillBox } from "./MyRoomPlacedSkillBox";

export const MyRoomElements = ({ object }: { object: IMyRoomObject }) => {
  useGLTF("/models/furniture-Couch Small.glb");
  if (object.name.includes("my-room-memo")) {
    return (
      <MyRoomPlacedMemo
        key={object.name}
        placedMyRoomMemo={{
          authorNickname: object.authorNickname ?? "",
          position: object.position,
          rotation: object.rotation,
          text: object.text ?? "",
          timestamp: object.timestamp ?? "",
        }}
      />
    );
  }
  if (object.name.includes("my-room-skill"))
    return (
      <MyRoomPlacedSkillBox
        key={object.name}
        placedMyRoomSkill={{
          position: object.position,
          name: `skill-${object.name.split("-")[3]}`,
        }}
      />
    );

  if (object.name.includes("my-room-furniture"))
    return (
      <MyRoomPlacedFurniture
        key={object.name}
        placedMyRoomFurniture={{
          position: object.position,
          name: `furniture-${object.name.split("-")[3]}`,
        }}
      />
    );

  // return <GsapTest object={object} />;
  return null;
};
