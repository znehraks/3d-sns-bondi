import { useBox } from "@react-three/cannon";
import { SetStateAction } from "react";
import { Mesh, Vector3 } from "three";

export const TargetMesh = ({
  position,
  color,
  setIsHit,
}: {
  position: Vector3;
  color: number;
  setIsHit: React.Dispatch<SetStateAction<boolean>>;
}) => {
  // 물리엔진 넣고, 충돌시에 점수가 오르도록 이벤트 함수 구현하면 됨
  const [ref] = useBox<Mesh>(() => ({
    mass: 0.1,
    position: [position.x, position.y, position.z],
    onCollide: () => {
      console.log("충돌");
      setIsHit(true);
    },
  }));

  console.log(ref);
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
