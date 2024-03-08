import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import MainArea from './components/MainArea';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { SpeechProvider } from './components/SpeechContext';
import {
  AppContainer,
  HeaderContainer,
  BodyContainer,
  FooterContainer,
} from './AppStyled';

function App() {
  const [isPresentationMode, setIsPresentationMode] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(5);

  const [triggerWord, setTriggerWord] = useState('');

  const notes = [
    // 노트 데이터 배열
  ];

  return (
    <AppContainer>
      <SpeechProvider>
        <HeaderContainer>
          <Header isPresentationMode={isPresentationMode} />
          <Sidebar
            isPresentationMode={isPresentationMode}
            setIsPresentationMode={setIsPresentationMode}
          />
        </HeaderContainer>
        <BodyContainer>
          <MainArea
            notes={notes}
            triggerWord={triggerWord}
            isPresentationMode={isPresentationMode}
            currentSlideIndex={currentSlideIndex}
            setCurrentSlideIndex={setCurrentSlideIndex}
          />
        </BodyContainer>
        <FooterContainer>
          <Footer
            isPresentationMode={isPresentationMode}
            setCurrentSlideIndex={setCurrentSlideIndex}
          />
        </FooterContainer>
      </SpeechProvider>
    </AppContainer>
  );
}

export default App;
