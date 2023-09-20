import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";
const name = "bed";
const scale = 0.04;
export const MyRoomBed = () => {
  const { scene } = useGLTF("/models/Bed.glb");
  const position = useMemo(() => new Vector3(-1.9, -2.2, -1.55), []);
  // const rotation = useMemo(() => new Vector3(0, Math.PI / 2, 0), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene]);
  console.log("scene", scene);
  return (
    <>
      <primitive name={name} scale={scale} position={position} object={scene} />
    </>
  );
};
