import { styled } from "styled-components";
import { useState } from "react";
import { STEPS } from "../enums";
import { isValidText } from "../utils";
import { socket } from "../sockets/clientSocket";
import { useRecoilState } from "recoil";
import { IsLoginAtom } from "../store/PlayersAtom";

export const Lobby = () => {
  const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.NICK_NAME);
  const [tempNickname, setTempNickname] = useState<string | undefined>();
  const [tempJobPosition, setTempJobPosition] = useState<string | undefined>();
  const [, setIsLogin] = useRecoilState(IsLoginAtom);

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
          <LoginTitle>패디에서 사용할 내 아바타에요.</LoginTitle>
          <CharacterCanvasContainer>
            <CharacterCanvasInner>
              {/* <CharacterSelectCanvas /> */}
            </CharacterCanvasInner>
            <NextBtn
              className={"valid"}
              onClick={() => {
                if (!tempNickname || !tempJobPosition) return;
                setIsLogin(true);
              }}
            >
              {/* 이거 누르면 애니메이션 다른것 재생 */}
              {/* 애니메이션 추가로 필요한 것들 더 담기 */}이 캐릭터로
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
  width: 280px;
  height: 80%;
`;

const CharacterCanvasInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
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
