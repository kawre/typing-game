import React, { createElement } from "react";
import { useState } from "react";
import { FaCog, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import OutsideClickHandler from "react-outside-click-handler";
import Heading from "../Heading";
import Text from "../Text";
import UserMenu from "./UserMenu";
import Icon from "../Icon";
import Modal from "../Modal";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: React.FC<Props> = () => {
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
          <Link to="/settings">
            <Icon as={FaCog} size={22} />
          </Link>
          <Avatar ml={3} />
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
  display: flex;
  align-items: center;

  /* div:not(:first-child) {
    margin-left: 12px;
  } */

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
  background-color: ${({ theme }) => theme.colors.main}0d;
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
