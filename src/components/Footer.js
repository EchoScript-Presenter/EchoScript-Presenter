import React from 'react';
import FooterCarousel from './FooterCarousel';
import FeedbackGraph from './FeedbackGraph';
import {
  FooterCarouselContainer,
  FeedbackGraphContainer,
} from './FooterStyled';

function Footer({
  setCurrentSlideIndex,
  isPresentationMode,
  setHighlightedIndices,
}) {
  return (
    <>
      <FooterCarouselContainer>
        <FooterCarousel
          setCurrentSlideIndex={setCurrentSlideIndex}
          setHighlightedIndices={setHighlightedIndices}
        />
      </FooterCarouselContainer>
      <FeedbackGraphContainer>
        <FeedbackGraph isPresentationMode={isPresentationMode} />
      </FeedbackGraphContainer>
    </>
  );
}

export default Footer;
