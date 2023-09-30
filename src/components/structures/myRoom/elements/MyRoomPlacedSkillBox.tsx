import { useTexture } from "@react-three/drei";
import { IPlacedMyRoomObject } from "../../../../store/PlayersAtom";
import { myRoomSkillBoxSize } from "../../../../data";

export const MyRoomPlacedSkillBox = ({
  placedMyRoomSkill,
}: {
  placedMyRoomSkill: IPlacedMyRoomObject;
}) => {
  const texture = useTexture(`/images/${placedMyRoomSkill.name}.webp`);
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
