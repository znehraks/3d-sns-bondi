import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { IMyRoomObjectProps } from "../../../../store/PlayersAtom";
const name = "my-room-desk";
const scale = 1;
export const MyRoomStandingDesk = (props: IMyRoomObjectProps) => {
  const { scene } = useGLTF("/models/Standing Desk.glb");
  const position = useMemo(() => new Vector3(1.5, -1.65, -2), []);
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene]);
  return (
    <>
      <primitive
        name={name}
        scale={scale}
        position={props.position ?? position}
        rotation={props.rotation ?? [0, -Math.PI, 0]}
        object={scene}
      />
    </>
  );
};
