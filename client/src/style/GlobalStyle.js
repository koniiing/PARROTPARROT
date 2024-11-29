import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
  @font-face {
    font-family: "HakgyoansimNadeuriTTF-B";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimNadeuriTTF-B.woff2") format("woff2");
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: "NanumSquareRound";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-size: 10px;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-overflow-style: none;
    overflow-x: hidden;
    width: 375px; 
    height: 812px;
    display: flex;
    font-family: "NanumSquareRound", "HakgyoansimNadeuriTTF-B", sans-serif;
  }
    ::-webkit-scrollbar{
    display:none;
}
`;
