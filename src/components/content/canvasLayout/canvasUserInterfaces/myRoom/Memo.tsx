import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CurrentSelectedMemoAtom } from "../../../../../store/PlayersAtom";
import dayjs from "dayjs";
import { useEffect } from "react";

export const Memo = () => {
  const [currentSelectedMemo, setCurrentSelectedMemo] = useRecoilState(
    CurrentSelectedMemoAtom
  );
  useEffect(() => {
    const handlePointerDown = () => {
      setCurrentSelectedMemo(undefined);
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [setCurrentSelectedMemo]);
  if (!currentSelectedMemo) return null;
  return (
    <MemoWrapper>
      <MemoText>{currentSelectedMemo.text}</MemoText>
      <MemoBottomContainer>
        <MemoAuthor>작성자: {currentSelectedMemo.authorNickname}</MemoAuthor>
        <MemoTime>
          {dayjs(currentSelectedMemo.timestamp).format("YYYY-MM-DD, hh:mm:ss")}
        </MemoTime>
      </MemoBottomContainer>
    </MemoWrapper>
  );
};

const MemoWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  font-size: 22px;
  color: #000000;
  background-color: yellow;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MemoText = styled.div`
  flex: 4;
`;

const MemoBottomContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
`;
const MemoAuthor = styled.div``;

const MemoTime = styled.div``;
