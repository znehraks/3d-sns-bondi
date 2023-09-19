import { DoubleSide } from "three";
import { socket } from "../../../../sockets/clientSocket";
import { myRoomSize } from "../../../../data";
export const MyRoomLeftWall = () => {
  return (
    <mesh
      name="my-room-left-wall"
      castShadow
      receiveShadow
      position-y={0}
      position-z={0}
      position-x={-2.5}
      rotation-y={-Math.PI / 2}
      onPointerDown={() => {}}
      onPointerUp={(e) => {
        socket.emit("move", [e.point.x, 0, e.point.z]);
      }}
    >
      <planeGeometry args={[myRoomSize, myRoomSize]} />
      <meshStandardMaterial side={DoubleSide} color={"skyblue"} />
    </mesh>
  );
};
