import { useRecoilState } from "recoil";
import { CurrentSelectedMyRoomObjectAtom } from "../../../../store/PlayersAtom";

export const MyRoomObjectRotationMode = () => {
  const [currentSelectedMyRoomObject] = useRecoilState(
    CurrentSelectedMyRoomObjectAtom
  );
  console.log("currentSelectedMyRoomObject", currentSelectedMyRoomObject);
  return null;
};
