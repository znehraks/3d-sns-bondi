import { Canvas } from "@react-three/fiber";
import { Playground } from "./Playground";
import { OrbitControls } from "@react-three/drei";

export const MainCanvas = () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows
      // camera={{
      //   zoom: 75,
      //   top: 1000,
      //   bottom: -1000,
      //   left: -aspectRatio, // left
      //   right: aspectRatio, // right,
      //   near: -1000,
      //   far: 1000,
      //   position: [1, 5, 5],
      // }}
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.1,
        far: 1000,
        position: [12, 12, 12],
      }}
      // orthographic
    >
      <OrbitControls maxDistance={45} minDistance={5} />
      <color attach="background" args={["#ececec"]} />
      <Playground />
    </Canvas>
  );
};
