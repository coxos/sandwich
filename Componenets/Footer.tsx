import styled from "styled-components";

const FooterStyle = styled.footer`
  flex-shrink: 0;
  background-color: darkslategray;
  min-height: 50px;
`;

const FooterWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  color: rgba(255, 255, 255, 0.705);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
`;
const FooterWrapperContentLogo = styled.div`
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: -1px;
  color: #60c7c2;
  text-align: center;

  & span {
    text-transform: none;
    letter-spacing: 0px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.705);
    font-size: 18px;
  }
`;

export default function Footer() {
  return (
    <FooterStyle>
      <FooterWrapper>
        <FooterWrapperContentLogo>
          Jani&apos;s <span>sandwich </span>
        </FooterWrapperContentLogo>
        <p>©</p>
      </FooterWrapper>
    </FooterStyle>
  );
}
