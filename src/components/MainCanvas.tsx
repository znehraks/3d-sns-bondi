import { Canvas } from "@react-three/fiber";
import { Playground } from "./Playground";

export const MainCanvas = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows
      camera={{
        zoom: 100,
        top: 1000,
        bottom: -1000,
        left: -aspectRatio, // left
        right: aspectRatio, // right,
        near: -1000,
        far: 1000,
        position: [1, 5, 5],
      }}
      orthographic
    >
      <color attach="background" args={["#ececec"]} />
      <Playground />
    </Canvas>
  );
};
