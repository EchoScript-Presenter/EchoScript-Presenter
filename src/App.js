import React, { useState } from 'react';
import Header from './components/Header';
import MainArea from './components/MainArea';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import FeedbackCharacter from './components/FeedbackCharacter';
import { AppContainer, BodyContainer, FooterContainer } from './AppStyled';

function App() {
  // EditMode
  const [isEditMode, setIsEditMode] = useState(true);

  return (
    <AppContainer>
      <Header isEditMode={isEditMode} />
      <BodyContainer>
        <MainArea isEditMode={isEditMode} />
        <Sidebar isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      </BodyContainer>
      <FooterContainer>
        <Footer isEditMode={isEditMode} />
        <FeedbackCharacter isEditMode={isEditMode} />
      </FooterContainer>
    </AppContainer>
  );
}

export default App;
