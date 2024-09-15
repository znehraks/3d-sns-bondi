import { Canvas } from "@react-three/fiber";
import { RootMap } from "./maps/RootMap";
import { useRecoilValue } from "recoil";
import { CurrentMapAtom } from "../../../store/PlayersAtom";
import { Physics } from "@react-three/cannon";
import { useEffect, useState } from "react";

export const MainCanvas = () => {
  const currentMap = useRecoilValue(CurrentMapAtom);
  const [aspectRatio, setAspectRatio] = useState(window.innerWidth / window.innerHeight);

  useEffect(() => {
    const onResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
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
        gravity={[0, -20, 0]}
        defaultContactMaterial={{ restitution: 0.1, friction: 0 }}
        allowSleep
      >
        <RootMap />
      </Physics>
    </Canvas>
  );
};
