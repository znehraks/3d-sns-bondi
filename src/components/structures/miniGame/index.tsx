/* eslint-disable @typescript-eslint/no-explicit-any */
import { PointerLockControls } from "@react-three/drei";
import { GunHand } from "./elements/GunHand";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls as PL } from "three/examples/jsm/controls/PointerLockControls.js";
import { Color, Quaternion, SpotLight, Vector3 } from "three";
import { TargetMesh } from "./elements/TargetMesh";
import { Bullet } from "./elements/Bullet";
import { PublicApi } from "@react-three/cannon";
import { MiniGameFloor } from "./elements/MiniGameFloor";
import { useRecoilState } from "recoil";
import {
  BulletCountAtom,
  CurrentMapAtom,
  HitCountAtom,
  IsMiniGameClearedAtom,
  IsMiniGameStartedAtom,
} from "../../../store/PlayersAtom";
let movement = { forward: false, backward: false, left: false, right: false };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 물리엔진으로 실제 총알을 날려서 처리
// 총알이 날아간 후, 기존 메시는 없어지고, 새 총알 메시가 렌더 되어야 함
export const MiniGame = () => {
  const [currentMap] = useRecoilState(CurrentMapAtom);
  const three = useThree();
  const spotLightRef = useRef<SpotLight>(null);
  const ref = useRef<PL>(null);
  const [isMiniGameStarted, setIsMiniGameStarted] = useRecoilState(
    IsMiniGameStartedAtom
  );
  const [isMiniGameCleared, setIsMiniGameCleared] = useRecoilState(
    IsMiniGameClearedAtom
  );
  const [, setBulletCount] = useRecoilState(BulletCountAtom);
  const [hitCount, setHitCount] = useRecoilState(HitCountAtom);
  const [isShoot, setIsShoot] = useState(false);
  const [isShooting, setIsShooting] = useState(false);

  const randomShapes = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map(
          () =>
            new Vector3(
              Math.random() - 0.5 + 1,
              Math.random() - 0.5 + 1,
              Math.random() - 0.5 + 1
            )
        ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMiniGameCleared]
  );

  const randomPositions = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map(
          () =>
            new Vector3(
              (Math.random() - 0.5) * 30,
              2,
              (Math.random() - 0.5) * 30
            )
        ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMiniGameCleared]
  );

  const randomColors = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map(
          () =>
            Number(`0x${Math.floor(Math.random() * 16777000).toString(16)}`),
          -10
        ),
    []
  );
  const gunHand = three.scene.getObjectByName("gunHand");

  const shoot = useCallback(
    (api: PublicApi) => {
      const cameraDirection = new Vector3();
      three.camera.getWorldDirection(cameraDirection).multiplyScalar(100);
      api.velocity.copy(cameraDirection);
      // api.applyImpulse(
      //   [cameraDirection.x, cameraDirection.y, cameraDirection.z],
      //   [0, 0, 0]
      // );
      setBulletCount((prev) => prev - 1);
    },
    [setBulletCount, three.camera]
  );

  useEffect(() => {
    three.scene.background = new Color(0x000000);
    return () => {
      three.scene.background = new Color(0xffffff);
      setIsMiniGameStarted(false);
      setIsMiniGameCleared(false);
      setBulletCount(15);
      setHitCount(0);
    };
  }, [
    three.scene,
    currentMap,
    setIsMiniGameStarted,
    setBulletCount,
    setHitCount,
    setIsMiniGameCleared,
  ]);

  useEffect(() => {
    if (hitCount === 10) {
      setIsMiniGameCleared(true);
      ref.current?.unlock();
    }
  }, [hitCount, setIsMiniGameCleared]);

  useEffect(() => {
    if (isMiniGameStarted) {
      ref.current?.lock();
    }
  }, [isMiniGameStarted]);

  useEffect(() => {
    if (!spotLightRef.current) return;
    spotLightRef.current.lookAt(0, 0, 0);
  }, []);

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
    if (!isMiniGameStarted || isMiniGameCleared) return;
    let timeout: number;
    const handlePointerDown = () => {
      if (!gunHand) return;
      const cameraDirection = new Vector3();
      three.camera.getWorldDirection(cameraDirection).multiplyScalar(10);
      setIsShoot(true);
      setIsShooting(true);
      timeout = setTimeout(() => {
        setIsShooting(false);
      }, 3000) as unknown as number;
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
  }, [
    gunHand,
    isMiniGameCleared,
    isMiniGameStarted,
    three.camera,
    three.controls,
    three.gl.domElement,
    three.scene,
  ]);

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
      {isMiniGameStarted && (
        <PointerLockControls
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 2.5}
          ref={ref as any}
        />
      )}
      <MiniGameFloor />
      <spotLight ref={spotLightRef} intensity={200} position={[0, 20, 0]} />
      {gunHand && (
        <directionalLight
          intensity={1}
          position={[
            gunHand.position.x,
            gunHand.position.y + 0.5,
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
            gunHand.position.y + 0.1,
            gunHand.position.z,
          ]}
        />
      )}
      <instancedMesh>
        {!isMiniGameCleared &&
          randomPositions.map((position, i) => {
            return (
              <TargetMesh
                position={position}
                color={randomColors[i]}
                shapes={randomShapes[i]}
                setHitCount={setHitCount}
              />
            );
          })}
      </instancedMesh>
    </>
  );
  3;
};
