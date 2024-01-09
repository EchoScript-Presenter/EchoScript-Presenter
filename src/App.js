import React, { useState } from 'react';
import Header from './components/Header';
import MainArea from './components/MainArea';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import FeedbackCharacter from './components/FeedbackCharacter';
import { AppContainer, BodyContainer, FooterContainer } from './AppStyled';

function App() {
  // EditMode
  const [isPresentationMode, setIsPresentationMode] = useState(true);

  return (
    <AppContainer>
      <Header isPresentationMode={isPresentationMode} />
      <BodyContainer>
        <MainArea isPresentationMode={isPresentationMode} />
        <Sidebar
          isPresentationMode={isPresentationMode}
          setIsPresentationMode={setIsPresentationMode}
        />
      </BodyContainer>
      <FooterContainer>
        <Footer isPresentationMode={isPresentationMode} />
        <FeedbackCharacter isPresentationMode={isPresentationMode} />
      </FooterContainer>
    </AppContainer>
  );
}

export default App;
