import { styled } from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useCallback, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMapAtom,
  CurrentMyRoomPlayerAtom,
  MeAtom,
  PlayersAtom,
  TMaps,
} from "../../../store/PlayersAtom";

export const SideBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentMap, setCurrentMap] = useRecoilState(CurrentMapAtom);
  const [, setCurrentMyRoomPlayer] = useRecoilState(CurrentMyRoomPlayerAtom);
  const players = useRecoilValue(PlayersAtom);
  const [me] = useRecoilState(MeAtom);
  const handleClick = useCallback(
    (mapType: TMaps) => () => {
      setCurrentMap(mapType);
      setCurrentMyRoomPlayer(
        mapType === "MY_ROOM" ? players.find((p) => p.id === me?.id) : undefined
      );
      setIsDropdownOpen(false);
    },
    [me?.id, players, setCurrentMap, setCurrentMyRoomPlayer]
  );
  return (
    <>
      <SideBarWrapper className={isDropdownOpen ? "opened" : "closed"}>
        <div
          onClick={handleClick(currentMap !== "MY_ROOM" ? "MY_ROOM" : "GROUND")}
        >
          <HomeIcon />{" "}
          <span>
            {currentMap !== "MY_ROOM" ? "내 방으로 가기" : "놀이터로 가기"}
          </span>
        </div>
        <div onClick={handleClick("MINI_GAME")}>
          <CategoryIcon /> <span>게임 방으로 가기</span>
        </div>
      </SideBarWrapper>
      <DropdownController
        onClick={() => {
          setIsDropdownOpen((prev) => !prev);
        }}
      >
        {isDropdownOpen ? <CloseIcon /> : <MenuIcon />}
      </DropdownController>
    </>
  );
};
const SideBarWrapper = styled.div`
  transition: 0.4s ease-in-out;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #b9beffdd;
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 42px 0px;
  border-radius: 0 10px 10px 0;
  &.opened {
    transform: translateX(0);
  }
  &.closed {
    transform: translateX(-100%);
  }

  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    gap: 10px;
    border-bottom: 1px solid grey;
    cursor: pointer;

    svg {
      width: 48px;
      height: 48px;
      color: #340070;
    }
    span {
      font-size: 18px;
      padding-top: 8px;
      color: #340070;
      font-weight: 500;
    }

    & > * {
      transition: 0.2s ease-in-out;
    }

    &:hover {
      background-color: #b9beff;
      span {
        font-size: 20px;
        font-weight: 800;
      }

      svg {
        width: 50px;
        height: 50px;
        color: #340070;
      }
    }
  }
`;

const DropdownController = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #340070;
  cursor: pointer;
  svg {
    font-weight: 700;
    width: 42px;
    height: 42px;
  }
`;
