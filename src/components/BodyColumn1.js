import React, { useState } from 'react';
import { SlideContainer, FooterCarouselContainer } from './BodyColumnStyled1';
import SlideA from './Slides/SlideA';
import FooterCarousel from './FooterCarousel';

function BodyColumn1({
  isPresentationMode,
  currentSlideIndex,
  setCurrentSlideIndex,
  setHighlightedIndices,
  handleHighlight,
  highlightedContent,
  triggerWord,
  activeTitle,
}) {
  return (
    <>
      <SlideContainer>
        <SlideA
          onHighlight={handleHighlight}
          highlightedContent={highlightedContent}
          currentSlideIndex={currentSlideIndex} //여기서 받아와야하는것? 여기서 slideindex랑
          activeTitle={activeTitle}
        />
      </SlideContainer>
      <FooterCarouselContainer>
        <FooterCarousel
          setCurrentSlideIndex={setCurrentSlideIndex}
          setHighlightedIndices={setHighlightedIndices}
        />
      </FooterCarouselContainer>
    </>
  );
}

export default BodyColumn1;
