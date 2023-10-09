import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { CurrentMapAtom } from "../../../../../store/PlayersAtom";

export const Footer = () => {
  const currentMap = useRecoilValue(CurrentMapAtom);
  return (
    <FooterWrapper>
      <span>
        {currentMap === "GROUND" && (
          <>
            <a href="https://www.freepik.com/free-photo/sand-texture-brown-sand-background-from-fine-sand-sand-background_1285000.htm#query=sand%20texture&position=4&from_view=keyword&track=ais">
              Image by tirachard
            </a>
            on Freepik / Play Structure by Emmett “TawpShelf” Baber [CC-BY] via
            Poly Pizza / Jungle gym by Poly by Google [CC-BY] via Poly Pizza /
            Swing set by Poly by Google [CC-BY] via Poly Pizza
          </>
        )}
        {currentMap === "MY_ROOM" && (
          <>
            Gaming Computer by Alex Safayan [CC-BY] via Poly Pizza / Standing
            Desk by dook [CC-BY] via Poly Pizza / Chair by Poly by Google
            [CC-BY] via Poly Pizza / Bed by CMHT Oculus [CC-BY] via Poly Pizza
          </>
        )}
        {currentMap === "MINI_GAME" && (
          <>Fps Rig by J-Toastie [CC-BY] via Poly Pizza </>
        )}
      </span>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
