import React, { HTMLAttributes, useState } from "react";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { size, SizeProps, space, SpaceProps } from "styled-system";
import { useAuth } from "../contexts/AuthContext";
import UserMenu from "./Header/UserMenu";
// Types -------------------------------------------------------------------------

interface Props extends SpaceProps, SizeProps, HTMLAttributes<HTMLDivElement> {}

// Component ---------------------------------------------------------------------
const Avatar: React.FC<Props> = (props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <Wrapper onClick={() => setOpen(true)} {...props}>
      {user ? <FaUserCircle /> : <FaRegUserCircle />}
      <UserMenu open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default Avatar;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<Props>`
  ${size}
  ${space}
	cursor: pointer;
  position: relative;

  svg {
    /* color: ${({ theme }) => theme.colors.text}; */
    width: 100%;
    height: 100%;
  }
`;

Wrapper.defaultProps = {
  size: 26,
};
