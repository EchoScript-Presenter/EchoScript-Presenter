import React, { useState } from 'react';
import Header from './components/Header';
import MainArea from './components/MainArea';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import FeedbackCharacter from './components/FeedbackCharacter';
import { AppContainer, BodyContainer, FooterContainer } from './AppStyled';

function App() {
  const [isPresentationMode, setIsPresentationMode] = useState(true); // 현재 발표자 모드인지 확인
  const [currentSlide, setCurrentSlide] = useState(0); // 현재 선택된 슬라이드의 인덱스

  return (
    <AppContainer>
      <Header isPresentationMode={isPresentationMode} />
      <BodyContainer>
        <MainArea
          isPresentationMode={isPresentationMode}
          currentSlide={currentSlide}
        />
        <Sidebar
          isPresentationMode={isPresentationMode}
          setIsPresentationMode={setIsPresentationMode}
        />
      </BodyContainer>
      <FooterContainer>
        <Footer
          isPresentationMode={isPresentationMode}
          setCurrentSlide={setCurrentSlide}
        />
        <FeedbackCharacter isPresentationMode={isPresentationMode} />
      </FooterContainer>
    </AppContainer>
  );
}

export default App;
