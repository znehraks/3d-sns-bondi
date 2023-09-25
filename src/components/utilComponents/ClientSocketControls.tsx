import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  ChatsAtom,
  CurrentMyRoomPlayerAtom,
  EnterNoticeAtom,
  ExitNoticeAtom,
  IChat,
  INotice,
  IPlayer,
  MeAtom,
  PlayersAtom,
} from "../../store/PlayersAtom";
import { socket } from "../../sockets/clientSocket";

export const ClientSocketControls = () => {
  const setPlayers = useSetRecoilState(PlayersAtom);
  const [me, setMe] = useRecoilState(MeAtom);
  const setChats = useSetRecoilState(ChatsAtom);
  const setEnterNotice = useSetRecoilState(EnterNoticeAtom);
  const setExitNotice = useSetRecoilState(ExitNoticeAtom);
  const [currentMyRoomPlayer, setCurrentMyRoomPlayer] = useRecoilState(
    CurrentMyRoomPlayerAtom
  );

  useEffect(() => {
    const handleConnect = () => {
      console.info("connected");
    };
    const handleDisconnect = () => {
      console.info("disconnected");
    };

    const handleInitialize = (value: IPlayer) => {
      setMe(value);
    };

    const handleEnter = (value: INotice) => {
      setEnterNotice(value);
    };

    const handleExit = (value: INotice) => {
      setExitNotice(value);
    };

    const handlePlayers = (value: IPlayer[]) => {
      console.log("value", value);
      setPlayers(value);
      const newMe = value.find((p) => p && me && p?.id === me?.id);
      if (newMe) {
        setMe(newMe);
      }
      const currentMyRoomUpdated = value.find(
        (p) => p && currentMyRoomPlayer && p?.id === currentMyRoomPlayer?.id
      );
      console.log("currentMyRoomUpdated", currentMyRoomUpdated);
      if (currentMyRoomUpdated) {
        setCurrentMyRoomPlayer(currentMyRoomUpdated);
      }
    };

    const handleNewText = ({
      senderId,
      senderNickname,
      senderJobPosition,
      text,
      timestamp,
    }: IChat) => {
      setChats((prev) => [
        ...prev,
        { senderId, senderNickname, senderJobPosition, text, timestamp },
      ]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("initialize", handleInitialize);
    socket.on("enter", handleEnter);
    socket.on("exit", handleExit);
    socket.on("players", handlePlayers);
    socket.on("newText", handleNewText);
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("initialize", handleInitialize);
      socket.off("enter", handleEnter);
      socket.off("exit", handleExit);
      socket.off("players", handlePlayers);
      socket.off("newText", handleNewText);
    };
  }, [
    currentMyRoomPlayer,
    currentMyRoomPlayer?.id,
    me,
    me?.id,
    setChats,
    setCurrentMyRoomPlayer,
    setEnterNotice,
    setExitNotice,
    setMe,
    setPlayers,
  ]);
  return null;
};
