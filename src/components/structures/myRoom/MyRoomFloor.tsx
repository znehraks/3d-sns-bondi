import { socket } from "../../../sockets/clientSocket";
import { useLoader } from "@react-three/fiber";
import { DoubleSide, RepeatWrapping, Texture, TextureLoader } from "three";

export const MyRoomFloor = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sandTexture = useLoader(TextureLoader as any, "/sand.jpg") as Texture;
  sandTexture.wrapS = RepeatWrapping;
  sandTexture.wrapT = RepeatWrapping;
  sandTexture.repeat.x = 5;
  sandTexture.repeat.y = 5;
  return (
    <mesh
      position-y={-2.5}
      castShadow
      receiveShadow
      rotation-x={-Math.PI / 2}
      onPointerDown={() => {}}
      onPointerUp={(e) => {
        socket.emit("move", [e.point.x, 0, e.point.z]);
      }}
    >
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial side={DoubleSide} color={"aqua"} />
    </mesh>
  );
};
