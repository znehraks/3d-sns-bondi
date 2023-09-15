import { Canvas } from "@react-three/fiber";
import { Playground } from "./Playground";

export const MainCanvas = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.1,
        far: 1000,
        position: [12, 12, 12],
      }}
    >
      {/* <color attach="background" args={["#ececec"]} /> */}
      <Playground />
    </Canvas>
  );
};
