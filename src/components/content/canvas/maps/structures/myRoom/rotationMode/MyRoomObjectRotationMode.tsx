import { useRecoilState, useRecoilValue } from "recoil";
import {
  CurrentRotationAtom,
  CurrentRotationingMyRoomObjectAtom,
} from "../../../../../../../store/PlayersAtom";
import { Circle } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh, Object3D } from "three";
import { myRoomSize } from "../../../../../../../data/constants";

export const MyRoomObjectRotationMode = () => {
  const three = useThree();
  const anchorRef = useRef<Mesh>(null);
  const [currentRotationingMyRoomObject] = useRecoilState(
    CurrentRotationingMyRoomObjectAtom
  );
  const currentRotation = useRecoilValue(CurrentRotationAtom);
  const [currentTarget, setCurrentTarget] = useState<Object3D | undefined>(
    undefined
  );

  useEffect(() => {
    if (!currentRotationingMyRoomObject) return;
    const target = three.scene.getObjectByName(
      `my-room-${currentRotationingMyRoomObject}`
    );
    if (!target) return;
    setCurrentTarget(target);
  }, [currentRotationingMyRoomObject, currentTarget, three.scene]);

  useEffect(() => {
    const target = three.scene.getObjectByName(
      `my-room-${currentRotationingMyRoomObject}`
    );
    if (target && currentRotation !== undefined && anchorRef.current)
      target.rotation.y = currentRotation;
  }, [currentRotation, currentRotationingMyRoomObject, three.scene]);

  // 회전시키면서 앵커도 회전하고, 초록색 박스도 같이 회전해야함
  if (currentTarget) {
    return (
      <>
        <Circle
          name="outer-circle"
          position={currentTarget.position}
          position-y={-myRoomSize / 2 + 0.1}
          rotation-x={-Math.PI / 2}
          args={[1.5]}
        >
          <meshStandardMaterial transparent color={0xffffff} opacity={0.9} />
        </Circle>

        <Circle
          name="inner-circle"
          position={currentTarget.position}
          position-y={-myRoomSize / 2 + 0.2}
          rotation-x={-Math.PI / 2}
          args={[1]}
        >
          <meshStandardMaterial transparent color={"aqua"} opacity={0.9} />
        </Circle>

        <Circle
          ref={anchorRef}
          name="anchor"
          position={currentTarget.position}
          position-y={-myRoomSize / 2 + 0.15}
          rotation-x={-Math.PI / 2}
          args={[1.5, 32, (currentRotation ?? 0) - Math.PI / 8, Math.PI / 4]}
        >
          <meshStandardMaterial transparent color={"skyblue"} opacity={0.9} />
        </Circle>
      </>
    );
  }
  return null;
};
