import _ from "lodash";

export const colorCandidates = _.uniq([
  "#007fff",
  "#7fff00",
  "#ff007f",
  "#f77fbe",
  "#00c5cd",
  "#ffdcdb",
  "#bea9de",
  "#f4915f",
  "#999999",
  "#8360aa",
  "#f3854e",
  "#8250e5",
  "#ffcf40",
  "#96bffd",
  "#a0b9ff",
  "#5398fe",
  "#653125",
  "#371b14",
  "#3e1e17",
  "#5a2c21",
  "#301713",
  "#200f0c",
  "#010048",
  "#fff68f",
  "#609669",
  "#c3bcae",
  "#698869",
  "#f2e5d5",
  "#b35252",
  "#5a00e1",
  "#ce11ef",
  "#0074d8",
  "#0e9cef",
  "#63f27d",
  "#e9f263",
  "#f2e5d5",
  "#dab79f",
  "#6a7142",
  "#001fdb",
  "#0018a8",
  "#e6e6c4",
  "#eeb422",
]);

export const groundMapSize = 50;
export const myRoomSize = 10;
export const myRoomSkillBoxSize = 10 / 20;
export const myRoomMemoBoxSize = [0.5, 0.5, 0.01];
export enum STEPS {
  NICK_NAME,
  JOB_POSITION,
  CHARACTER,
  FINISH,
}

export const characterGlbNameCandidates = [
  "CubeGuyCharacter",
  "CubeWomanCharacter",
  "Steve",
];
