import { ReactNode } from "react";
import { styled } from "styled-components";
import { SideBar } from "../gameInterfaces/SideBar";
import { ChatArea } from "../gameInterfaces/ChatArea";
import { Footer } from "../gameInterfaces/Footer";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      {/* <audio src="/bgm.mp3" autoPlay loop /> */}
      {children}
      <SideBar />
      <ChatArea />
      {/* <BottomUtilBar /> */}
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
  
`;

// const BottomUtilBar = styled.div`
//   position: fixed;
//   bottom: 0;
//   right: 0;
//   background-color: red;
//   width: 100%;
//   height: 100px;
// `;
