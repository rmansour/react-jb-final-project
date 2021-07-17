import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    //We destructure our theme from props. So, instead of writing props.theme each time, we’re using a bunch of brackets instead. I’ll repeat myself: the theme is available because we’ve wrapped our global styles with ThemeProvider.
    background: ${({theme}) => theme.primaryDark};
    color: ${({theme}) => theme.primaryLight};
    height: 100vh;
    text-rendering: optimizeLegibility;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  h1 {
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
  }

  img {
    border-radius: 5px;
    height: auto;
    width: 10rem;
  }

  div {
    text-align: center;
  }

  small {
    display: block;
  }

  a {
    color: ${({theme}) => theme.primaryHover};
    text-decoration: none;
  }
`;
