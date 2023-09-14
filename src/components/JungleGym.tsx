import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const JungleGym = (props) => {
  const { scene } = useGLTF("/models/Jungle gym.glb");
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [scene]);
  return <primitive position-z={-12} position-x={-12} object={scene} />;
};
