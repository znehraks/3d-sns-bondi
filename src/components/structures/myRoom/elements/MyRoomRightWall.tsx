import { DoubleSide } from "three";
import { socket } from "../../../../sockets/clientSocket";
import { myRoomSize } from "../../../../data";

export const MyRoomRightWall = () => {
  // const select = useSelect();
  // console.log("select", select);
  return (
    <mesh
      name="my-room-right-wall"
      castShadow
      receiveShadow
      position-y={0}
      position-z={-2.5}
      onPointerDown={() => {}}
      onPointerUp={(e) => {
        socket.emit("move", [e.point.x, 0, e.point.z]);
      }}
    >
      <planeGeometry args={[myRoomSize, myRoomSize]} />
      <meshStandardMaterial side={DoubleSide} color={"pink"} />
    </mesh>
  );
};
