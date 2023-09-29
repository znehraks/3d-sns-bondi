import { useSphere } from "@react-three/cannon";
import { useThree } from "@react-three/fiber";
import { SetStateAction } from "react";
import { DoubleSide, Mesh, Vector3 } from "three";

export const TargetMesh = ({
  position,
  color,
  shapes,
  setHitCount,
}: {
  position: Vector3;
  color: number;
  shapes: Vector3;
  setHitCount: React.Dispatch<SetStateAction<number>>;
}) => {
  const three = useThree();
  // 물리엔진 넣고, 충돌시에 점수가 오르도록 이벤트 함수 구현하면 됨
  const [ref] = useSphere<Mesh>(() => ({
    mass: 5,
    position: [position.x, position.y, position.z],
    collisionFilterGroup: 2,
    collisionFilterMask: 1,
    onCollide: (e) => {
      if (!ref.current) return;
      if (e.contact.bj.name === "bullet") {
        console.log("충 돌");
        console.log(e);
        console.log("e.contact.contactPoint", e.contact.contactPoint);
        setHitCount((prev) => prev + 1);
        const timeout = setTimeout(() => {
          ref.current!.visible = false;
          const bullet = three.scene.getObjectByName("bullet");
          if (bullet) {
            three.scene.remove(bullet);
          }
          three.scene.remove(ref.current!);
          clearTimeout(timeout);
        }, 1000);
      }
    },
  }));

  return (
    <mesh
      visible
      name="target"
      castShadow
      receiveShadow
      ref={ref}
      position={position}
    >
      <sphereGeometry args={[shapes.x]} />
      <meshStandardMaterial color={color} side={DoubleSide} />
    </mesh>
  );
};
