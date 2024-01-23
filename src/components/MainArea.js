import React, { useState } from 'react';
import {
  SlideContainer,
  PresenterNoteContainer,
  MainAreaContainer,
} from './MainAreaStyled';
import SlideA from './Slides/SlideA';
import PresenterNotesCarousel from './PresenterNoteCarousel';

function MainArea({ currentSlideIndex, notes, triggerWord }) {
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
        />
      </SlideContainer>
      <PresenterNoteContainer>
        <PresenterNotesCarousel
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
