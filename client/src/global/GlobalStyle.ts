import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
	--toastify-color-error: ${({ theme }) => theme.colors.error};
	--toastify-color-progress-error: ${({ theme }) => theme.colors.error};
	--toastify-color-success: ${({ theme }) => theme.colors.correct};
	--toastify-font-family: ${({ theme }) => theme.font};
	--toastify-text-color-error: ${({ theme }) => theme.colors.textAlt};
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	background-color: ${({ theme }) => theme.colors.background};
}

body, input, button {
	font-family: ${({ theme }) => theme.font};
	color: ${({ theme }) => theme.colors.text};
}

#portal {
	position: absolute;
	inset: 0;
	z-index: 999;
	pointer-events: none;
}

input, button {
	border: none;
	background: none;

	&:focus {
		outline: none;
	}
}

a {
	text-decoration: none;
	color: inherit; 
}

button {
	cursor: pointer;
  width: fit-content;
  line-height: 150%;
	user-select: none;
}

h1 {
	font-size: 1.75rem;
	font-weight: 600;
}
h2 {
	font-size: 1.5rem;
	font-weight: 500;
}
h3 {
	font-size: 1.375rem;
	font-weight: 500;
}
h4 {
	font-size: 1.25rem;
	font-weight: 400;
}
h5 {
	font-size: 1.125rem;
	font-weight: 400;
}

svg {
	color: ${({ theme }) => theme.colors.main};
}

extra {
	font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.main};
  font-weight: 500;
  user-select: none;

  &.correct {
    color: ${({ theme }) => theme.colors.correct};
  }

  &.incorrect {
    background-color: ${({ theme }) => theme.colors.error};
  }
}
`;

export default GlobalStyle;
