import React from 'react';
import FooterCarousel from './FooterCarousel';
import FeedbackGraph from './FeedbackGraph';
import {
  FooterCarouselContainer,
  FeedbackGraphContainer,
} from './FooterStyled';
import ItemsCarousel from 'react-items-carousel';

function Footer({ setCurrentSlideIndex, isPresentationMode }) {
  const carouselItems = [
    /* 이미지 데이터 배열 */
  ];

  return (
    <>
      <FooterCarouselContainer>
        <ItemsCarousel>
          {carouselItems.map((item, index) => (
            <div key={index} onClick={() => setCurrentSlideIndex(index)}>
              {/* 이미지 컨텐츠 */}
            </div>
          ))}
        </ItemsCarousel>
      </FooterCarouselContainer>
      <FeedbackGraphContainer>
        <FeedbackGraph isPresentationMode={isPresentationMode} />
      </FeedbackGraphContainer>
    </>
  );
}

export default Footer;
