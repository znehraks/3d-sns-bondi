import { usePlane } from "@react-three/cannon";
import * as THREE from "three";

export const MiniGameFloor = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ref] = usePlane<THREE.Mesh>(() => ({
    mass: 0,
    position: [0, -0.001, 0],
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh name="mini-game-floor" ref={ref} castShadow receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="eeeeee" />
    </mesh>
  );
};
