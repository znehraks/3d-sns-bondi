import { socket } from "../../../../sockets/clientSocket";

export const MiniGameFloor = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

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
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="eeeeee" />
    </mesh>
  );
};
