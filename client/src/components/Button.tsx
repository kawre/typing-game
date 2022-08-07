import React, { DOMAttributes } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled, { css } from "styled-components";
import {
  BackgroundColorProps,
  space,
  SpaceProps,
  variant,
  width,
  WidthProps,
} from "styled-system";
// Types -------------------------------------------------------------------------

const handleSize = (size?: string) => {
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
    <Wrapper size={size} variant={variant} {...props}>
      <ThreeDots
        color="inherit"
        width={size === "lg" ? 40 : 30}
        height="100%"
        visible={isLoading}
        wrapperStyle={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <ChildrenWrapper isLoading={isLoading}>{children}</ChildrenWrapper>
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
  position: relative;
  font-weight: 500;

  ${({ size }) => handleSize(size)};
  ${width}
  ${space}
`;

const Wrapper = styled(Btn)<Props>(
  variant({
    prop: "variant",
    variants: {
      primary: {
        color: "text",
        fill: "text",
        bg: "main",
      },
      secondary: {
        color: "background",
        fill: "background",
        bg: "text",
      },
    },
  })
);

const ChildrenWrapper = styled.div<{ isLoading: boolean }>`
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
`;
