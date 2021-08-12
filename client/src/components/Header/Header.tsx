import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import styled from "styled-components";
import Avatar from "../Avatar";
import Heading from "../Heading";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Left>
        <Heading>TypeRacer</Heading>
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
        <Avatar />
      </Right>
    </Wrapper>
  );
};

export default Header;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 32px 0;
  display: flex;
  justify-content: space-between;
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
