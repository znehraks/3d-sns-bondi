import { Billboard, Text } from "@react-three/drei";
import { IPlayer } from "../../../../../../../store/PlayersAtom";

export const NicknameBoard = ({ player }: { player: IPlayer }) => {
  return (
    <Billboard
      position={[
        player.position[0],
        player.position[1] + 2,
        player.position[2],
      ]}
      name={`nickname-billboard-${player.id}`}
    >
      <Text font={"/NotoSansKR-Regular.ttf"} fontSize={0.25} color={0x000000}>
        {`${player.nickname}[${player.jobPosition}]`}
      </Text>
    </Billboard>
  );
};
