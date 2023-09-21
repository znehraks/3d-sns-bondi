import { IMyRoomObject } from "../../../../store/PlayersAtom";
import { MyRoomBed } from "./MyRoomBed";
import { MyRoomChair } from "./MyRoomChair";
import { MyRoomStandingDesk } from "./MyRoomDesk";
import { MyRoomPlacedSkillBox } from "./MyRoomPlacedSkillBox";

export const MyRoomElements = ({ object }: { object: IMyRoomObject }) => {
  if (object.name === "my-room-bed") {
    return <MyRoomBed position={object.position} rotation={object.rotation} />;
  }
  if (object.name === "my-room-chair") {
    return (
      <MyRoomChair position={object.position} rotation={object.rotation} />
    );
  }
  if (object.name === "my-room-floor") {
    return null;
  }
  if (object.name === "my-room-left-wall") {
    return null;
  }
  if (object.name === "my-room-right-wall") {
    return null;
  }
  if (object.name === "my-room-desk") {
    return (
      <MyRoomStandingDesk
        position={object.position}
        rotation={object.rotation}
      />
    );
  }
  return (
    <MyRoomPlacedSkillBox
      placedMyRoomSkill={{
        position: object.position,
        name: object.name.split("-")[2],
      }}
    />
  );
  //   if (object.name === "my-room-html") {
  //     return null;
  //   }
  //   if (object.name === "my-room-css") {
  //     return null;
  //   }
  //   if (object.name === "my-room-javascript") {
  //     return null;
  //   }
  //   if (object.name === "my-room-typescript") {
  //     return null;
  //   }
  //   if (object.name === "my-room-react") {
  //     return null;
  //   }
  //   if (object.name === "my-room-next") {
  //     return null;
  //   }
  //   if (object.name === "my-room-node") {
  //     return null;
  //   }
  //   if (object.name === "my-room-graphql") {
  //     return null;
  //   }
  //   if (object.name === "my-room-three") {
  //     return null;
  //   }
  //   if (object.name === "my-room-pixi") {
  //     return null;
  //   }
  //   if (object.name === "my-room-python") {
  //     return null;
  //   }
  //   if (object.name === "my-room-flutter") {
  //     return null;
  //   }
  //   if (object.name === "my-room-aws") {
  //     return null;
  //   }
  return null;
};
