import React, { useState, useEffect, useRef } from 'react';
import { useSpeech } from '../SpeechContext';
import {
  ScriptTitle,
  FontSizeButton,
  NotesWrapper,
  PresenterNotesContainer,
  Title,
  Word,
  BottomRightText,
  Content,
  HighlightedText,
} from './PresenterNotesStyled';

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
  const { transcript, interimTranscript, finalTranscript, words, listening } =
    useSpeech();

  const notesRef = useRef(null);
  const [fontSizes, setFontSizes] = useState(() =>
    new Array(totalItems).fill(16)
  );

  const contentWords = content.split(' ');
  const displayContent = content.split(/(\s+|[.,!?:;])/).filter(Boolean); //화면에 표시되는 콘텐츠
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const currentFontSize = fontSizes[index];

  //새로운 코드
  useEffect(() => {
    const preprocessContent = content
      .toLowerCase()
      .replace(/[.,!?:;]/g, '')
      .split(/\s+/);
    const preprocessTranscript = transcript
      .toLowerCase()
      .replace(/[.,!?:;]/g, '')
      .split(/\s+/);

    let contentWordIndexMap = {};
    let newHighlightedIndices = [];

    preprocessTranscript.forEach((word) => {
      let startIndex =
        contentWordIndexMap[word] !== undefined
          ? contentWordIndexMap[word] + 1
          : 0;
      let indexInContent = preprocessContent.indexOf(word, startIndex);

      if (indexInContent !== -1) {
        newHighlightedIndices.push(indexInContent);
        contentWordIndexMap[word] = indexInContent;
      }
    });

    setHighlightedIndices(newHighlightedIndices);
  }, [transcript, content]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // 예: 1초마다 인덱스 업데이트

    return () => clearInterval(intervalId); // Cleanup
  }, [words]);

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

  return (
    <>
      <ScriptTitle>
        <h2
          style={{ marginTop:'0',
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
            {content.split(' ').map((word, idx) => {
              // highlightedIndices 배열을 사용해 현재 단어 인덱스가 하이라이트되어야 하는지 확인
              const isHighlighted = highlightedIndices.includes(idx);
              return (
                <HighlightedText key={idx} highlighted={isHighlighted}>
                  {word + ' '}
                </HighlightedText>
              );
            })}
          </Content>

          <BottomRightText>{noteindex}</BottomRightText>
        </PresenterNotesContainer>
      </NotesWrapper>
    </>
  );
}

export default PresenterNotes;