import { useTexture } from "@react-three/drei";
import { IPlacedMyRoomSkill } from "../../../../store/PlayersAtom";
import { myRoomSkillBoxSize } from "../../../../data";

export const MyRoomPlacedSkillBox = ({
  placedMyRoomSkill,
}: {
  placedMyRoomSkill: IPlacedMyRoomSkill;
}) => {
  const texture = useTexture(`/images/${placedMyRoomSkill.name}.png`);
  return (
    <mesh
      castShadow
      receiveShadow
      name={`my-room-${placedMyRoomSkill.name}`}
      position={placedMyRoomSkill.position}
    >
      <boxGeometry
        args={[myRoomSkillBoxSize, myRoomSkillBoxSize, myRoomSkillBoxSize]}
      />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
