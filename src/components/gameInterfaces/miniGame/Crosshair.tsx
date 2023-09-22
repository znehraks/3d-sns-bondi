import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CurrentMapAtom } from "../../../store/PlayersAtom";

export const Crosshair = () => {
  const currentMap = useRecoilValue(CurrentMapAtom);
  return (
    <CrosshairWrapper
      className={currentMap === "MINI_GAME" ? "visible" : "invisible"}
    >
      +
    </CrosshairWrapper>
  );
};

const CrosshairWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  font-weight: 300;
  color: red;
  &.visible {
    display: block;
  }
  &.invisible {
    display: none;
  }
`;
