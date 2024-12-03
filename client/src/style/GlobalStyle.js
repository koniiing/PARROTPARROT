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

 html, body, #root {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    background-color: #FEF3D6; /* 전체 배경색 */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "NanumSquareRound", "HakgyoansimNadeuriTTF-B", sans-serif;
}

body {
    width: 375px; /* 디바이스 너비 고정 */
    height: 812px; /* 디바이스 높이 고정 */
    overflow-x: hidden; /* 가로 스크롤 숨기기 */
}
    ::-webkit-scrollbar{
    display:none;
}
`;
