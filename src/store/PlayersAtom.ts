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

export const MeAtom = atom<{ id: string }>({
  key: "MeAtom",
  default: undefined,
});

export const CharacterSelectFinishedAtom = atom({
  key: "CharacterSelectFinishedAtom",
  default: false,
});

export const HairColorAtom = atom<string>({
  key: "HairColorAtom",
  default: "black",
});

export const ShirtColorAtom = atom<string>({
  key: "ShirtColorAtom",
  default: "white",
});

export const PantsColorAtom = atom<string>({
  key: "PantsColorAtom",
  default: "black",
});
