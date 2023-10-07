import { useRecoilState } from "recoil";
import {
  EnterNoticeAtom,
  ExitNoticeAtom,
} from "../../../../../store/PlayersAtom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export const Notice = () => {
  const [enteredPlayer, setEnteredPlayer] = useRecoilState(EnterNoticeAtom);
  const [exitedPlayer, setExitedPlayer] = useRecoilState(ExitNoticeAtom);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setEnteredPlayer(undefined);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [enteredPlayer, setEnteredPlayer]);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
      setExitedPlayer(undefined);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [exitedPlayer, setExitedPlayer]);

  return (
    <NoticeWrapper className={visible ? "visible" : "invisible"}>
      {enteredPlayer && (
        <div>{`${enteredPlayer.nickname}[${enteredPlayer.jobPosition}]님이 입장하셨습니다.`}</div>
      )}
      {exitedPlayer && (
        <div>{`${exitedPlayer.nickname}[${exitedPlayer.jobPosition}]님이 퇴장하셨습니다.`}</div>
      )}
    </NoticeWrapper>
  );
};

const NoticeWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
  transition: 0.4s ease-in-out;
  & > * {
    transition: 0.4s ease-in-out;
  }
  &.visible {
    display: flex;
  }
  &.invisible {
    display: none;
  }
  div {
    margin-top: 48px;
    font-size: 22px;
    color: #000;
    background-color: #ecececec;
    border-radius: 10px;
    padding: 8px;
  }
`;
