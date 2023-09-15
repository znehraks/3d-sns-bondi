import { styled } from "styled-components";
import { useCallback, useMemo, useState } from "react";
import { STEPS } from "../enums";
import { isValidText } from "../utils";
import { socket } from "../sockets/clientSocket";
import { SetterOrUpdater, useRecoilState } from "recoil";
import {
  HairColorAtom,
  IsLoginAtom,
  PantsColorAtom,
  ShirtColorAtom,
} from "../store/PlayersAtom";
import { MainCanvas } from "./MainCanvas";
import { colorCandidates } from "../data";

export const Lobby = () => {
  const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.NICK_NAME);
  const [tempNickname, setTempNickname] = useState<string | undefined>();
  const [tempJobPosition, setTempJobPosition] = useState<string | undefined>();

  const [hairColor, setHairColor] = useRecoilState(HairColorAtom);
  const [shirtColor, setShirtColor] = useRecoilState(ShirtColorAtom);
  const [pantsColor, setPantsColor] = useRecoilState(PantsColorAtom);

  const [isFinished, setIsFinished] = useState(false);
  const [, setIsLogin] = useRecoilState(IsLoginAtom);
  const colorCandidatesMemo = useMemo(() => colorCandidates, []);

  const handleClickColorRound = useCallback(
    (set: SetterOrUpdater<string>) => (color: string) => () => {
      if (!isFinished) {
        setIsFinished(true);
      }
      set(color);
    },
    [isFinished]
  );

  if (!socket) return null;
  return (
    <LoginContainer>
      {currentStep === STEPS.NICK_NAME && (
        <>
          <LoginTitle>패디에서 사용할 내 이름이에요.</LoginTitle>
          <Input
            placeholder="별명을 입력해주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTempNickname(e.currentTarget.value);
            }}
          />
          <NextBtn
            disabled={!isValidText(tempNickname)}
            className={isValidText(tempNickname) ? "valid" : "disabled"}
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
          >
            이대로 진행할래요
          </NextBtn>
        </>
      )}
      {currentStep === STEPS.JOB_POSITION && (
        <>
          <LoginTitle>패디에서 공유할 내 직군이에요.</LoginTitle>
          <Input
            placeholder="개발 직군을 입력해주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTempJobPosition(e.currentTarget.value);
            }}
          />
          <NextBtn
            disabled={!isValidText(tempJobPosition)}
            className={isValidText(tempJobPosition) ? "valid" : "disabled"}
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
            }}
          >
            이대로 진행할래요
          </NextBtn>
          <PrevBtn
            onClick={() => {
              setCurrentStep((prev) => prev - 1);
            }}
          >
            이전으로 돌아갈래요
          </PrevBtn>
        </>
      )}
      {currentStep === STEPS.CHARACTER && (
        <>
          <LoginTitle>패디에서 사용할 내 아바타를 꾸밀 시간이에요.</LoginTitle>
          <CharacterCanvasContainer>
            <CharacterTuningWrapper>
              <CharacterCanvasWrapper>
                <MainCanvas />
              </CharacterCanvasWrapper>
              <CharaterTuningZone>
                <CharacterTuningPartsContainer>
                  <div>헤어스타일</div>
                  <div>
                    {colorCandidatesMemo.map((color) => (
                      <div>
                        <ColorRound
                          selected={color === hairColor}
                          onClick={handleClickColorRound(setHairColor)(color)}
                          color={color}
                        ></ColorRound>
                      </div>
                    ))}
                  </div>
                </CharacterTuningPartsContainer>
                <CharacterTuningPartsContainer>
                  <div>티셔츠 색상</div>
                  <div>
                    {colorCandidatesMemo.map((color) => (
                      <div>
                        <ColorRound
                          selected={color === shirtColor}
                          onClick={handleClickColorRound(setShirtColor)(color)}
                          color={color}
                        ></ColorRound>
                      </div>
                    ))}
                  </div>
                </CharacterTuningPartsContainer>
                <CharacterTuningPartsContainer>
                  <div>바지 색상</div>{" "}
                  <div>
                    {colorCandidatesMemo.map((color) => (
                      <div>
                        <ColorRound
                          selected={color === pantsColor}
                          onClick={handleClickColorRound(setPantsColor)(color)}
                          color={color}
                        ></ColorRound>
                      </div>
                    ))}
                  </div>
                </CharacterTuningPartsContainer>
              </CharaterTuningZone>
            </CharacterTuningWrapper>

            <NextBtn
              disabled={!isFinished}
              className={isFinished ? "valid" : "disabled"}
              onClick={() => {
                if (!tempNickname || !tempJobPosition) return;
                setIsLogin(true);
              }}
            >
              {/* 이거 누르면 애니메이션 다른것 재생 */}
              {/* 애니메이션 추가로 필요한 것들 더 담기 */}이 모습으로
              진행할래요.
            </NextBtn>
            <PrevBtn
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
            >
              이전으로 돌아갈래요
            </PrevBtn>
          </CharacterCanvasContainer>
        </>
      )}
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 100%;
  background-color: #85e6ff;
`;

const LoginTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const CharacterCanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 800px;
  height: 80%;
`;

const CharacterTuningWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CharacterCanvasWrapper = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CharaterTuningZone = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
`;

const CharacterTuningPartsContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  font-size: 24px;
  overflow-y: hidden;

  & > div:first-of-type {
    padding: 0px 5px;
    font-size: 22px;
    font-weight: 600;
    color: #6e6e6e;
  }
  & > div:nth-of-type(2) {
    padding: 4px;
    height: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-start: initial;
    gap: 10px;
    // 파이어폭스 스크롤 스타일
    scrollbar-width: "thin";
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      outline: none;
      border-radius: 8px;
      background-color: #ececec;
    }
    &::-webkit-scrollbar-track {
      /* background-color: red; */
    }
    & > div {
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;

      // ColorRound
    }
  }
`;

const ColorRound = styled.div<{ color: string; selected?: boolean }>`
  background-color: ${(props) => props.color};
  width: 42px;
  height: 42px;
  border-radius: 50%;
  box-shadow: ${(props) =>
    props.selected ? "2px 2px 2px 2px #033333;" : " 2px 2px 2px 2px #6aaddd;"};
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 2px 2px #4aaddd;
  }
`;

const Input = styled.input`
  font-size: 24px;
  border: none;
  outline: none;
  padding: 12px 10px;
  border-radius: 8px;
  width: 280px;
  font-size: 18px;
`;

const NextBtn = styled.button`
  padding: 10px;
  width: 280px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  /* background-color: #b9beff; */
  font-weight: 600;
  transition-duration: 0.2s;
  &.valid {
    background-color: #6731a1;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      background-color: #340070;
      color: #ffffff;
    }
  }
  &.disabled {
    background-color: #8aceff;
    color: #ededed;
    cursor: not-allowed;
  }
`;

const PrevBtn = styled.button`
  padding: 10px;
  width: 280px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  /* background-color: #b9beff; */
  font-weight: 600;
  color: #666666;
  cursor: pointer;
`;
