import _ from "lodash";
import { atom, selector } from "recoil";
import { Vector3 } from "three";

export interface IMyRoomObjectProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

// export type IMyRoomObjectNames =
//   | "my-room-bed"
//   | "my-room-chair"
//   | "my-room-desk"
//   | "my-room-floor"
//   | "my-room-left-wall"
//   | "my-room-right-wall"
//   | "my-room-html"
//   | "my-room-css"
//   | "my-room-javascript"
//   | "my-room-typescript"
//   | "my-room-react"
//   | "my-room-next"
//   | "my-room-node"
//   | "my-room-graphql"
//   | "my-room-three"
//   | "my-room-pixi"
//   | "my-room-python"
//   | "my-room-flutter"
//   | "my-room-aws";
export type IMyRoomObject = {
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
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

// 모든 채팅 정보
export const ChatsAtom = atom<IChat[]>({
  key: "ChatsAtom",
  default: [],
});

// 말풍선을 위한 유저별 최신 채팅 내용 정보
export const RecentChatsSelector = selector({
  key: "RecentChatsSelector",
  get: ({ get }) => {
    const chats = get(ChatsAtom);
    return _.uniqBy([...chats].reverse(), "senderId");
  },
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

// 마이룸 입장 팝업 유저 아이디 정보
export const CurrentMyRoomPopupPlayerIdAtom = atom<string | undefined>({
  key: "CurrentMyRoomPopupPlayerIdAtom",
  default: undefined,
});

// 현재 들어가있는 마이룸의 주인 유저 정보
export const CurrentMyRoomPlayerAtom = atom<IPlayer | undefined>({
  key: "CurrentMyRoomPlayerAtom",
  default: undefined,
});

interface PlayGroundStructureBoundingBox {
  name: string;
  box: { max: Vector3; min: Vector3 };
  position: Vector3;
}

// 운동장에 배치된 오브젝트들의 경계선 정보
export const PlayGroundStructuresBoundingBoxAtom = atom<
  PlayGroundStructureBoundingBox[]
>({
  key: "PlayGroundStructuresBoundingBoxAtom",
  default: [],
});

// 운동장에 배치된 오브젝트들의 경계선 꼭짓점 정보
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

export interface IPlacedMyRoomObject {
  name: string;
  position: [number, number, number];
  rotation?: [number, number, number];
}

// TODO 가구 배치하기
//  현재 배치중인 기술스택박스 이름
export const CurrentPlacingMyRoomSkillAtom = atom<string | undefined>({
  key: "CurrentPlacingMyRoomSkillAtom",
  default: undefined,
});

// 현재 배치중인 가구 이름
export const CurrentPlacingMyRoomFurnitureAtom = atom<string | undefined>({
  key: "CurrentPlacingMyRoomFurnitureAtom",
  default: undefined,
});

export interface ICurrentPlacingMyRoomMemo {
  text: string;
  authorNickname: string;
  timestamp: string;
}

// 현재 배치중인 메모 정보
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

// 현재 팝업에 띄워진 메모 정보
export const CurrentSelectedMemoAtom = atom<
  ICurrentPlacingMyRoomMemo | undefined
>({
  key: "CurrentSelectedMemoAtom",
  default: undefined,
});

interface ICurrentSelectedMyRoomObject {
  name: string;
  clientPosition: { x: number; y: number };
}
export const CurrentSelectedMyRoomObjectAtom = atom<
  ICurrentSelectedMyRoomObject | undefined
>({
  key: "CurrentSelectedMyRoomObjectAtom",
  default: undefined,
});

//  현재 회전중인 가구
export const CurrentRotationingMyRoomObjectAtom = atom<string | undefined>({
  key: "CurrentRotationingMyRoomObjectAtom",
  default: undefined,
});

// 현재 회전된 각
export const CurrentRotationAtom = atom<number | undefined>({
  key: "CurrentRotationAtom",
  default: undefined,
});

//! 미니게임
// 미니게임(사격게임) 관련
export const IsMiniGameStartedAtom = atom<boolean>({
  key: "IsMiniGameStartedAtom",
  default: false,
});

// 현재 남은 총알 개수
export const BulletCountAtom = atom({
  key: "BulletCountAtom",
  default: 15,
});

// 현재 맞춘 표적 수
export const HitCountAtom = atom({
  key: "HitCountAtom",
  default: 0,
});

// 현재 미니게임이 끝났는지 여부
export const IsMiniGameClearedAtom = atom({
  key: " IsMiniGameClearedAtom",
  default: false,
});

// 현재 발사된 총의 남은 쿨타임
export const CoolTimeAtom = atom<number | undefined>({
  key: "CoolTimeAtom",
  default: undefined,
});
