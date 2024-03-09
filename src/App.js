import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import MainArea from './components/MainArea';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ScrollLogger from './components/ScrollLogger';
import { SpeechProvider } from './components/SpeechContext';
import { NoteProvider } from './components/NoteContext';
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

  return (
    <AppContainer>
      <SpeechProvider>
        <NoteProvider>
          <HeaderContainer>
            <Header isPresentationMode={isPresentationMode} />
            <Sidebar
              isPresentationMode={isPresentationMode}
              setIsPresentationMode={setIsPresentationMode}
            />
          </HeaderContainer>
          <BodyContainer>
            <MainArea
              triggerWord={triggerWord}
              isPresentationMode={isPresentationMode}
              currentSlideIndex={currentSlideIndex}
              setCurrentSlideIndex={setCurrentSlideIndex}
            />
            <ScrollLogger />
          </BodyContainer>
          <FooterContainer>
            <Footer
              isPresentationMode={isPresentationMode}
              setCurrentSlideIndex={setCurrentSlideIndex}
            />
          </FooterContainer>
        </NoteProvider>
      </SpeechProvider>
    </AppContainer>
  );
}

export default App;
