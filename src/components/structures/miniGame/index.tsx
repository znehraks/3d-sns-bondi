/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plane, PointerLockControls } from "@react-three/drei";
import { GunHand } from "./elements/GunHand";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls as PL } from "three/examples/jsm/controls/PointerLockControls.js";
import { Vector3 } from "three";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MiniGame = () => {
  const three = useThree();
  const ref = useRef<PL>(null);

  const gunHand = three.scene.getObjectByName("gunHand");
  console.log(gunHand);
  useEffect(() => {}, [three.controls, three.scene]);
  const directionVector = new Vector3();
  useFrame(() => {
    if (!gunHand) return;
    ref.current?.getDirection(directionVector);
    const cameraPosition = three.camera.position;
    const gunPosition = cameraPosition
      .clone()
      .add(directionVector.clone().multiplyScalar(0.4));
    gunHand.position.set(gunPosition.x, gunPosition.y - 0.1, gunPosition.z);
    gunHand.lookAt(directionVector.clone().multiplyScalar(-10000));
  });
  return (
    <>
      <PointerLockControls
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 2.5}
        ref={ref as any}
      />
      <Plane args={[10, 10]} position={[0, 0, -10]} />
      <GunHand />
    </>
  );
};
