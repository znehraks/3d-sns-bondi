import { useRecoilState } from "recoil";
import { CurrentRotationingMyRoomObjectAtom } from "../../../../../../../store/PlayersAtom";
import { Circle } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Object3D } from "three";
import { myRoomSize } from "../../../../../../../data/constants";

export const MyRoomObjectRotationMode = () => {
  const three = useThree();
  const [currentRotationingMyRoomObject] = useRecoilState(
    CurrentRotationingMyRoomObjectAtom
  );
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
  }, [currentRotationingMyRoomObject, three.scene]);
  if (currentTarget) {
    return (
      <>
        <Circle
          name="outer-circle"
          position={currentTarget.position}
          position-y={-myRoomSize / 2 + 0.1}
          rotation-x={-Math.PI / 2}
          args={[2]}
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
      </>
    );
  }
  return null;
};
