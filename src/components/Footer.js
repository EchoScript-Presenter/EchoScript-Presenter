import React from 'react';
import FooterCarousel from './FooterCarousel';

function Footer({ setCurrentSlide }) {
  const handleSlideClick = (slideIndex) => {
    setCurrentSlide(slideIndex);
    // ... 슬라이드 클릭 시 로직 ...
  };

  return (
    <div>
      <FooterCarousel setCurrentSlide={setCurrentSlide} />
    </div>
  );
}

export default Footer;
