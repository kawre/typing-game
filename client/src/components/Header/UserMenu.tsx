import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import Icon from "../Icon";
import Modal from "../Modal";
import Text from "../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const UserMenu: React.FC<Props> = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <Wrapper>
      {user ? (
        <Item onClick={() => setOpen(!open)}>
          <Text>Log Out</Text>
          <Icon as={FaSignOutAlt} size={18} />
        </Item>
      ) : (
        <>
          <Link to="/login">
            <Item>Log In</Item>
          </Link>
          <Link to="/register">
            <Item>Sign Up</Item>
          </Link>
        </>
      )}
    </Wrapper>
  );
};

export default UserMenu;

// Styled ------------------------------------------------------------------------

const Wrapper = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.main};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border-radius: ${({ theme }) => theme.rounded.md};
  color: ${({ theme }) => theme.colors.background};
  max-width: 600px;

  &::after {
    content: "";
    position: absolute;
    transform: translateX(50%);
    right: 50%;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${({ theme }) => theme.colors.main};
    bottom: 99%;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  min-width: 200px;
  padding: 24px 0;
  position: relative;
  cursor: pointer;

  p {
    font-size: 14px;
    font-weight: 500;
    color: inherit;
  }

  svg {
    color: inherit;
  }
`;
