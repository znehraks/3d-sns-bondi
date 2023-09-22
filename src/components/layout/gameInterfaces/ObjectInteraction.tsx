import styled from "styled-components";

export const ObjectInteraction = () => {
  return <ObjectInteractionWrapper id="object-interaction" />;
};

const ObjectInteractionWrapper = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22px;
  background-color: #ffffff;
  min-width: fit-content;
  padding: 10px;
  border-radius: 10px;
  display: none;
`;
