import React, { useState } from 'react';
import {
  SlideContainer,
  PresenterNoteContainer,
  MainAreaContainer,
} from './MainAreaStyled';
import SlideA from './Slides/SlideA';
import PresenterNotesCarousel from './PresenterNoteCarousel';


function MainArea({ currentSlideIndex, notes, triggerWord, isPresentationMode }) {
  const slides = [<SlideA />]; // 슬라이드 목록(Slide1, Slide2 ...)
  const [highlightedContent, setHighlightedContent] = useState(null);

  // 하이라이트 상태를 설정하는 함수
  const handleHighlight = (contentId) => {
    setHighlightedContent(contentId);
  };

  return (
    <MainAreaContainer>
      <SlideContainer>
        <SlideA
          onHighlight={handleHighlight}
          highlightedContent={highlightedContent}
          currentSlideIndex={currentSlideIndex} //여기서 받아와야하는것? 여기서 slideindex랑
        />
      </SlideContainer>
      <PresenterNoteContainer>
        <PresenterNotesCarousel // 이 안에서 저장해둔 slideindex-title-content 맞으면 그거에 해당하는 note 나오게 하기
          isPresentationMode={isPresentationMode}
          currentSlideIndex={currentSlideIndex}
          //setActiveItemIndex={setActiveItemIndex}
          notes={notes}
          triggerWord={triggerWord}
          onHighlight={handleHighlight}
          highlightedContent={highlightedContent}
        />
      </PresenterNoteContainer>
    </MainAreaContainer>
  );
}

export default MainArea;
