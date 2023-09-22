import { useRecoilState } from "recoil";
import { CurrentMapAtom } from "../../../store/PlayersAtom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export const MiniGameHeader = () => {
  const [currentMap] = useRecoilState(CurrentMapAtom);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (currentMap === "MINI_GAME") setVisible(true);
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentMap]);

  return (
    <>
      <MiniGameHeaderWrapper>
        <Welcome className={visible ? "visible" : "invisible"}>
          사격 게임을 위해, 장갑과 보호복을 준비했어요.
        </Welcome>
        <ScoreContainer>
          <ScoreDiv>
            점수: <strong>200</strong>
          </ScoreDiv>
          <BulletDiv>
            남은 총알: <strong>9</strong>개
          </BulletDiv>
        </ScoreContainer>
      </MiniGameHeaderWrapper>
    </>
  );
};

const MiniGameHeaderWrapper = styled.div`
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
`;

const Welcome = styled.div`
  font-size: 32px;
  &.visible {
    display: flex;
  }
  &.invisible {
    display: none;
  }
`;
const ScoreContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 0%;
  width: 20%;
  max-width: 400px;
  height: 150px;
  padding: 20px;
  font-size: 32px;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const ScoreDiv = styled.div`
  strong {
    color: red;
  }
`;
const BulletDiv = styled.div`
  strong {
    color: red;
  }
`;
