import React from "react";
import styled, { css } from "styled-components";
import {
  backgroundColor,
  BackgroundColorProps,
  margin,
  MarginProps,
  variant,
} from "styled-system";
import { ThemeProps } from "../static/theme";
// Types -------------------------------------------------------------------------

interface Props extends MarginProps, BackgroundColorProps {
  size?: "default" | "lg";
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

// Component ---------------------------------------------------------------------
const Button: React.FC<Props> = ({
  children,
  size = "default",
  variant = "primary",
  isLoading = false,
  ...props
}) => {
  return (
    <Wrapper size={size} variant={variant} {...props}>
      {children}
    </Wrapper>
  );
};

export default Button;

// Styled ------------------------------------------------------------------------

const handleSize = (size: string) => {
  switch (size) {
    case "lg":
      return css`
        font-size: 1.125rem;
        padding: 0.625rem 1.25rem;
        border-radius: ${({ theme }) => theme.rounded.md};
      `;
    default:
      return css`
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
        border-radius: ${({ theme }) => theme.rounded.sm};
      `;
  }
};

const Btn = styled.button<Props>`
  ${margin}
  ${backgroundColor}

  ${({ size, theme }) => handleSize(size!)}
`;

const Wrapper = styled(Btn)<Props>(
  variant({
    prop: "variant",
    variants: {
      primary: {
        color: "text",
        bg: "main",
      },
      secondary: {
        color: "background",
        bg: "text",
      },
    },
  })
);

// Wrapper.defaultProps = {
//   color: "background",
//   // bg: "main",
// };
