import { myRoomSize } from "../../../../data";

export const MyRoomFloor = () => {
  return (
    <mesh name="my-room-floor" position-y={-2.5} castShadow receiveShadow>
      <boxGeometry args={[myRoomSize, 0.05, myRoomSize]} />
      <meshStandardMaterial color={"aqua"} />
    </mesh>
  );
};
