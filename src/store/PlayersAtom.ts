import { atom } from "recoil";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PlayersAtom = atom<any[]>({
  key: "PlayersAtom",
  default: [],
});

export const IsLoginAtom = atom({
  key: "IsLoginAtom",
  default: false,
});
