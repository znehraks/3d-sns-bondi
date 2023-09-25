import { PublicApi, useSphere } from "@react-three/cannon";
import { useEffect } from "react";
import { Mesh } from "three";

type BulletProps = {
  position: number[];
  shoot: (mesh: Mesh, api: PublicApi) => void;
};

export const Bullet = ({ position, shoot }: BulletProps) => {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [position[0], position[1], position[2]],
  }));

  useEffect(() => {
    if (ref.current) shoot(ref.current, api);
  }, [api, ref, shoot]);

  return (
    <mesh ref={ref} position={[position[0], position[1], position[2]]}>
      <sphereGeometry attach="geometry" args={[0.1, 32, 32]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  );
};
