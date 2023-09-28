import { useSphere } from "@react-three/cannon";
import { DoubleSide, Mesh, Vector3 } from "three";

export const TargetMesh = ({
  position,
  color,
}: {
  position: Vector3;
  color: number;
}) => {
  // 물리엔진 넣고, 충돌시에 점수가 오르도록 이벤트 함수 구현하면 됨
  const [ref] = useSphere<Mesh>(() => ({
    mass: 1,
    position: [position.x, position.y, position.z],
    allowSleep: false,
    onCollide: (e) => {
      if (!ref.current) return;
      console.log("충돌");
      console.log(e);
      console.log("e.contact.contactPoint", e.contact.contactPoint);
      console.log("e.contact.impactVelocity", e.contact.impactVelocity);
      console.log("ref.current.position", ref.current.position);
    },
    onCollideBegin: (e) => {
      console.log("충돌시작");
      console.log(e);
    },
    onCollideEnd: (e) => {
      console.log("충돌 끝");
      console.log(e);
    },
  }));

  console.log(ref);
  return (
    <mesh name="target" castShadow receiveShadow ref={ref} position={position}>
      <sphereGeometry args={[0.05]} />
      <meshStandardMaterial color={color} side={DoubleSide} />
    </mesh>
  );
};
