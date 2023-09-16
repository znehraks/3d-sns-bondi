import { useState } from "react";
import { styled } from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const ChatArea = () => {
  const [isChatContentOpen, setIsChatContentOpen] = useState(false);

  return (
    <ChatAreaWrapper>
      <ChatDropdownWrapper className={isChatContentOpen ? "opened" : "closed"}>
        <ChatAreaTitle>
          <span>채팅창</span>
          {isChatContentOpen ? (
            <KeyboardArrowDownIcon
              onClick={() => {
                setIsChatContentOpen(false);
              }}
            />
          ) : (
            <KeyboardArrowUpIcon
              onClick={() => {
                setIsChatContentOpen(true);
              }}
            />
          )}
        </ChatAreaTitle>
        <ChatContentContainer>
          <ChatLine>
            <ChatSender>닉네임</ChatSender>
            {" : "}
            <ChatContent>내용</ChatContent>
          </ChatLine>
          <ChatLine>
            <ChatSender>닉네임</ChatSender>
            {" : "}
            <ChatContent>내용</ChatContent>
          </ChatLine>
          <ChatLine>
            <ChatSender>닉네임</ChatSender>
            {" : "}
            <ChatContent>내용</ChatContent>
          </ChatLine>
          <ChatLine>
            <ChatSender>닉네임</ChatSender>
            {" : "}
            <ChatContent>내용</ChatContent>
          </ChatLine>
        </ChatContentContainer>
      </ChatDropdownWrapper>
      <ChatInputContainer>
        <input
          onClick={() => {
            setIsChatContentOpen(true);
          }}
          placeholder="메시지 입력"
        />

        <button>보내기</button>
      </ChatInputContainer>
    </ChatAreaWrapper>
  );
};

const ChatAreaWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  & > * {
    transition: 0.4s ease-in-out;
  }
`;

const ChatDropdownWrapper = styled.div`
  width: 100%;
  flex: 20;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #b9beff50;
  border-bottom: 1px solid grey;
  &.opened {
    visibility: visible;
  }
  &.closed {
    & > * {
      display: none;
    }
    visibility: hidden;
    transform: translateY(100%);
  }
`;

const ChatAreaTitle = styled.div`
  padding: 12px;
  font-size: 22px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  svg {
    width: 32px;
    height: 32px;
  }
`;

const ChatContentContainer = styled.div`
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-top: 1px solid grey;
`;

const ChatLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ChatSender = styled.div`
  font-size: 18px;
`;
const ChatContent = styled.div`
  font-size: 18px;
`;

const ChatInputContainer = styled.div`
  padding: 12px;
  width: 100%;
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  background-color: #b9beff50;
  input {
    padding: 10px;
    font-size: 18px;
    width: 100%;
    outline: none;
    border: none;
    background-color: #b9beff;
    border-radius: 8px;
  }
  button {
    position: absolute;
    padding: 10px;
    top: 12px;
    right: 12px;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 8px;
    background-color: #6731a1;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      background-color: #340070;
      color: #ffffff;
    }
  }
`;
