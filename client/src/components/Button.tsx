import React, { DOMAttributes } from "react";
import Loader from "react-loader-spinner";
import styled, { css } from "styled-components";
import {
  SpaceProps,
  space,
  BackgroundColorProps,
  backgroundColor,
  variant,
  WidthProps,
  width,
} from "styled-system";
import { theme } from "../static/theme";
// Types -------------------------------------------------------------------------

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
        font-weight: 500;
        border-radius: ${({ theme }) => theme.rounded.sm};
      `;
  }
};

interface Props
  extends SpaceProps,
    BackgroundColorProps,
    WidthProps,
    DOMAttributes<HTMLButtonElement> {
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
    <Wrapper size={size} variant={variant} isLoading={isLoading} {...props}>
      {isLoading ? (
        <Loader
          type="ThreeDots"
          color={theme.colors.background}
          width={size === "lg" ? 40 : 30}
          height="100%"
        />
      ) : (
        children
      )}
    </Wrapper>
  );
};

export default Button;

// Styled ------------------------------------------------------------------------

const Btn = styled.button<Props>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  box-shadow: ${({ theme }) => theme.shadow.sm};

  ${({ size }) => handleSize(size!)};
  ${width}
  ${space}
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
