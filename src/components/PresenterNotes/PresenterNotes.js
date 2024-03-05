import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ScriptTitle = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 7px;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 0px;
`;

const FontSizeButton = styled.button`
  font-size: 16px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: #be8be1;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #6a5acd;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  overflow-y: auto;
  margin-top: 0px;
`;

const PresenterNotesContainer = styled.div`
  padding: 20px;
  margin: 10px auto;
  width: 300px;
  max-height: 260px;
  overflow-y: auto;
  background-color: #ffffff; /* 메모장 배경색 */
  border-top: 30px solid #ffcc66; /* 테이프 또는 클립 색상 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  word-wrap: break-word;
  font-weight: bold;
  line-height: 1.5;
  position: relative; /* 포지션을 상대적으로 설정하여 테이프 또는 클립을 위치시킵니다. */
`;

const Title = styled.div`
  margin-top: -5px;
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 20px;
`;

const Word = styled.span`
  margin-right: 5px;
  color: ${(props) => {
    if (props.highlighted) return 'black';
    if (props.previous) return 'gray';
    return 'black';
  }};
  background-color: ${(props) => (props.highlighted ? '#ff0' : 'transparent')};
  display: inline-block;

  &.highlighted {
    background-color: #ff0;
  }
`;

const BottomRightText = styled.h3`
  position: absolute;
  top: 0;
  right: 15px;
  font-size: 16px;
  font-weight: normal;
  color: black;
  font-size: 13px;
  padding: 4px 6px; /* 내부 여백 추가 */
  background-color: #f8f9fa; /* 배경색 지정 */
  border: 1px solid #ced4da; /* 테두리 추가 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
`;

function PresenterNotes({
  noteindex,
  title,
  content,
  index,
  isActive,
  setActiveItemIndex,
  totalItems,
  isPresentationMode,
}) {
  const notesRef = useRef(null);
  const [fontSizes, setFontSizes] = useState(() =>
    new Array(totalItems).fill(16)
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const currentFontSize = fontSizes[index];

  useEffect(() => {
    let intervalId;
  
    if (isActive && isPresentationMode === false) {
      intervalId = setInterval(() => {
        setHighlightedIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          const container = notesRef.current;
          const highlightedElement = container.querySelector('.highlighted');
          if (highlightedElement) {
            const containerHeight = container.clientHeight;
            const elementHeight = highlightedElement.clientHeight;
            const scrollPosition = container.scrollTop;
            const elementTop = highlightedElement.offsetTop;
            const elementBottom = elementTop + elementHeight;
            if (elementTop < scrollPosition) {
              container.scrollTo({ top: elementTop, behavior: 'smooth' });
            } else if (elementBottom > scrollPosition + containerHeight) {
              container.scrollTo({
                top: elementBottom - containerHeight,
                behavior: 'smooth',
              });
            }
          } else {
            if (index === totalItems - 1) {
              clearInterval(intervalId); // 마지막 슬라이드일 때 애니메이션 정지
            } else {
              const nextIndex = (index + 1) % totalItems;
              setActiveItemIndex(nextIndex);
            }
          }
          return newIndex;
        });
      }, 1000);
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, index, setActiveItemIndex, totalItems, isPresentationMode]);
  

  const increaseFontSize = () => {
    setFontSizes((prevSizes) => {
      return prevSizes.map((size) => Math.min(size + 2, 26)); // 모든 슬라이드의 폰트 크기를 2px씩 증가
    });
  };

  const decreaseFontSize = () => {
    setFontSizes((prevSizes) => {
      return prevSizes.map((size) => Math.max(size - 2, 14)); // 모든 슬라이드의 폰트 크기를 2px씩 감소
    });
  };

  const goToPreviousNote = () => {
    // 첫번째 presenternote라면 previous slide move 중지
    if (index > 0) {
      setActiveItemIndex((index - 1 + totalItems) % totalItems);
    }
  };

  const goToNextNote = () => {
    // 마지막 presenternote라면 애니메이션 중지 & next move 중지
    if (index < totalItems - 1) {
      setActiveItemIndex((index + 1) % totalItems);
    }
  };

  const Content = styled.div``;

  return (
    <>
      <ScriptTitle>
        <h2
          style={{
            fontSize: '25px',
            marginLeft: '10px',
            display: 'inline-block',
          }}
        >
          Your Script
        </h2>
        <div>
          <FontSizeButton onClick={increaseFontSize}>+</FontSizeButton>
          <FontSizeButton onClick={decreaseFontSize}>-</FontSizeButton>
          <FontSizeButton onClick={goToPreviousNote}>◀︎</FontSizeButton>
          <FontSizeButton
            onClick={goToNextNote}
            disabled={index === totalItems - 1}
          >
            ▶︎
          </FontSizeButton>
        </div>
      </ScriptTitle>
      <NotesWrapper>
        <PresenterNotesContainer
          ref={notesRef}
          style={{ fontSize: `${currentFontSize}px` }}
        >
          <Title>{title}</Title>
          <Content>
            {content.split(' ').map((word, idx) => (
              <Word
                key={idx}
                className={idx === highlightedIndex ? 'highlighted' : ''}
                previous={idx < highlightedIndex}
                highlighted={idx === highlightedIndex}
              >
                {word}
              </Word>
            ))}
          </Content>
          <BottomRightText>{noteindex}</BottomRightText>
        </PresenterNotesContainer>
      </NotesWrapper>
    </>
  );
}

export default PresenterNotes;
