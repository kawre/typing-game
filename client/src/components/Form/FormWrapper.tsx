import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Heading from "../Heading";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const FormWrapper: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <Heading>{pathname === "/login" ? "Login" : "Register"}</Heading>
      {children}
    </Wrapper>
  );
};

export default FormWrapper;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 24px;
  background: ${({ theme }) => theme.colors.main30};
  border-radius: ${({ theme }) => theme.rounded.md};
`;
