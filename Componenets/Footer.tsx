import styled from "styled-components";

const FooterWrapper = styled.footer`
  flex-shrink: 0;
  background-color: darkslategray;
  min-height: 50px;
`;

const FooterLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  min-height: 50px;
  margin: 0 auto;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.705);
  color: rgba(255, 255, 255, 0.705);
  letter-spacing: 0px;
  text-transform: none;
`;

const JaniName = styled.span`
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: -1px;
  color: #60c7c2;
  text-align: center;
`;

const CMark = styled.sup`
  margin-left: 2px;
  font-size: 14px;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterLogo>
        <JaniName>Jani&apos;s</JaniName>&nbsp;sandwich<CMark>©</CMark>
      </FooterLogo>
    </FooterWrapper>
  );
}
