import { socket } from "../sockets/clientSocket";

export const Floor = () => {
  return (
    <mesh
      castShadow
      receiveShadow
      rotation-x={-Math.PI / 2}
      position-y={-0.001}
      onClick={(e) => {
        socket.emit("move", [e.point.x, 0, e.point.z]);
      }}
    >
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#999999" />
    </mesh>
  );
};
