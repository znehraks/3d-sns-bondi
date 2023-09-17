import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  ChatsAtom,
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
  const setMe = useSetRecoilState(MeAtom);
  const setChats = useSetRecoilState(ChatsAtom);
  const setEnterNotice = useSetRecoilState(EnterNoticeAtom);
  const setExitNotice = useSetRecoilState(ExitNoticeAtom);

  useEffect(() => {
    const handleConnect = () => {
      console.log("connected");
    };
    const handleDisconnect = () => {
      console.log("disconnected");
    };

    const handleInitialize = (value: { id: string }) => {
      setMe(value);
      console.log("hello");
    };

    const handleEnter = (value: INotice) => {
      setEnterNotice(value);
      console.log("hello");
    };
    const handleExit = (value: INotice) => {
      setExitNotice(value);
      console.log("hello");
    };

    const handlePlayers = (value: IPlayer[]) => {
      setPlayers(value);
    };

    const handleNewText = ({
      senderNickname,
      senderJobPosition,
      text,
    }: IChat) => {
      setChats((prev) => [
        ...prev,
        { senderNickname, senderJobPosition, text },
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
  }, [setChats, setEnterNotice, setExitNotice, setMe, setPlayers]);
  return null;
};
