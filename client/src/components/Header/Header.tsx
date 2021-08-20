import React from "react";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import OutsideClickHandler from "react-outside-click-handler";
import Heading from "../Heading";
import Text from "../Text";
import UserMenu from "./UserMenu";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: React.FC<Props> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Wrapper>
      <Left>
        <Link to="/">
          <Heading>TypeRacer</Heading>
        </Link>
      </Left>
      <Right>
        <Shop>
          <Text>shop</Text>
          <Balance>
            <FaShoppingCart />
            <Text>30$</Text>
          </Balance>
        </Shop>
        <Divider />
        <Menu>
          <OutsideClickHandler onOutsideClick={() => setMenuOpen(false)}>
            <Avatar onClick={() => setMenuOpen(!menuOpen)} />
            {menuOpen && <UserMenu />}
          </OutsideClickHandler>
        </Menu>
      </Right>
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 32px 0;
  display: flex;
  z-index: 999;
  justify-content: space-between;
`;

const Menu = styled.div`
  position: relative;
  z-index: 999;
`;

const Left = styled.div`
  cursor: pointer;
  user-select: none;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Shop = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;

  p {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.main};
  }
`;

const Balance = styled.div`
  background-color: ${({ theme }) => theme.colors.main15};
  padding: 8px 16px;
  margin-left: 12px;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.rounded.sm};
  max-width: 160px;

  p {
    margin-left: 6px;
    margin-bottom: -2px;
    user-select: text;
  }
`;

export const Divider = styled.div`
  width: 2px;
  height: 100%;
  opacity: 0.5;
  background-color: ${({ theme }) => theme.colors.text};
  margin: 0 24px;
`;
