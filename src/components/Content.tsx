import { useRecoilState } from "recoil";
import { Lobby } from "./Lobby";
import { IsLoginAtom } from "../store/PlayersAtom";
import { MainCanvas } from "./MainCanvas";
import { Layout } from "./layout/Layout";

export const Content = () => {
  const [isLogin] = useRecoilState(IsLoginAtom);
  //   if (isLogin) {
  return (
    <Layout>
      <MainCanvas />
    </Layout>
  );
  //   }
  //   return <Lobby />;
};
