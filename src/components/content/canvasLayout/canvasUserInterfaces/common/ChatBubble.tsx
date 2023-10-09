import { useEffect, useState } from "react";
import styled from "styled-components";

export const ChatBubble = ({ senderId }: { senderId: string }) => {
  const [visible, setVisible] = useState(true);

  // useEffect(() => {
  //   setVisible(true);
  //   const timeout = setTimeout(() => {
  //     setVisible(false);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  return visible ? (
    <ChatBubbleWrapper id={`chat-bubble-${senderId}`}>
      {senderId}
    </ChatBubbleWrapper>
  ) : null;
};

const ChatBubbleWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  word-break: break-all;
  white-space: normal;
  min-width: 100px;
  max-width: 200px;
  min-height: 20px;
  font-size: 18px;
  background-color: #007bff; /* 말풍선 색상 */
  color: #fff; /* 텍스트 색상 */
  font-weight: 600;
  border: 0.5px solid grey;
  border-radius: 8px;
  padding: 10px;
`;
