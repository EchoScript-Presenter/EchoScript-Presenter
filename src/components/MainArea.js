import React, { useState } from 'react';
import { MainAreaContainer } from './MainAreaStyled';
import Slide1 from './Slides/Slide1';
import PresenterNotes from './PresenterNotes';

function MainArea({ currentSlideIndex }) {
  const slides = [<Slide1 />]; // 슬라이드 목록(Slide1, Slide2 ...)
  const [highlightedContent, setHighlightedContent] = useState(null);

  // 하이라이트 상태를 설정하는 함수
  const handleHighlight = (contentId) => {
    setHighlightedContent(contentId);
  };

  return (
    <MainAreaContainer>
      <Slide1
        onHighlight={handleHighlight}
        highlightedContent={highlightedContent}
      />
      <PresenterNotes
        onHighlight={handleHighlight}
        highlightedContent={highlightedContent}
      />
    </MainAreaContainer>
  );
}

export default MainArea;
