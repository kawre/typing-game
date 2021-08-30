import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import Heading from "../Heading";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const FormWrapper: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();

  if (user) return <Redirect to="/" />;

  return (
    <Wrapper>
      <Heading pb="24px">
        {pathname.includes("login") ? "Login" : "Register"}
      </Heading>
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
  background: ${({ theme }) => theme.colors.main}0d;
  border-radius: ${({ theme }) => theme.rounded.md};

  & form {
    display: flex;
    flex-direction: column;
  }
`;
