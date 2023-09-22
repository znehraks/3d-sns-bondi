import { Box } from "@react-three/drei";
import { Vector3 } from "three";

export const TargetMesh = ({
  position,
  color,
}: {
  position: Vector3;
  color: number;
}) => {
  console.log(
    "Math.floor(Math.random() * 16777215).toString(16)",
    Math.floor(Math.random() * 16777215).toString(16)
  );
  return (
    <Box args={[0.2, 0.2, 0.2]} position={position}>
      <meshStandardMaterial color={color} />
    </Box>
  );
};
