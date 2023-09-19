import { useTexture } from "@react-three/drei";
import { IPlacedMyRoomSkillAtom } from "../../../../store/PlayersAtom";
import { myRoomSkillBoxSize } from "../../../../data";

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
        <boxGeometry
          args={[myRoomSkillBoxSize, myRoomSkillBoxSize, myRoomSkillBoxSize]}
        />
        <meshStandardMaterial depthWrite={false} map={texture} />
      </mesh>
    </instancedMesh>
  );
};
