import React, { useState } from 'react';
import Header from './components/Header';
import MainArea from './components/MainArea';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import FeedbackCharacter from './components/FeedbackCharacter';
import { AppContainer, BodyContainer, FooterContainer } from './AppStyled';

function App() {
  const [isPresentationMode, setIsPresentationMode] = useState(true); // 현재 발표자 모드인지 확인
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 초기 선택된 슬라이드 인덱스

  return (
    <AppContainer>
      <Header isPresentationMode={isPresentationMode} />
      <BodyContainer>
        <MainArea
          isPresentationMode={isPresentationMode}
          currentSlideIndex={currentSlideIndex}
        />
        <Sidebar
          isPresentationMode={isPresentationMode}
          setIsPresentationMode={setIsPresentationMode}
        />
      </BodyContainer>
      <FooterContainer>
        <Footer
          isPresentationMode={isPresentationMode}
          setCurrentSlideIndex={setCurrentSlideIndex}
        />
        <FeedbackCharacter isPresentationMode={isPresentationMode} />
      </FooterContainer>
    </AppContainer>
  );
}

export default App;
