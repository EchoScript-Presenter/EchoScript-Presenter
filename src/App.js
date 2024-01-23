import React, { useState } from 'react';
import Header from './components/Header';
import MainArea from './components/MainArea';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import {
  AppContainer,
  HeaderContainer,
  BodyContainer,
  FooterContainer,
} from './AppStyled';

function App() {
  const [isPresentationMode, setIsPresentationMode] = useState(true); // 현재 발표자 모드인지 확인
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 초기 선택된 슬라이드 인덱스

  //PresenterNoteCarousel
  const [triggerWord, setTriggerWord] = useState(''); // 백엔드에서 받은 단어
  const notes = [
    /* 노트 데이터 배열, 혹은 PresenterNoteCarousel로 옮기기 */
  ];

  return (
    <AppContainer>
      <HeaderContainer>
        <Header isPresentationMode={isPresentationMode} />
      </HeaderContainer>
      <BodyContainer>
        <MainArea
          notes={notes}
          triggerWord={triggerWord}
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
      </FooterContainer>
    </AppContainer>
  );
}

export default App;
