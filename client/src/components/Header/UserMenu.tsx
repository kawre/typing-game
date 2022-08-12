import {
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";
import { client } from "../AppWrapper";
import Icon from "../Icon";
// Types -------------------------------------------------------------------------

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component ---------------------------------------------------------------------
const UserMenu: React.FC<Props> = ({ open, setOpen }) => {
  const { mutateAsync } = useMutation(["me"], logout, {
    onSuccess: () => client.invalidateQueries(),
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;
  return (
    <Wrapper>
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <Menu
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: {
              duration: 0.2,
              ease: "backOut",
            },
          }}
        >
          {user ? (
            <>
              <Link to={`/user/${user.id}`}>
                <Item>
                  Profile
                  <Icon as={faUser} ml={2} size={16} />
                </Item>
              </Link>
              <Item
                onClick={async () => {
                  const ok = await mutateAsync();
                  if (ok) navigate("/");
                }}
              >
                Log Out
                <Icon as={faSignOutAlt} ml={2} size={18} />
              </Item>
            </>
          ) : (
            <>
              <Link to="/login">
                <Item>
                  Log In
                  <Icon as={faSignInAlt} ml={2} size={18} />
                </Item>
              </Link>
              <Link to="/register">
                <Item>
                  Sign Up
                  <Icon as={faUserPlus} ml={2} size={18} />
                </Item>
              </Link>
            </>
          )}
        </Menu>
      </OutsideClickHandler>
    </Wrapper>
  );
};

export default UserMenu;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: absolute;
  top: 150%;
  left: 50%;
  transform: translateX(-50%);
`;

const Menu = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.main};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border-radius: ${({ theme }) => theme.rounded.md};
  color: ${({ theme }) => theme.colors.background};
  max-width: 600px;
  position: relative;
  padding: 0.5rem 0;

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
  padding: 16px 0;
  position: relative;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: inherit;

  svg {
    color: inherit;
  }
`;
