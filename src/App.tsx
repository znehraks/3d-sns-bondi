import { RecoilRoot } from "recoil";
import { ClientSocketControls } from "./components/ClientSocketControls";
import { Content } from "./components/Content";

function App() {
  return (
    <RecoilRoot>
      <Content />
      <ClientSocketControls />
    </RecoilRoot>
  );
}

export default App;
