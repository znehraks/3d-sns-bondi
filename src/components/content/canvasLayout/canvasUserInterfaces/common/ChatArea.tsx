import { useCallback, useRef, useState } from "react";
import { styled } from "styled-components";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { isValidText } from "../../../../../utils";
import { socket } from "../../../../../sockets/clientSocket";
import { useRecoilValue } from "recoil";
import { ChatsAtom } from "../../../../../store/PlayersAtom";

export const ChatArea = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isChatContentOpen, setIsChatContentOpen] = useState(false);
  const chats = useRecoilValue(ChatsAtom);
  const [tempText, setTempText] = useState<string>();

  const handleSubmit = useCallback(() => {
    if (isValidText(tempText)) {
      socket.emit("newText", tempText);
      setTempText("");
      if (!ref.current) return;
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [tempText]);

  const handleSubmitEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isValidText(tempText)) {
        if (e.key === "Enter") {
          socket.emit("newText", tempText);
          setTempText("");
          if (!ref.current) return;
          ref.current.scrollTop = ref.current.scrollHeight;
        }
      }
    },
    [tempText]
  );

  return (
    <ChatAreaWrapper>
      <ChatDropdownWrapper className={isChatContentOpen ? "opened" : "closed"}>
        <ChatAreaTitle>
          <span>채팅창</span>
          {/* {isChatContentOpen ? (
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
          )} */}
        </ChatAreaTitle>
        <ChatContentContainer ref={ref}>
          {chats.map(({ senderNickname, senderJobPosition, text }, index) => (
            <ChatLine key={index}>
              <ChatSender>{`${senderNickname}[${senderJobPosition}]`}</ChatSender>
              {" : "}
              <ChatContent>{text}</ChatContent>
            </ChatLine>
          ))}
        </ChatContentContainer>
      </ChatDropdownWrapper>
      <ChatInputContainer>
        <input
          onClick={() => {
            setIsChatContentOpen(true);
          }}
          value={tempText}
          onChange={(e) => setTempText(e.currentTarget.value)}
          onKeyUp={handleSubmitEnter}
          placeholder="글 입력"
        />

        <button onClick={handleSubmit}>보내기</button>
      </ChatInputContainer>
    </ChatAreaWrapper>
  );
};

const ChatAreaWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 30vw;
  max-width: 400px;
  height: 55%;
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
  overflow-y: hidden;
  /* &.opened {
    visibility: visible;
  }
  &.closed {
    & > * {
      display: none;
    }
    visibility: hidden;
    transform: translateY(100%);
  } */
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-top: 1px solid grey;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 96px;
`;

const ChatLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ChatSender = styled.div`
  font-size: 18px;
  font-weight: 700;
  text-shadow: 0.5px 0.5px 0.5px #ececec;
`;
const ChatContent = styled.div`
  max-width: 250px;
  font-size: 18px;
  font-weight: 700;
  text-shadow: 0.5px 0.5px 0.5px #ececec;
  overflow-wrap: break-word;
`;

const ChatInputContainer = styled.div`
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  background-color: #b9beff50;
  border-radius: 10px;
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
