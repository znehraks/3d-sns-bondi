import { Canvas } from "@react-three/fiber";
import { Playground } from "../maps/Playground";
import { useRecoilValue } from "recoil";
import { CurrentMapAtom } from "../../store/PlayersAtom";
import { Physics } from "@react-three/cannon";

export const MainCanvas = () => {
  const currentMap = useRecoilValue(CurrentMapAtom);
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      shadows
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 100000,
        position: [12, 12, 12],
      }}
    >
      {currentMap === "MY_ROOM" && (
        <color attach="background" args={["beige"]} />
      )}
      <Physics
        gravity={[0, 0, 0]}
        defaultContactMaterial={{ restitution: 1, friction: 1 }}
        allowSleep={false}
      >
        <Playground />
      </Physics>
    </Canvas>
  );
};
