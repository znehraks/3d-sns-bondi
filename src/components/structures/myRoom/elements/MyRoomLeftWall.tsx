import { myRoomSize } from "../../../../data";
export const MyRoomLeftWall = () => {
  return (
    <mesh
      name="my-room-left-wall"
      castShadow
      receiveShadow
      position-x={-2.5}
      position-y={0}
      position-z={0}
    >
      <boxGeometry args={[0.05, myRoomSize, myRoomSize]} />
      <meshStandardMaterial color={"skyblue"} />
    </mesh>
  );
};
