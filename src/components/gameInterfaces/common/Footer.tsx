import { styled } from "styled-components";

export const Footer = () => {
  return <FooterWrapper>푸터</FooterWrapper>;
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
