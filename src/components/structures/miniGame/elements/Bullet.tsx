import { PublicApi, useSphere } from "@react-three/cannon";
import { SetStateAction, useEffect } from "react";
import { Mesh } from "three";

type BulletProps = {
  position: number[];
  shoot: (api: PublicApi) => void;
  setIsBulletRendered: React.Dispatch<SetStateAction<boolean>>;
};

export const Bullet = ({
  position,
  shoot,
  setIsBulletRendered,
}: BulletProps) => {
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [position[0], position[1], position[2]],
    allowSleep: false,
    fixedRotation: true,
    collisionResponse: false,
  }));

  useEffect(() => {
    if (ref.current) shoot(api);
    const disappear = setTimeout(() => {
      setIsBulletRendered(false);
    }, 5000);
    return () => {
      clearTimeout(disappear);
    };
  }, [api, ref, setIsBulletRendered, shoot]);

  return (
    <mesh ref={ref} position={[position[0], position[1], position[2]]}>
      <sphereGeometry attach="geometry" args={[0.01]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  );
};
