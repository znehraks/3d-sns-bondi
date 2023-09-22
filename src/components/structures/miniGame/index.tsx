/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plane, PointerLockControls } from "@react-three/drei";
import { GunHand } from "./elements/GunHand";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls as PL } from "three/examples/jsm/controls/PointerLockControls.js";
import { Vector3 } from "three";
import { TargetMesh } from "./elements/TargetMesh";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MiniGame = () => {
  const three = useThree();
  const ref = useRef<PL>(null);
  const [isShoot, setIsShoot] = useState(false);
  const randomPositions = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map(
          () =>
            new Vector3(
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              -10
            )
        ),
    []
  );

  const randomColors = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map(
          () =>
            Number(`0x${Math.floor(Math.random() * 16777215).toString(16)}`),
          -10
        ),
    []
  );

  const gunHand = three.scene.getObjectByName("gunHand");
  console.log(gunHand);

  useEffect(() => {
    if (!isShoot) return;
    const timeout = setTimeout(() => {
      setIsShoot(false);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [isShoot]);

  useEffect(() => {
    const handlePointerdown = () => {
      if (!gunHand) return;
      console.log("sss");
      setIsShoot(true);
    };
    window.addEventListener("pointerdown", handlePointerdown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerdown);
    };
  }, [gunHand, three.controls, three.gl.domElement, three.scene]);
  const directionVector = new Vector3();
  useFrame(() => {
    if (!gunHand) return;
    if (!ref.current) return;
    ref.current.getDirection(directionVector);
    if (!isShoot) {
      ref.current.camera.position.y = 0;
      const cameraPosition = three.camera.position;
      const gunPosition = cameraPosition
        .clone()
        .add(directionVector.clone().multiplyScalar(0.4));
      gunHand.position.set(gunPosition.x, gunPosition.y - 0.1, gunPosition.z);
      gunHand.lookAt(directionVector.clone().multiplyScalar(-10000));
    } else {
      gunHand.rotation.x += 0.1;
      console.log("directionVector", directionVector);
      ref.current.camera.position.y += 0.01;
    }
  });
  return (
    <>
      <PointerLockControls
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 2.5}
        ref={ref as any}
      />
      {gunHand && (
        <directionalLight
          intensity={2}
          position={[
            gunHand.position.x,
            gunHand.position.y + 1,
            gunHand.position.z,
          ]}
        />
      )}
      <Plane args={[10, 10]} position={[0, 0, -10]} />
      <GunHand />
      <instancedMesh>
        {randomPositions.map((position, i) => {
          return <TargetMesh position={position} color={randomColors[i]} />;
        })}
      </instancedMesh>
    </>
  );
};
