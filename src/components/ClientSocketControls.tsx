import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { PlayersAtom } from "../store/PlayersAtom";
import { socket } from "../sockets/clientSocket";

export const ClientSocketControls = () => {
  const [, setPlayers] = useRecoilState(PlayersAtom);
  useEffect(() => {
    const onConnect = () => {
      console.log("connected");
    };
    const onDisconnect = () => {
      console.log("disconnected");
    };

    const onHello = () => {
      console.log("hello");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPlayers = (value: any = []) => {
      setPlayers(value);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("players", onPlayers);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("players", onPlayers);
    };
  }, [setPlayers]);
  return null;
};
