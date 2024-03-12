import React from 'react';
import FooterCarousel from './FooterCarousel';
import FeedbackGraph from './FeedbackGraph';
import {
  FooterCarouselContainer,
  FeedbackGraphContainer,
} from './BodyColumnStyled2';
import PresenterNotesCarousel from './PresenterNoteCarousel';
import { PresenterNoteContainer } from './BodyColumnStyled2';

function BodyColumn2({
  setCurrentSlideIndex,
  currentSlideIndex,
  isPresentationMode,
  setHighlightedIndices,
  triggerWord,
  handleHighlight,
  highlightedContent,
}) {
  return (
    <>
      <FeedbackGraphContainer>
        <FeedbackGraph isPresentationMode={isPresentationMode} />
      </FeedbackGraphContainer>
      <PresenterNoteContainer>
        <PresenterNotesCarousel // 이 안에서 저장해둔 slideindex-title-content 맞으면 그거에 해당하는 note 나오게 하기
          isPresentationMode={isPresentationMode}
          currentSlideIndex={currentSlideIndex}
          //setActiveItemIndex={setActiveItemIndex}
          triggerWord={triggerWord}
          onHighlight={handleHighlight}
          // setActiveTitle={setActiveTitle}
          highlightedContent={highlightedContent}
        />
      </PresenterNoteContainer>
    </>
  );
}

export default BodyColumn2;
