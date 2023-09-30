import { useEffect } from "react";
import {
  CurrentSelectedMyRoomObjectAtom,
  IMyRoomObject,
} from "../../../../store/PlayersAtom";
import { MyRoomPlacedFurniture } from "./MyRoomPlacedFurniture";
import { MyRoomPlacedMemo } from "./MyRoomPlacedMemo";
import { MyRoomPlacedSkillBox } from "./MyRoomPlacedSkillBox";
import { useThree } from "@react-three/fiber";
import { useRecoilState } from "recoil";

export const MyRoomElements = ({ object }: { object: IMyRoomObject }) => {
  const three = useThree();
  const [, setCurrentSelectedMyRoomObject] = useRecoilState(
    CurrentSelectedMyRoomObjectAtom
  );
  useEffect(() => {
    const discardPopup = () => {
      setCurrentSelectedMyRoomObject(undefined);
    };

    three.gl.domElement.addEventListener("pointerdown", discardPopup);
    return () => {
      three.gl.domElement.removeEventListener("pointerdown", discardPopup);
    };
  }, [setCurrentSelectedMyRoomObject, three.gl.domElement]);
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
          scale: object.scale,
          name: `furniture-${object.name.split("-")[3]}`,
        }}
      />
    );

  return null;

  // return <GsapTest object={object} />;
  // return (
  //   <mesh>
  //     <boxGeometry />
  //     <meshStandardMaterial />
  //     <Outlines thickness={0.05} color="lime" />
  //   </mesh>
  // );
};
