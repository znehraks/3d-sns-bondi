import { socket } from "../../../../../../../sockets/clientSocket";
import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, Texture, TextureLoader } from "three";
import { groundMapSize } from "../../../../../../../data/constants";

export const Floor = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sandTexture = useLoader(TextureLoader as any, "/sand.jpg") as Texture;
  sandTexture.wrapS = RepeatWrapping;
  sandTexture.wrapT = RepeatWrapping;
  sandTexture.repeat.x = 5;
  sandTexture.repeat.y = 5;

  return (
    <mesh
      castShadow
      receiveShadow
      rotation-x={-Math.PI / 2}
      position-y={-0.001}
      onPointerUp={(e) => {
        socket.emit("move", [e.point.x, 0, e.point.z]);
      }}
    >
      <planeGeometry args={[groundMapSize, groundMapSize]} />
      <meshStandardMaterial map={sandTexture} />
    </mesh>
  );
};
