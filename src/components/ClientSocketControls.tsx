import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { MeAtom, PlayersAtom } from "../store/PlayersAtom";
import { socket } from "../sockets/clientSocket";

export const ClientSocketControls = () => {
  const [, setPlayers] = useRecoilState(PlayersAtom);
  const [, setMe] = useRecoilState(MeAtom);
  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
    };
    const onDisconnect = () => {
      console.log("disconnected");
    };

    const initialize = (value: { id: string }) => {
      setMe(value);
      console.log("hello");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPlayers = (value: any = []) => {
      setPlayers(value);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("initialize", initialize);
    socket.on("players", onPlayers);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("initialize", initialize);
      socket.off("players", onPlayers);
    };
  }, [setMe, setPlayers]);
  return null;
};
