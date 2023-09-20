import { myRoomSize } from "../../../../data";

export const MyRoomRightWall = () => {
  return (
    <mesh
      name="my-room-right-wall"
      castShadow
      receiveShadow
      position-y={0}
      position-z={-2.5}
    >
      <boxGeometry args={[myRoomSize, myRoomSize, 0.05]} />
      <meshStandardMaterial color={"pink"} />
    </mesh>
  );
};
