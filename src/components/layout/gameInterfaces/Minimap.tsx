import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { MeAtom, PlayersAtom } from "../../../store/PlayersAtom";

export const Minimap = () => {
  const players = useRecoilValue(PlayersAtom);
  const me = useRecoilValue(MeAtom);

  return (
    <MinimapWrapper>
      {players.map((p) => (
        <PlayerPoint
          key={p.id}
          id={`player-point-${p.id}`}
          className={p.id === me.id ? "me-point" : "other-point"}
        />
      ))}
    </MinimapWrapper>
  );
};

const MinimapWrapper = styled.div`
  position: fixed;
  width: 200px;
  height: 200px;
  right: 50px;
  bottom: 50px;
  background-color: #00000055;
  rotate: 45deg;
`;

const PlayerPoint = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: lime;
  &.me-point {
    background-color: red;
  }
  &.other-point {
    background-color: lime;
  }
`;
