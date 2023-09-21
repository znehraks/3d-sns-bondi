import { atom, selector } from "recoil";
import { Vector3 } from "three";

export interface IMyRoomObjectProps {
  position: [number, number, number];
  rotation: [number, number, number];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export type IMyRoomObjectNames =
  | "my-room-bed"
  | "my-room-chair"
  | "my-room-desk"
  | "my-room-floor"
  | "my-room-left-wall"
  | "my-room-right-wall"
  | "my-room-html"
  | "my-room-css"
  | "my-room-javascript"
  | "my-room-typescript"
  | "my-room-react"
  | "my-room-next"
  | "my-room-node"
  | "my-room-graphql"
  | "my-room-three"
  | "my-room-pixi"
  | "my-room-python"
  | "my-room-flutter"
  | "my-room-aws";
export type IMyRoomObject = {
  name: IMyRoomObjectNames;
  position: [number, number, number];
  rotation: [number, number, number];
  authorNickname?: string;
  text?: string;
  timestamp?: string;
};
export interface IMyRoom {
  objects: IMyRoomObject[];
}
export interface IPlayer {
  id: string;
  nickname: string;
  jobPosition: string;
  position: [number, number, number];
  hairColor: string;
  shirtColor: string;
  pantsColor: string;
  myRoom: IMyRoom;
}
// 모든 플레이어들
export const PlayersAtom = atom<IPlayer[]>({
  key: "PlayersAtom",
  default: [],
});

// // 현재 로그인 여부(내가 기본 맵까지 접속했는가
// export const IsLoginAtom = atom({
//   key: "IsLoginAtom",
//   default: false,
// });

// 내 player정보

// 내 socket 정보
export const MeAtom = atom<IPlayer>({
  key: "MeAtom",
  default: undefined,
});

// 캐릭터 선택이 완료되었는지,
export const CharacterSelectFinishedAtom = atom({
  key: "CharacterSelectFinishedAtom",
  default: false, //false가 기본값이나 개발 시 번거로움으로 인해 true로 디폴드 세팅함
});

// 내 캐릭터의 머리 색
export const HairColorAtom = atom<string>({
  key: "HairColorAtom",
  default: "white",
});

// 내 캐릭터의 상의 색
export const ShirtColorAtom = atom<string>({
  key: "ShirtColorAtom",
  default: "white",
});

// 내 캐릭터의 하의 색
export const PantsColorAtom = atom<string>({
  key: "PantsColorAtom",
  default: "white",
});

// 초기 모델링 로드가 완료되었는가 여부
export const IsLoadCompletedAtom = atom({
  key: "IsLoadCompletedAtom",
  default: false,
});

export interface IChat {
  senderId: IPlayer["id"];
  senderNickname: IPlayer["nickname"];
  senderJobPosition: IPlayer["jobPosition"];
  text: string;
  timestamp: string;
}

// 채팅 정보
export const ChatsAtom = atom<IChat[]>({
  key: "ChatsAtom",
  default: [],
});

export interface INotice {
  nickname: IPlayer["nickname"];
  jobPosition: IPlayer["jobPosition"];
}

// 입장 공지 정보
export const EnterNoticeAtom = atom<INotice | undefined>({
  key: "EnterNoticeAtom",
  default: undefined,
});

// 퇴장 공지 정보
export const ExitNoticeAtom = atom<INotice | undefined>({
  key: "ExitNoticeAtom",
  default: undefined,
});

export type TMaps = "GROUND" | "MY_ROOM" | "MINI_GAME";
// 현재 있는 맵 정보
export const CurrentMapAtom = atom<TMaps>({
  key: "CurrentMapAtom",
  default: "GROUND",
});

export const CurrentMyRoomPopupPlayerIdAtom = atom<string | undefined>({
  key: "CurrentMyRoomPopupPlayerIdAtom",
  default: undefined,
});

export const CurrentMyRoomPlayerAtom = atom<IPlayer | undefined>({
  key: "CurrentMyRoomPlayerAtom",
  default: undefined,
});

interface PlayGroundStructureBoundingBox {
  name: string;
  box: { max: Vector3; min: Vector3 };
  position: Vector3;
}
export const PlayGroundStructuresBoundingBoxAtom = atom<
  PlayGroundStructureBoundingBox[]
>({
  key: "PlayGroundStructuresBoundingBoxAtom",
  default: [],
});

export const PlayerGroundStructuresFloorPlaneCornersSelector = selector({
  key: "PlayerGroundStructuresFloorPlaneCornersSelector",
  get: ({ get }) => {
    const pb = get(PlayGroundStructuresBoundingBoxAtom);
    return pb.map((item) => {
      return {
        name: item.name,
        corners: [
          {
            x: item.box.max.x + item.position.x,
            z: item.box.max.z + item.position.z,
          },
          {
            x: item.box.max.x + item.position.x,
            z: item.box.min.z + item.position.z,
          },
          {
            x: item.box.min.x + item.position.x,
            z: item.box.min.z + item.position.z,
          },
          {
            x: item.box.min.x + item.position.x,
            z: item.box.max.z + item.position.z,
          },
        ],
        position: item.position,
      };
    });
  },
});

export const CurrentPlacingMyRoomSkillAtom = atom<string | undefined>({
  key: "CurrentPlacingMyRoomSkillAtom",
  default: undefined,
});

export interface IPlacedMyRoomSkill {
  name: string;
  position: [number, number, number];
}
export const PlacedMyRoomSkillsAtom = atom<IPlacedMyRoomSkill[]>({
  key: "PlacedMyRoomSkillsAtom",
  default: [],
});

export interface ICurrentPlacingMyRoomMemo {
  text: string;
  authorNickname: string;
  timestamp: string;
}

export const CurrentPlacingMyRoomMemoAtom = atom<
  ICurrentPlacingMyRoomMemo | undefined
>({
  key: "CurrentPlacingMyRoomMemoAtom",
  default: undefined,
});

export interface IPlacedMyRoomMemos {
  text: string;
  authorNickname: string;
  timestamp: string;
  position: [number, number, number];
  rotation: [number, number, number];
}

export const PlacedMyRoomMemosAtom = atom<IPlacedMyRoomMemos[]>({
  key: "PlacedMyRoomMemosAtom",
  default: [],
});

export const CurrentSelectedMemoAtom = atom<
  ICurrentPlacingMyRoomMemo | undefined
>({
  key: "CurrentSelectedMemoAtom",
  default: undefined,
});
