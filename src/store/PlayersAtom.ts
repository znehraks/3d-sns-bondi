import { atom } from "recoil";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IPlayer {
  id: string;
  nickname: string;
  jobPosition: string;
  position: [number, number, number];
  hairColor: string;
  shirtColor: string;
  pantsColor: string;
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
export interface IMe {
  id: string;
}

// 내 socket 정보
export const MeAtom = atom<IMe>({
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
  senderNickname: IPlayer["nickname"];
  senderJobPosition: IPlayer["jobPosition"];
  text: string;
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
