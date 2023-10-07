import { myRoomSize } from "../../../../../../../data/constants";
export const MyRoomLeftWall = () => {
  return (
    <mesh
      name="my-room-left-wall"
      receiveShadow
      position-x={-myRoomSize / 2}
      position-y={0}
      position-z={0}
    >
      <boxGeometry args={[0.05, myRoomSize, myRoomSize]} />
      <meshStandardMaterial color={"skyblue"} />
    </mesh>
  );
};
