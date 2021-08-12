import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html {
	background-color: ${({ theme }) => theme.colors.background};
}

body, input {
	font-family: ${({ theme }) => theme.font};
}

input, button {
	border: none;
	background: none;
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
`;

export default GlobalStyle;
