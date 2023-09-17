import { ReactNode } from "react";
import { styled } from "styled-components";
import { SideBar } from "./gameInterfaces/SideBar";
import { ChatArea } from "./gameInterfaces/ChatArea";
import { Footer } from "./gameInterfaces/Footer";
import { useRecoilState } from "recoil";
import { IsLoadCompletedAtom } from "../../store/PlayersAtom";
import { Notice } from "./gameInterfaces/Notice";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [isLoadCompleted] = useRecoilState(IsLoadCompletedAtom);
  return (
    <Wrapper>
      {/* <audio src="/bgm.mp3" autoPlay loop /> */}
      {children}

      {isLoadCompleted && (
        <>
          <Notice />
          <SideBar />
          <ChatArea />
        </>
      )}
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
