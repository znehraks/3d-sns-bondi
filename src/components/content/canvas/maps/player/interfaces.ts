import { IPlayer } from "../../../../../store/PlayersAtom";

export interface IPlayerProps {
  player?: IPlayer;
  position: THREE.Vector3;
  modelIndex?: number;
}
