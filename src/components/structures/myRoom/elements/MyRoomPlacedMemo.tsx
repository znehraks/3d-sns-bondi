import { CurrentSelectedMemoAtom, IPlacedMyRoomMemos } from "../../../../store/PlayersAtom";
import { myRoomMemoBoxSize } from "../../../../data";
import { useRecoilState } from "recoil";

export const MyRoomPlacedMemo = ({
  placedMyRoomMemo,
}: {
  placedMyRoomMemo: IPlacedMyRoomMemos;
}) => {
  const  [,setCurrentSelectedMemo] = useRecoilState(CurrentSelectedMemoAtom)
  return (
    <mesh
      // ref={ref}
      castShadow
      receiveShadow
      name={`my-room-memo-${placedMyRoomMemo.authorNickname}-${placedMyRoomMemo.timestamp}`}
      position={placedMyRoomMemo.position}
      rotation={placedMyRoomMemo.rotation}
      userData={{
        text: placedMyRoomMemo.text,
        authorNickname: placedMyRoomMemo.authorNickname,
        timestamp: placedMyRoomMemo.timestamp,
      }}
      onClick={() => {
        console.log("placedMyRoomMemo.text", placedMyRoomMemo.text);
        setCurrentSelectedMemo({...placedMyRoomMemo})
      }}
    >
      <boxGeometry
        args={[
          myRoomMemoBoxSize[0],
          myRoomMemoBoxSize[1],
          myRoomMemoBoxSize[2],
        ]}
      />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};
