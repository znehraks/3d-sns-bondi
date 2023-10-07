import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import {
  CurrentPlacingMyRoomFurnitureAtom,
  CurrentPlacingMyRoomMemoAtom,
  CurrentPlacingMyRoomSkillAtom,
  //   CurrentRotationingMyRoomObjectAtom,
} from "../../../../../store/PlayersAtom";
import { useRecoilValue } from "recoil";

export const Tooltip = () => {
  const ref = useRef<HTMLDivElement>(null);
  const currentPlacingMyRoomFurniture = useRecoilValue(
    CurrentPlacingMyRoomFurnitureAtom
  );
  const currentPlacingMyRoomSkill = useRecoilValue(
    CurrentPlacingMyRoomSkillAtom
  );
  const currentPlacingMyRoomMemo = useRecoilValue(CurrentPlacingMyRoomMemoAtom);
  const isPlacing = useMemo(() => {
    return (
      currentPlacingMyRoomFurniture ||
      currentPlacingMyRoomSkill ||
      currentPlacingMyRoomMemo
    );
  }, [
    currentPlacingMyRoomFurniture,
    currentPlacingMyRoomMemo,
    currentPlacingMyRoomSkill,
  ]);

  //   const currentRotationingMyRoomObject = useRecoilValue(
  //     CurrentRotationingMyRoomObjectAtom
  //   );

  useEffect(() => {
    if (!ref.current) return;
    const handlePointerMove = (e: PointerEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX + 50}px,${
        e.clientY - 50
      }px)`;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);
  return (
    <Wrapper ref={ref} className={isPlacing ? "visible" : "invisible"}>
      원하는 곳에서 마우스를 클릭하면 배치됩니다.
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  pointer-events: none;
  text-shadow: 1px 1px 1px #aaa;
  &.visible {
    display: block;
  }
  &.invisible {
    display: none;
  }
`;
