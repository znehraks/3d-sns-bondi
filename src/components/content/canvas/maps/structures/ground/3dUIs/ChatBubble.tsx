import { Billboard, Text } from "@react-three/drei";
import { IChat, IPlayer, MeAtom } from "../../../../../../../store/PlayersAtom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export const ChatBubble = ({
  player,
  chat,
}: {
  player: IPlayer;
  chat: IChat | undefined;
}) => {
  const me = useRecoilValue(MeAtom);
  const [visible, setVisible] = useState(true);
  // timestamp 비교해서 visible 변경
  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [chat, chat?.timestamp]);

  if (!chat?.text) return null;
  return (
    <Billboard
      visible={visible}
      position={[
        player.position[0],
        player.position[1] + 4,
        player.position[2],
      ]}
      name={`chat-bubble-billboard-${player.id}`}
    >
      <Text
        font={"/NotoSansKR-Regular.ttf"}
        fontSize={0.3}
        color={me.id === player.id ? 0x004acc : 0x222222}
      >
        {chat?.text.length > 30
          ? `"${chat?.text.slice(0, 30)}..."`
          : `"${chat?.text}"`}
      </Text>
    </Billboard>
  );
};
