import { useBox } from "@react-three/cannon";
import { Box } from "@react-three/drei";
import { Mesh, Vector3 } from "three";

export const TargetMesh = ({
  position,
  color,
}: {
  position: Vector3;
  color: number;
}) => {
  // 물리엔진 넣고, 충돌시에 점수가 오르도록 이벤트 함수 구현하면 됨
  const [ref] = useBox<Mesh>(() => ({
    mass: 1,
    position: [position.x, position.y, position.z],
    onCollide: () => {
      console.log("hi");
    },
  }));
  return (
    <Box ref={ref} args={[0.2, 0.2, 0.2]} position={position}>
      <meshStandardMaterial color={color} />
    </Box>
  );
};
