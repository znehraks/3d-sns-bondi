import { useRecoilState } from "recoil";
import {
  BulletCountAtom,
  CurrentMapAtom,
  HitCountAtom,
  IsMiniGameClearedAtom,
  IsMiniGameStartedAtom,
} from "../../../../../store/PlayersAtom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export const MiniGameUI = () => {
  const [currentMap, setCurrentMap] = useRecoilState(CurrentMapAtom);
  const [isMiniGameStarted, setIsMiniGameStarted] = useRecoilState(
    IsMiniGameStartedAtom
  );
  const [isMiniGameCleared, setIsMiniGameCleared] = useRecoilState(
    IsMiniGameClearedAtom
  );
  const [bulletCount, setBulletCount] = useRecoilState(BulletCountAtom);
  const [hitCount, setHitCount] = useRecoilState(HitCountAtom);
  const [visible, setVisible] = useState(false);

  const [isGameStartPopupVisible, setIsGameStartPopupVisible] = useState(
    () => !isMiniGameStarted
  );

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
        <ScoreContainer className={isMiniGameStarted ? "visible" : "invisible"}>
          <ScoreDiv id="mini-game-score">
            현재 점수: <strong>{hitCount}점</strong>
          </ScoreDiv>
          <BulletDiv id="mini-game-remained-bullet">
            남은 총알: <strong>{bulletCount}개</strong>
          </BulletDiv>
        </ScoreContainer>
      </MiniGameHeaderWrapper>
      <GameStatus className={isGameStartPopupVisible ? "visible" : "invisible"}>
        <GameStatusTitle>사격 게임을 시작할까요?</GameStatusTitle>
        <GameStatusBtnContainer>
          <GameStatusBtn
            onClick={() => {
              setIsMiniGameStarted(true);
              setIsGameStartPopupVisible(false);
            }}
          >
            예
          </GameStatusBtn>
          <GameStatusBtn
            onClick={() => {
              setCurrentMap("GROUND");
            }}
          >
            아니오
          </GameStatusBtn>
        </GameStatusBtnContainer>
      </GameStatus>

      <GameStatus className={isMiniGameCleared ? "visible" : "invisible"}>
        <GameStatusTitle>게임 클리어!</GameStatusTitle>
        <GameStatusBtnContainer>
          <GameStatusBtn
            onClick={() => {
              setIsMiniGameStarted(true);
              setIsMiniGameCleared(false);
              setBulletCount(15);
              setHitCount(0);
            }}
          >
            다시 시작
          </GameStatusBtn>
          <GameStatusBtn
            onClick={() => {
              setCurrentMap("GROUND");
            }}
          >
            나가기
          </GameStatusBtn>
        </GameStatusBtnContainer>
      </GameStatus>
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
  background-color: transparent;
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
  top: 10px;
  right: 0%;
  width: 20%;
  max-width: 400px;
  height: 150px;
  padding: 20px;
  font-size: 32px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  border-radius: 20px;
  color: #eee;

  &.invisible {
    display: none;
  }
  &.visible {
    display: flex;
  }
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

const GameStatus = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  background-color: #eee;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 20px 10px 20px;
  z-index: 1;
  &.invisible {
    display: none;
  }
  &.visible {
    display: flex;
  }
`;

const GameStatusBtnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const GameStatusTitle = styled.div`
  font-size: 32px;
  height: 100px;
  padding: 10px;
`;

const GameStatusBtn = styled.button`
  width: 100px;
  padding: 8px;
  font-size: 18px;
  color: #000;
`;
