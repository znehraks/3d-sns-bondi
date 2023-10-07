import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";

const name = "gunHand";
const scale = 0.04;
export const GunHand = () => {
  const { scene } = useGLTF("/models/Fps Rig.glb");
  const camera = useThree((three) => three.camera);
  const position = useMemo(
    () =>
      new Vector3(
        camera.position.x,
        camera.position.y - 0.1,
        camera.position.z - 0.5
      ),
    [camera.position.x, camera.position.y, camera.position.z]
  );
  useEffect(() => {
    scene.traverse((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [position, scene]);

  return (
    <group name={name} position={position}>
      <primitive scale={scale} rotation-y={Math.PI / 2} object={scene} />
    </group>
  );
};
