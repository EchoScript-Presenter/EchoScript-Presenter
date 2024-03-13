import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BodyColumn1 from './components/BodyColumn1';
import BodyColumn2 from './components/BodyColumn2';
import { SpeechProvider } from './components/SpeechContext';
import { NoteProvider } from './components/NoteContext';
import {
  AppContainer,
  HeaderContainer,
  BodyContainer,
  BodyColumnContainer1,
  BodyColumnContainer2,
} from './AppStyled';
import useStore from './components/Store';

function App() {
  const [isPresentationMode, setIsPresentationMode] = useState(true);
  const {
    currentSlideIndex,
    setCurrentSlideIndex,
    highlightedContent,
    setHighlightedContent,
    triggerWord,
    setTriggerWord,
    activeTitle,
  } = useStore();

  const handleHighlight = (contentId) => {
    setHighlightedContent(contentId);
  };

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
            <BodyColumnContainer1>
              <BodyColumn1
                isPresentationMode={isPresentationMode}
                currentSlideIndex={currentSlideIndex}
                handleHighlight={handleHighlight}
                highlightedContent={highlightedContent}
                triggerWord={triggerWord}
              />
            </BodyColumnContainer1>
            <BodyColumnContainer2>
              <BodyColumn2
                isPresentationMode={isPresentationMode}
                currentSlideIndex={currentSlideIndex}
              />
            </BodyColumnContainer2>
          </BodyContainer>
        </NoteProvider>
      </SpeechProvider>
    </AppContainer>
  );
}

export default App;
