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
export const MeAtom = atom<{ id: string }>({
  key: "MeAtom",
  default: undefined,
});

// 캐릭터 선택이 완료되었는지,
export const CharacterSelectFinishedAtom = atom({
  key: "CharacterSelectFinishedAtom",
  default: false, //false가 기본값이나 개발 시 번거로움으로 인해 true로 디폴드 세팅함
});

export const HairColorAtom = atom<string>({
  key: "HairColorAtom",
  default: "white",
});

export const ShirtColorAtom = atom<string>({
  key: "ShirtColorAtom",
  default: "white",
});

export const PantsColorAtom = atom<string>({
  key: "PantsColorAtom",
  default: "white",
});
