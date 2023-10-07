import { myRoomSize } from "../../../../../../../data/constants";

export const MyRoomFloor = () => {
  return (
    // 바닥에 castshadow를 넣으면 줄무늬 같은 선이 생길수도있음
    <mesh name="my-room-floor" position-y={-myRoomSize / 2} receiveShadow>
      <boxGeometry args={[myRoomSize, 0.05, myRoomSize]} />
      <meshStandardMaterial color={"aqua"} />
    </mesh>
  );
};
