import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";
const name = "desk";
const scale = 1;
export const MyRoomStandingDesk = () => {
  const { scene } = useGLTF("/models/Standing Desk.glb");
  const position = useMemo(() => new Vector3(1.5, -1.65, -2), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene]);
  console.log("scene", scene);
  return (
    <>
      <primitive
        name={name}
        scale={scale}
        position={position}
        rotation-y={-Math.PI}
        object={scene}
      />
    </>
  );
};
