import { ReactNode } from "react";
import { styled } from "styled-components";
import { SideBar } from "../gameInterfaces/common/SideBar";
import { ChatArea } from "../gameInterfaces/common/ChatArea";
import { Footer } from "../gameInterfaces/common/Footer";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMapAtom,
  CurrentMyRoomPlayerAtom,
  IsLoadCompletedAtom,
  MeAtom,
} from "../../store/PlayersAtom";
import { Notice } from "../gameInterfaces/common/Notice";
import { Minimap } from "../gameInterfaces/ground/Minimap";
import { MyRoomToolBar } from "../gameInterfaces/myRoom/MyRoomToolBar";
import { Popup } from "../gameInterfaces/ground/Popup";
import { Memo } from "../gameInterfaces/myRoom/Memo";
import { Crosshair } from "../gameInterfaces/miniGame/Crosshair";
import { ObjectInteraction } from "../gameInterfaces/ground/ObjectInteraction";
import { MiniGameLayout } from "../gameInterfaces/miniGame/MiniGameLayout";

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
          {currentMap === "MINI_GAME" && <MiniGameLayout />}
          <ObjectInteraction />
          <Notice />
          <SideBar />
          {currentMap !== "MINI_GAME" && <ChatArea />}
          <Minimap />
          {currentMap !== "MY_ROOM" &&
            currentMyRoomPlayer &&
            me?.id !== currentMyRoomPlayer?.id && <Popup />}
          <Memo />
          <Crosshair />
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
