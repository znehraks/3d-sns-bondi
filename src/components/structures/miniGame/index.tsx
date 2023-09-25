/* eslint-disable @typescript-eslint/no-explicit-any */
import { PointerLockControls } from "@react-three/drei";
import { GunHand } from "./elements/GunHand";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls as PL } from "three/examples/jsm/controls/PointerLockControls.js";
import { Mesh, Quaternion, Vector3 } from "three";
import { TargetMesh } from "./elements/TargetMesh";
import { Bullet } from "./elements/Bullet";
import { PublicApi } from "@react-three/cannon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 물리엔진으로 실제 총알을 날려서 처리
// 총알이 날아간 후, 기존 메시는 없어지고, 새 총알 메시가 렌더 되어야 함
export const MiniGame = () => {
  const three = useThree();
  const ref = useRef<PL>(null);
  const [isShoot, setIsShoot] = useState(false);
  const [isShooting, setIsShooting] = useState(false);

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

  const shoot = useCallback(
    (mesh: Mesh, api: PublicApi) => {
      const cameraDirection = new Vector3();
      three.camera.getWorldDirection(cameraDirection).multiplyScalar(100);
      api.applyImpulse(
        [cameraDirection.x, cameraDirection.y, cameraDirection.z],
        [0, 0, 0]
      );
    },
    [three.camera]
  );

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
    let timeout: number;
    const handlePointerDown = () => {
      if (!gunHand) return;
      const cameraDirection = new Vector3();
      three.camera.getWorldDirection(cameraDirection).multiplyScalar(10);
      setIsShoot(true);
      setIsShooting(true);
      timeout = setTimeout(() => {
        setIsShooting(false);
      }, 1000) as unknown as number;
    };
    const handlePointerUp = () => {
      if (!gunHand) return;
    };
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [gunHand, three.camera, three.controls, three.gl.domElement, three.scene]);

  const directionVector = new Vector3();

  const cameraDirection = new Vector3();
  const worldUpVector = new Vector3(0, 1, 0);
  const perpendicularVector = new Vector3();
  const quaterinion = new Quaternion();

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
      ref.current.camera.getWorldDirection(cameraDirection);

      perpendicularVector
        .crossVectors(worldUpVector, cameraDirection)
        .multiplyScalar(-1)
        .normalize();

      quaterinion.setFromAxisAngle(perpendicularVector, 0.005);
      ref.current.camera.quaternion.premultiply(quaterinion);
      gunHand.quaternion.premultiply(
        quaterinion.clone().setFromAxisAngle(perpendicularVector, 0.1)
      );
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
      <GunHand />
      {isShooting && gunHand && (
        <Bullet
          shoot={shoot}
          position={[
            gunHand.position.x,
            gunHand.position.y,
            gunHand.position.z,
          ]}
        />
      )}
      <TargetMesh position={randomPositions[0]} color={randomColors[0]} />;
      {/* <instancedMesh>
        {randomPositions.map((position, i) => {
          return <TargetMesh position={position} color={randomColors[i]} />;
        })}
      </instancedMesh> */}
    </>
  );
};
