import { useLoader } from "@react-three/fiber";
import { RepeatWrapping, Texture, TextureLoader } from "three";
import { myRoomSize } from "../../../../data";

export const MyRoomFloor = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sandTexture = useLoader(TextureLoader as any, "/sand.jpg") as Texture;
  sandTexture.wrapS = RepeatWrapping;
  sandTexture.wrapT = RepeatWrapping;
  sandTexture.repeat.x = 5;
  sandTexture.repeat.y = 5;

  return (
    <mesh name="my-room-floor" position-y={-2.5} castShadow receiveShadow>
      <boxGeometry args={[myRoomSize, 0.05, myRoomSize]} />
      <meshStandardMaterial color={"aqua"} />
    </mesh>
  );
};
