import { socket } from "../../../sockets/clientSocket";

export const MyRoomRightWall = () => {
  // const select = useSelect();
  // console.log("select", select);
  return (
    <mesh
      castShadow
      receiveShadow
      position-y={0}
      position-z={-2.5}
      onPointerDown={() => {}}
      onPointerUp={(e) => {
        socket.emit("move", [e.point.x, 0, e.point.z]);
      }}
    >
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial color={"pink"} />
    </mesh>
  );
};
