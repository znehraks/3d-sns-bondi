import { ReactNode } from "react";
import { styled } from "styled-components";
import { SideBar } from "./gameInterfaces/SideBar";
import { ChatArea } from "./gameInterfaces/ChatArea";
import { Footer } from "./gameInterfaces/Footer";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMapAtom,
  CurrentMyRoomPlayerAtom,
  IsLoadCompletedAtom,
  MeAtom,
} from "../../store/PlayersAtom";
import { Notice } from "./gameInterfaces/Notice";
import { Minimap } from "./gameInterfaces/Minimap";
import { MyRoomToolBar } from "./gameInterfaces/MyRoomToolBar";
import { Popup } from "./gameInterfaces/Popup";
import { Memo } from "./gameInterfaces/Memo";

export const Layout = ({ children }: { children: ReactNode }) => {
  const [isLoadCompleted] = useRecoilState(IsLoadCompletedAtom);
  const currentMap = useRecoilValue(CurrentMapAtom);
  const [currentMyRoomPlayer] = useRecoilState(CurrentMyRoomPlayerAtom);
  const me = useRecoilValue(MeAtom);
  return (
    <Wrapper>
      {/* <audio src="/bgm.mp3" autoPlay loop /> */}
      {children}

      {isLoadCompleted && (
        <>
          {currentMap === "MY_ROOM" && <MyRoomToolBar />}
          <Notice />
          <SideBar />
          <ChatArea />
          <Minimap />
          {currentMyRoomPlayer && me?.id !== currentMyRoomPlayer?.id && (
            <Popup />
          )}
          <Memo />
        </>
      )}
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
