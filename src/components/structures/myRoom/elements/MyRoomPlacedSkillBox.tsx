import { useTexture } from "@react-three/drei";
import { IPlacedMyRoomSkillAtom } from "../../../../store/PlayersAtom";

export const MyRoomPlacedSkillBox = ({
  placedMyRoomSkill,
}: {
  placedMyRoomSkill: IPlacedMyRoomSkillAtom;
}) => {
  const texture = useTexture(`/images/${placedMyRoomSkill.name}.png`);
  return (
    <instancedMesh>
      <mesh
        castShadow
        receiveShadow
        name={placedMyRoomSkill.name}
        position={placedMyRoomSkill.position}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </instancedMesh>
  );
};
