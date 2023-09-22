import { Box } from "@react-three/drei";

export const TargetMesh = () => {
  console.log(
    "Math.floor(Math.random() * 16777215).toString(16)",
    Math.floor(Math.random() * 16777215).toString(16)
  );
  return (
    <Box
      args={[0.2, 0.2, 0.2]}
      position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, -10]}
    >
      <meshStandardMaterial
        color={Number(`0x${Math.floor(Math.random() * 16777215).toString(16)}`)}
      />
    </Box>
  );
};
