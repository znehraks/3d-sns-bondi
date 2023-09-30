import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentPlacingMyRoomFurnitureAtom,
  CurrentSelectedMyRoomObjectAtom,
} from "../../../store/PlayersAtom";
import styled from "styled-components";
import { useEffect, useRef } from "react";

export const SelectedObjectMenuBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const currentSelectedMyRoomObject = useRecoilValue(
    CurrentSelectedMyRoomObjectAtom
  );
  const [, setCurrentPlacingMyRoomFurniture] = useRecoilState(
    CurrentPlacingMyRoomFurnitureAtom
  );

  useEffect(() => {
    if (!ref.current) return;
    if (!currentSelectedMyRoomObject) return;
    const {
      clientPosition: { x, y },
    } = currentSelectedMyRoomObject;
    ref.current.style.transform = `translate(${x + 50}px, ${y - 50}px)`;
  }, [currentSelectedMyRoomObject]);

  return (
    <MenuBarWrapper ref={ref}>
      <Menu
        onClick={() => {
          setCurrentPlacingMyRoomFurniture(currentSelectedMyRoomObject?.name);
        }}
      >
        이동
      </Menu>
      <Menu>회전</Menu>
    </MenuBarWrapper>
  );
};

const MenuBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  background-color: #fff;
  width: 100px;
  height: 50px;
  font-size: 18px;
  box-shadow: 2px 2px 2px 2px #eee;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
`;

const Menu = styled.button`
  outline: none;
  border: none;
  width: 35px;
  height: 35px;
  font-size: 12px;
  background-color: #f0f9ff;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  border-radius: 8px;
  &:hover {
    background-color: #3f97cd;
    color: #ffffff;
  }
`;
