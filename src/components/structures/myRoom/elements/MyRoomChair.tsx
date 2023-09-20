import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";
const name = "chair";
const scale = 0.1;
export const MyRoomChair = () => {
  const { scene } = useGLTF("/models/Chair.glb");
  const position = useMemo(() => new Vector3(1.5, -2.5, -0.8), []);
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
        rotation-y={Math.PI}
        object={scene}
      />
    </>
  );
};
