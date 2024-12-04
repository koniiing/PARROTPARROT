import React, { useState, useEffect } from "react";
import Router from "./Router";
import { GlobalStyle } from "./style/GlobalStyle";
import Onboarding from "./common/Onboarding";
import Menu from "./common/menu";
import styled from "styled-components";
function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOnboarding(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyle />
      {showOnboarding ? (
        <Onboarding />
      ) : (
        <AppContainer>
          <Router />
        </AppContainer>
      )}
    </>
  );
}

export default App;
const AppContainer = styled.div`
  width: 376px;
  height: 100vh;
  overflow: scroll;
  margin: 0 auto;
`;
