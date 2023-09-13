import { ReactNode } from "react";
import { styled } from "styled-components";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      {children}
      <SideBar>
        마이룸, 저장(로컬스토리지), 내 마이룸 입장 시 기술 스택 큐브 배치 등,
        다른 사람 마이룸 입장 시, 그 사람의 배치에 맞는 인테리어로 등장
      </SideBar>
      <ChatArea>채팅창</ChatArea>
      {/* <BottomUtilBar /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
`;

const BottomUtilBar = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: red;
  width: 100%;
  height: 100px;
`;

const SideBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: lime;
  width: 100px;
  height: 100%;
`;

const ChatArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  background-color: #555555;
  opacity: 0.5;
  width: 400px;
  height: 100%;
`;
