import { useState } from "react";
import styled from "styled-components";

export const MyRoomToolBar = () => {
  const [openedDropdownIndex, setOpenedDropdownIndex] = useState<number>();
  return (
    <>
      <MyRoomToolBarWrapper>
        {["기술스택배치", "가구배치", "메모 남기기"].map((item, idx) => {
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
            <ToolBarDropdownItem>html</ToolBarDropdownItem>
            <ToolBarDropdownItem>css</ToolBarDropdownItem>
            <ToolBarDropdownItem>javascript</ToolBarDropdownItem>
            <ToolBarDropdownItem></ToolBarDropdownItem>
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
  width: 270px;
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
  &:hover {
    box-shadow: 0.5px 0.5px 0.5px 0.5px aqua;
  }
`;

const ToolBarBtnDropdown = styled.div`
  position: fixed;
  left: 0;
  top: 80px;
  width: 270px;
  background-color: rebeccapurple;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const ToolBarDropdownItem = styled.div`
  padding: 10px;
  background-color: aqua;
  width: 100%;
`;
