import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { useField, ErrorMessage } from "formik";
import { FaExclamationTriangle } from "react-icons/fa";
import { useEffect } from "react";
// Types -------------------------------------------------------------------------

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: "username" | "email" | "password";
  label?: string;
}

// Component ---------------------------------------------------------------------
const Input: React.FC<Props> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <Controller>
      <Wrapper error={!!error} {...field} {...props} />
      <Error>
        {error && (
          <>
            <FaExclamationTriangle />
            <span>{error}</span>
          </>
        )}
      </Error>
    </Controller>
  );
};

export default Input;

// Styled ------------------------------------------------------------------------

const Controller = styled.div``;

const Wrapper = styled.input<{ error: boolean }>`
  padding: 8px 16px;
  width: 100%;
  border-radius: ${({ theme }) => theme.rounded.sm};
  background-color: ${({ theme }) => theme.colors.main}0d;
  font-size: 1rem;
  transition: 200ms ease-in-out;

  border: 2px solid ${(p) => (p.error ? p.theme.colors.error : "transparent")};

  &:focus {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const Error = styled.div`
  width: 100%;
  height: 24px;
  font-size: 0.75rem;
  margin-left: 22px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.error};

  svg {
    color: inherit;
    margin-right: 6px;
  }
`;
