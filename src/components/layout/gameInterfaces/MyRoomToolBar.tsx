import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CurrentPlacingMyRoomSkillAtom } from "../../../store/PlayersAtom";
const skills = [
  "html",
  "css",
  "javascript",
  "typescript",
  "react",
  "next",
  "node",
  "graphql",
  "three",
  "pixi",
  "python",
  "flutter",
  "aws",
];
export const MyRoomToolBar = () => {
  const [openedDropdownIndex, setOpenedDropdownIndex] = useState<number>();
  const [, setCurrentPlacingMyRoomSkill] = useRecoilState(
    CurrentPlacingMyRoomSkillAtom
  );

  return (
    <>
      <MyRoomToolBarWrapper>
        {["기술", "가구"].map((item, idx) => {
          return (
            <ToolBarBtn
              onClick={() => {
                setOpenedDropdownIndex((prev) => {
                  if (prev === idx) {
                    return undefined;
                  }
                  return idx;
                });
              }}
            >
              {item}
            </ToolBarBtn>
          );
        })}
        {openedDropdownIndex !== undefined && (
          <ToolBarBtnDropdown>
            {skills.map((skill) => (
              <ToolBarDropdownItem
                onClick={() => {
                  setCurrentPlacingMyRoomSkill((prev) => {
                    if (prev === skill) return undefined;
                    return skill;
                  });
                  setOpenedDropdownIndex(undefined);
                }}
                src={`/images/${skill}.png`}
              ></ToolBarDropdownItem>
            ))}
          </ToolBarBtnDropdown>
        )}
      </MyRoomToolBarWrapper>
      {/* {openedDropdownIndex === 0 && (
        <ToolBarItemDropdown>hhih</ToolBarItemDropdown>
      )} */}
    </>
  );
};

const MyRoomToolBarWrapper = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  width: 200px;
  height: 80px;
  transform: translateX(-50%);
  background-color: #ffffffee;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const ToolBarBtn = styled.div`
  width: 60px;
  height: 60px;
  background-color: aliceblue;
  border-radius: 10px;
  transition: 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: aqua;
  }
`;

const ToolBarBtnDropdown = styled.div`
  position: fixed;
  left: 0;
  top: 80px;
  width: 200px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  gap: 5px;
`;

const ToolBarDropdownItem = styled.div<{ src: string }>`
  background-color: #eeeeee;
  width: 100%;
  height: 46px;
  background-image: ${(props) => `url(${props.src})`};
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;
