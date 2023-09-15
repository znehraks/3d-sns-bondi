import { useSelect } from "@react-three/drei";
import { socket } from "../sockets/clientSocket";
import { useState } from "react";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, Texture, TextureLoader } from "three";

export const Floor = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sandTexture = useLoader(TextureLoader as any, "/sand.jpg") as Texture;
  sandTexture.wrapS = RepeatWrapping;
  sandTexture.wrapT = RepeatWrapping;
  sandTexture.repeat.x = 5;
  sandTexture.repeat.y = 5;

  const [pointerDownTime, setPointerDownTime] = useState<number>();
  const select = useSelect();

  console.log("select", select);
  return (
    <mesh
      castShadow
      receiveShadow
      rotation-x={-Math.PI / 2}
      position-y={-0.001}
      // onClick={(e) => {
      //   socket.emit("move", [e.point.x, 0, e.point.z]);
      // }}
      onPointerDown={() => {
        setPointerDownTime(Number(new Date()));
      }}
      onPointerUp={(e) => {
        if (
          pointerDownTime &&
          Number(new Date()) - Number(pointerDownTime) > 300
        ) {
          setPointerDownTime(undefined);
          return;
        }
        socket.emit("move", [e.point.x, 0, e.point.z]);
      }}
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={sandTexture} />
    </mesh>
  );
};
