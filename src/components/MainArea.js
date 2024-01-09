import React, { useState } from 'react';
import { MainAreaContainer } from './MainAreaStyled';
import Slide from './Slide';
import PresenterNotes from './PresenterNotes';

function MainArea({ currentSlide }) {
  const [highlightedContent, setHighlightedContent] = useState(null);

  // 하이라이트 상태를 설정하는 함수
  const handleHighlight = (contentId) => {
    setHighlightedContent(contentId);
  };

  return (
    <MainAreaContainer>
      <Slide
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
