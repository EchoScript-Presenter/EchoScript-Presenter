import React, { useState, useEffect, useMemo } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { useNote } from './NoteContext';
import { useSpeech } from './SpeechContext';
import {
  SlideIndicatorContainer,
  SlideIndicatorInput,
  TotalSlides,
} from './FooterStyled';
import useStore from './Store';
import { useNavigation } from './useNavigation';

function FooterCarousel({ setCurrentSlideIndex }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(5); // 슬라이드에 보여줄 아이템 수
  const { nextNote, prevNote, totalItems, activeNote, activeNoteIndex } =
    useNote();
  const { resetTranscript } = useSpeech();
  const { highlightedIndices, setHighlightedIndices } = useStore();
  const { navigateNotes } = useNavigation();

  // Carousel에 표시할 이미지 데이터
  const carouselItems = useMemo(
    () => [
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
    ],
    []
  );
  // 'Prev' 버튼 클릭 핸들러
  const handlePrevNote = () => {
    navigateNotes('prev');
  };

  // 'Next' 버튼 클릭 핸들러
  const handleNextNote = () => {
    navigateNotes('next');
  };

  useEffect(() => {
    const matchingIndex = carouselItems.findIndex(
      (item) => item.slideIndex === activeNote.slideIndex
    );
    //console.log(matchingIndex);
    if (matchingIndex !== -1) {
      // 중앙에 위치
      setActiveItemIndex(matchingIndex - Math.floor(numberOfCards / 2) + 2);
    }
  }, [activeNote.slideIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevNote();
      } else if (e.key === 'ArrowRight') {
        handleNextNote();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeNote.slideIndex]);

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
