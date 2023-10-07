import { Html, useProgress } from "@react-three/drei";
import { useRecoilState } from "recoil";
import { IsLoadCompletedAtom } from "../../../store/PlayersAtom";
import { useEffect } from "react";

export const Loader = () => {
  const { progress } = useProgress();
  const [, setIsLoadCompleted] = useRecoilState(IsLoadCompletedAtom);

  useEffect(() => {
    setIsLoadCompleted(progress === 100);
  }, [progress, setIsLoadCompleted]);

  return (
    <Html center>
      <progress value={progress}></progress>
    </Html>
  );
};
