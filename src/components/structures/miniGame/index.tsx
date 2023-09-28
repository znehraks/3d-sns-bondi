/* eslint-disable @typescript-eslint/no-explicit-any */
import { PointerLockControls } from "@react-three/drei";
import { GunHand } from "./elements/GunHand";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls as PL } from "three/examples/jsm/controls/PointerLockControls.js";
import { Quaternion, Vector3 } from "three";
import { TargetMesh } from "./elements/TargetMesh";
import { Bullet } from "./elements/Bullet";
import { PublicApi } from "@react-three/cannon";
import { MiniGameFloor } from "./elements/MiniGameFloor";
let movement = { forward: false, backward: false, left: false, right: false };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 물리엔진으로 실제 총알을 날려서 처리
// 총알이 날아간 후, 기존 메시는 없어지고, 새 총알 메시가 렌더 되어야 함
export const MiniGame = () => {
  const three = useThree();
  const ref = useRef<PL>(null);
  const [isShoot, setIsShoot] = useState(false);
  const [bulletCount, setBulletCount] = useState(100);

  console.log("bulletCount", bulletCount);

  const randomPositions = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map(
          () =>
            new Vector3(
              (Math.random() - 0.5) * 30,
              1,
              (Math.random() - 0.5) * 30
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
    (api: PublicApi) => {
      const cameraDirection = new Vector3();
      three.camera.getWorldDirection(cameraDirection).multiplyScalar(10);
      api.applyImpulse(
        [cameraDirection.x, cameraDirection.y, cameraDirection.z],
        [0, 0, 0]
      );
      setBulletCount((prev) => prev - 1);
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          movement = { ...movement, forward: true };
          break;
        case "s":
          movement = { ...movement, backward: true };
          break;
        case "a":
          movement = { ...movement, left: true };
          break;
        case "d":
          movement = { ...movement, right: true };
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          movement = { ...movement, forward: false };
          break;
        case "s":
          movement = { ...movement, backward: false };
          break;
        case "a":
          movement = { ...movement, left: false };
          break;
        case "d":
          movement = { ...movement, right: false };
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
      ref.current.camera.position.y = 1;
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

    if (movement.forward) {
      three.camera.position.add(
        new Vector3(directionVector.x, 0, directionVector.z).multiplyScalar(
          0.02
        )
      );
    }
    if (movement.backward) {
      three.camera.position.add(
        new Vector3(directionVector.x, 0, directionVector.z).multiplyScalar(
          -0.02
        )
      );
    }
    if (movement.left) {
      ref.current.camera.getWorldDirection(cameraDirection);

      perpendicularVector
        .crossVectors(worldUpVector, cameraDirection)
        .multiplyScalar(-1)
        .normalize();

      three.camera.position.add(
        new Vector3(
          perpendicularVector.x,
          0,
          perpendicularVector.z
        ).multiplyScalar(-0.02)
      );
    }
    if (movement.right) {
      ref.current.camera.getWorldDirection(cameraDirection);

      perpendicularVector
        .crossVectors(worldUpVector, cameraDirection)
        .multiplyScalar(-1)
        .normalize();

      three.camera.position.add(
        new Vector3(
          perpendicularVector.x,
          0,
          perpendicularVector.z
        ).multiplyScalar(0.02)
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
      <MiniGameFloor />
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
      {gunHand && (
        <Bullet
          key={Date.now()}
          shoot={shoot}
          position={[
            gunHand.position.x,
            gunHand.position.y + 0.1,
            gunHand.position.z,
          ]}
        />
      )}
      {/* {!isHit && bulletCount > 0 && (
        <TargetMesh
          position={randomPositions[0]}
          color={randomColors[0]}
          setIsHit={setIsHit}
        />
      )} */}
      <instancedMesh>
        {randomPositions.map((position, i) => {
          return <TargetMesh position={position} color={randomColors[i]} />;
        })}
      </instancedMesh>
    </>
  );
  3;
};
