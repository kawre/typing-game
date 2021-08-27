import React, { HTMLAttributes } from "react";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { size, SizeProps, space, SpaceProps } from "styled-system";
import { useAuth } from "../contexts/AuthContext";
// Types -------------------------------------------------------------------------

interface Props extends SpaceProps, SizeProps, HTMLAttributes<HTMLDivElement> {}

// Component ---------------------------------------------------------------------
const Avatar: React.FC<Props> = (props) => {
  const { user } = useAuth();

  return (
    <Wrapper {...props}>
      {user ? <FaUserCircle /> : <FaRegUserCircle />}
    </Wrapper>
  );
};

export default Avatar;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<Props>`
  ${size}
  ${space}
	cursor: pointer;

  svg {
    /* color: ${({ theme }) => theme.colors.text}; */
    width: 100%;
    height: 100%;
  }
`;

Wrapper.defaultProps = {
  size: 26,
};
