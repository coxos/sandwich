import Link from "next/link";
import styled from "styled-components";

type StyleCompontentProps = {
  singbtn?: boolean;
  shop?: boolean;
};

const MenuWrapperLogo = styled.div`
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: -1px;
  color: #60c7c2;
  flex: 1;

  & span {
    text-transform: none;
    letter-spacing: 0px;
    font-weight: 500;
    color: darkslategray;
    font-size: 18px;
  }
`;

const MenuWwrapperContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  max-width: 1200px;
  margin: auto auto;
  padding: 0 30px;
  min-height: 50px;
`;

const NavMenuUl = styled.ul<StyleCompontentProps>`
  display: flex;
  list-style-type: none;
  flex-wrap: wrap;
  justify-content: ${({ shop }) => (shop ? "end" : "space-around")};
  padding: 0 30px;
  flex: ${({ shop }) => (shop ? "1" : "2")};
`;

const NavMenuA = styled.a<StyleCompontentProps>`
  padding: 0 10px;
  color: ${({ singbtn }) => (!singbtn ? "darkslategray" : "white")};
  cursor: pointer;
  box-shadow: 0px 0px 0px 0px transparent;
  transition: 320ms;
  ${({ singbtn }) => {
    if (singbtn) {
      return `
        border: 2px solid lightseagreen;
        margin-left: 20px;
        padding: 5px 20px;
        border-radius: 20px;
        background-color: lightseagreen;
        color: white;
        opacity: 0.7;
      `;
    }
  }};

  &:hover {
    box-shadow: 0px 2px 0px 0px #60c7c2;
    text-shadow: 0px 0px 0px #000000;
    ${({ singbtn }) => {
      if (singbtn) {
        return `
      background-color: transparent;
      color: lightseagreen;
      `;
      }
    }};
  }
`;

const MenuWraper = styled.div`
  position: sticky;
  width: 100%;
  background: rgb(255 255 255 / 90%);
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 37%);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  top: 0;
  z-index: 9;
  font-size: 16px;
  font-weight: 500;
`;

export default function NaveMenu() {
  return (
    <MenuWraper>
      <MenuWwrapperContent>
        <MenuWrapperLogo>
          Jani&apos;s <span>sandwich</span>
        </MenuWrapperLogo>
        <NavMenuUl shop={false}>
          <li>
            <Link href="/">
              <NavMenuA>Home</NavMenuA>
            </Link>
          </li>
          <li>
            <Link href="/sandwiches">
              <NavMenuA> Sandwiches</NavMenuA>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <NavMenuA>About Us</NavMenuA>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <NavMenuA>Contact</NavMenuA>
            </Link>
          </li>
        </NavMenuUl>
        <NavMenuUl shop={true}>
          <li>
            <NavMenuA>Shop</NavMenuA>
          </li>
          <li>
            <NavMenuA singbtn>Sing Up</NavMenuA>
          </li>
        </NavMenuUl>
      </MenuWwrapperContent>
    </MenuWraper>
  );
}
