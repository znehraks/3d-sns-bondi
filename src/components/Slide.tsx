import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const Slide = (props) => {
  const { scene } = useGLTF("/models/Slide.glb");
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [scene]);

  return <primitive position-z={10} position-x={-5} object={scene} />;
};
