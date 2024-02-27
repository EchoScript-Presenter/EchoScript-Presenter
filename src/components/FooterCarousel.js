import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import {
  SlideIndicatorContainer,
  SlideIndicatorInput,
  TotalSlides,
} from './FooterStyled';

function FooterCarousel({ setCurrentSlideIndex }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(5); // 슬라이드에 보여줄 아이템 수

  // Carousel에 표시할 이미지 데이터
  const carouselItems = [
    { src: `${process.env.PUBLIC_URL}/images/empty.png`, slideIndex: 1 },
    { src: `${process.env.PUBLIC_URL}/images/empty.png`, slideIndex: 2 },
    { src: `${process.env.PUBLIC_URL}/images/ppt1.png`, slideIndex: 3 },
    { src: `${process.env.PUBLIC_URL}/images/ppt2.png`, slideIndex: 4 },
    { src: `${process.env.PUBLIC_URL}/images/ppt3.png`, slideIndex: 5 },
    { src: `${process.env.PUBLIC_URL}/images/ppt4.png`, slideIndex: 6 },
    { src: `${process.env.PUBLIC_URL}/images/ppt5.png`, slideIndex: 7 },
    { src: `${process.env.PUBLIC_URL}/images/ppt6.png`, slideIndex: 8 },
    { src: `${process.env.PUBLIC_URL}/images/ppt7.png`, slideIndex: 9 },
    { src: `${process.env.PUBLIC_URL}/images/ppt8.png`, slideIndex: 10 },
    { src: `${process.env.PUBLIC_URL}/images/empty.png`, slideIndex: 11 },
    { src: `${process.env.PUBLIC_URL}/images/empty.png`, slideIndex: 12 },
  ];

  useEffect(() => {
    const centralIndex = activeItemIndex + Math.floor(numberOfCards / 2);

    setCurrentSlideIndex(carouselItems[centralIndex]?.slideIndex - 2 || 0);
  }, [activeItemIndex, numberOfCards, carouselItems, setCurrentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveItemIndex(activeItemIndex > 0 ? activeItemIndex - 1 : 0);
      } else if (e.key === 'ArrowRight') {
        setActiveItemIndex(
          activeItemIndex < carouselItems.length - numberOfCards
            ? activeItemIndex + 1
            : carouselItems.length - numberOfCards
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItemIndex, numberOfCards, carouselItems.length]);

  const handleSlideNumberChange = (e) => {
    const slideNumber = parseInt(e.target.value, 10) - 1;
    if (
      !isNaN(slideNumber) &&
      slideNumber >= 0 &&
      slideNumber < carouselItems.length
    ) {
      setActiveItemIndex(slideNumber);
      setCurrentSlideIndex(carouselItems[slideNumber]?.slideIndex || 0);
    }
  };

  return (
    <>
      <ItemsCarousel
        activeItemIndex={activeItemIndex}
        numberOfCards={numberOfCards}
      >
        {carouselItems.map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={`Slide ${item.slideIndex}`}
            onClick={() => {
              const newActiveIndex = index - Math.floor(numberOfCards / 2); // 중앙 이미지 기준으로 계산
              setActiveItemIndex(Math.max(0, newActiveIndex)); // 인덱스가 0보다 작아지지 않도록 조정
              setCurrentSlideIndex(item.slideIndex);
            }}
            style={{ width: '100%', height: 'auto', objectFit: 'fill' }} // 스타일 조정
          />
        ))}
      </ItemsCarousel>
      <SlideIndicatorContainer>
        <SlideIndicatorInput
          type="number"
          value={activeItemIndex + 1}
          onChange={handleSlideNumberChange}
        />
        <TotalSlides>/{carouselItems.length - 4}</TotalSlides>
      </SlideIndicatorContainer>
    </>
  );
}

export default FooterCarousel;
