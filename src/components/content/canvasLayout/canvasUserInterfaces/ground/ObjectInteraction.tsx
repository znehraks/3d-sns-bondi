import styled from "styled-components";

export const ObjectInteraction = () => {
  return (
    <ObjectInteractionWrapper id="object-interaction">
      상호작용할 글자들
    </ObjectInteractionWrapper>
  );
};

const ObjectInteractionWrapper = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  background-color: #ffffff;
  max-width: fit-content;
  padding: 10px;
  border-radius: 10px;
`;
