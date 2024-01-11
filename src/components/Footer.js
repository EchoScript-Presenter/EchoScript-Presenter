import React from 'react';
import FooterCarousel from './FooterCarousel';
import ItemsCarousel from 'react-items-carousel';

function Footer({ setCurrentSlideIndex }) {
  const carouselItems = [
    /* 이미지 데이터 배열 */
  ];

  return (
    <div>
      <ItemsCarousel>
        {carouselItems.map((item, index) => (
          <div key={index} onClick={() => setCurrentSlideIndex(index)}>
            {/* 이미지 컨텐츠 */}
          </div>
        ))}
      </ItemsCarousel>
    </div>
  );
}

export default Footer;
