import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  CurrentMapAtom,
  CurrentMyRoomPlayerIdAtom,
  CurrentSelectedOtherPlayerSelector,
} from "../../../store/PlayersAtom";
import { useState } from "react";

export const Popup = () => {
  const currentSelectedOtherPlayer = useRecoilValue(
    CurrentSelectedOtherPlayerSelector
  );
  const [, setCurrentMyRoomPlayerId] = useRecoilState(
    CurrentMyRoomPlayerIdAtom
  );
  const setCurrentMap = useSetRecoilState(CurrentMapAtom);
  const [visible, setVisible] = useState<boolean>(
    Boolean(currentSelectedOtherPlayer)
  );
  return (
    <PopupWrapper className={visible ? "visible" : "invisible"}>
      <PopupTitle>{`${currentSelectedOtherPlayer?.nickname}[${currentSelectedOtherPlayer?.jobPosition}]의 방으로 이동할까요?`}</PopupTitle>
      <PopupButtonContainer>
        <PopupButton
          className="yes"
          onClick={() => {
            setCurrentMap("MY_ROOM");
            setVisible(false);
          }}
        >
          예
        </PopupButton>
        <PopupButton
          className="no"
          onClick={() => {
            setCurrentMyRoomPlayerId(undefined);
            setVisible(false);
          }}
        >
          아니오
        </PopupButton>
      </PopupButtonContainer>
    </PopupWrapper>
  );
};

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 100px;
  font-size: 16px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #ffffff99;
  border-radius: 12px;
  gap: 10px;
  &.visible {
    display: flex;
  }
  &.invisible {
    display: none;
  }
`;

const PopupTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
`;
const PopupButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
`;

const PopupButton = styled.button`
  padding: 10px;
  width: 100px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-weight: 600;
  transition-duration: 0.2s;
  &.yes {
    background-color: #6731a1;
    color: #ffffff;
    &:hover {
      background-color: #340070;
      color: #ffffff;
    }
  }
  &:hover {
    background-color: #cccccc;
  }
  cursor: pointer;
`;
