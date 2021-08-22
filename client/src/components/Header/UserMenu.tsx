import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {}

const items = ["login", "register"];

// Component ---------------------------------------------------------------------
const UserMenu: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Link to="/login">
        <Item>User</Item>
      </Link>
      <Divider />
      <Link to="/login">
        <Item>Log In</Item>
      </Link>
      <Link to="/register">
        <Item>Sign Up</Item>
      </Link>
    </Wrapper>
  );
};

export default UserMenu;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: absolute;
  margin-top: 10px;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border-radius: ${({ theme }) => theme.rounded.sm};
`;

const Item = styled.div`
  text-align: center;
  padding: 12px 0;
  /* text-transform: uppercase; */
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.main};
  min-width: 125px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.main}1a;
`;
