import { faCog, faMoon } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../Avatar";
import Heading from "../Heading";
import Icon from "../Icon";
import Text from "../Text";
import { toast } from "react-toastify";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Header: React.FC<Props> = () => {
  const { user } = useAuth();

  return (
    <Wrapper>
      <Left>
        <Link to="/">
          <Heading fontWeight={500}>TypeRacer</Heading>
        </Link>
      </Left>
      <Right>
        {/* <Shop>
          <Text>shop</Text>
          <Balance>
            <FaShoppingCart />
            <Text>30$</Text>
          </Balance>
        </Shop> */}
        <Icon
          as={faMoon}
          size={22}
          onClick={() => {
            toast.info("Refresh the page to apply the theme change");
            const theme = localStorage.getItem("theme");
            if (theme === "light") {
              localStorage.setItem("theme", "dark");
            } else {
              localStorage.setItem("theme", "light");
            }
          }}
        />
        {/* <Divider /> */}

        <Menu>
          {/* <Link to="/settings">
            <Icon as={faCog} size={22} />
          </Link> */}
          {/* <Icon
            as={!Config.get("darkMode") ? FaMoon : FaSun}
            onClick={() =>
              Config.set({ darkMode: !Config.get("darkMode") }, user?._id)
            }
          /> */}
          {user ? (
            <UserStats>
              <Text mx={3} fontWeight={600} fontSize={16}>
                {user.username}
              </Text>
              <Avatar />
            </UserStats>
          ) : (
            <Avatar ml={3} />
          )}
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
  align-items: center;
`;

const Menu = styled.div`
  position: relative;
  display: flex;
  align-items: center;

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

const UserStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px 10px 0;
  margin-left: 12px;
  background-color: ${({ theme }) => theme.colors.sub};
  border-radius: ${({ theme }) => theme.rounded.md};

  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;
