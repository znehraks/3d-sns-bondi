import { ReactNode } from "react";
import { styled } from "styled-components";
import { SideBar } from "./canvasUserInterfaces/common/SideBar";
import { ChatArea } from "./canvasUserInterfaces/common/ChatArea";
import { Footer } from "./canvasUserInterfaces/common/Footer";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentMapAtom,
  CurrentMyRoomPlayerAtom,
  IsLoadCompletedAtom,
  MeAtom,
  PlayersAtom,
} from "../../../store/PlayersAtom";
import { Notice } from "./canvasUserInterfaces/common/Notice";
import { Minimap } from "./canvasUserInterfaces/ground/Minimap";
import { MyRoomToolBar } from "./canvasUserInterfaces/myRoom/MyRoomToolBar";
import { Popup } from "./canvasUserInterfaces/ground/Popup";
import { Memo } from "./canvasUserInterfaces/myRoom/Memo";
import { Crosshair } from "./canvasUserInterfaces/miniGame/Crosshair";
import { ObjectInteraction } from "./canvasUserInterfaces/ground/ObjectInteraction";
import { MiniGameUI } from "./canvasUserInterfaces/miniGame/MiniGameUI";
import { SelectedObjectMenuBar } from "./canvasUserInterfaces/myRoom/SelectedObjectMenuBar";
import { Tooltip } from "./canvasUserInterfaces/myRoom/Tooltip";
import { ChatBubble } from "./canvasUserInterfaces/common/ChatBubble";

export const CanvasLayout = ({ children }: { children: ReactNode }) => {
  const [isLoadCompleted] = useRecoilState(IsLoadCompletedAtom);
  const currentMap = useRecoilValue(CurrentMapAtom);

  const players = useRecoilValue(PlayersAtom);
  const [currentMyRoomPlayer] = useRecoilState(CurrentMyRoomPlayerAtom);
  const me = useRecoilValue(MeAtom);
  return (
    <Wrapper>
      {/* <audio src="/bgm.mp3" autoPlay loop /> */}
      {children}

      {isLoadCompleted && (
        <>
          <ObjectInteraction />
          <Notice />
          <SideBar />
          <Minimap />
          <Memo />
          {currentMap !== "MINI_GAME" && (
            <>
              <ChatArea />
              {players.map((player) => (
                <ChatBubble key={player.id} senderId={player.id} />
              ))}
            </>
          )}

          {currentMap === "GROUND" && (
            <>
              {currentMyRoomPlayer && me?.id !== currentMyRoomPlayer?.id && (
                <Popup />
              )}
            </>
          )}

          {currentMap === "MY_ROOM" && (
            <>
              <MyRoomToolBar />
              <SelectedObjectMenuBar />
              <Tooltip />
            </>
          )}

          {currentMap === "MINI_GAME" && (
            <>
              <MiniGameUI />
              <Crosshair />
            </>
          )}
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
