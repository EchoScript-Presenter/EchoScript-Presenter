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
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    words,
    listening,
    startRecording,
    stopRecording,
  } = useSpeech();

  const notesRef = useRef(null);
  const [fontSizes, setFontSizes] = useState(() =>
    new Array(totalItems).fill(16)
  );

  const contentWords = content.split(' ');
  const displayContent = content.split(/(\s+|[.,!?:;])/).filter(Boolean); //화면에 표시되는 콘텐츠
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const currentFontSize = fontSizes[index];

  //새로운 코드
  //단어별 위치 매핑 생성
  const createWordPositionsMap = (content) => {
    const wordPositionsMap = {};
    const wordsFromContent = content.split(/\s+/);

    wordsFromContent.forEach((word, index) => {
      const lowerCaseWord = word.toLowerCase();
      if (!wordPositionsMap[lowerCaseWord]) {
        wordPositionsMap[lowerCaseWord] = [];
      }
      wordPositionsMap[lowerCaseWord].push(index);
    });

    return wordPositionsMap;
  };

  // 단어 위치에 따라 하이라이트 처리

  const updateHighlightedPositions = (
    transcript,
    wordPositionsMap,
    highlightedPositions
  ) => {
    const wordsFromTranscript = transcript
      .split(/\s+/)
      .map((word) => word.toLowerCase());
    const newHighlightedPositions = new Set([...highlightedPositions]);

    wordsFromTranscript.forEach((word) => {
      const positions = wordPositionsMap[word];
      if (positions) {
        // 다음에 하이라이트할 위치 찾기
        const nextPosition = positions.find(
          (position) => !newHighlightedPositions.has(position)
        );
        if (nextPosition !== undefined) {
          newHighlightedPositions.add(nextPosition);
        }
      }
    });

    return newHighlightedPositions;
  };

  // useEffect(() => {
  //   const wordPositionsMap = createWordPositionsMap(content);
  //   const newHighlightedPositions = updateHighlightedPositions(
  //     transcript,
  //     wordPositionsMap,
  //     highlightedPositions
  //   );
  //   setHighlightedPositions(newHighlightedPositions);
  // }, [transcript, content]);

  // console.log('highlightedWords', highlightedWords);
  // console.log('finalTranscript', finalTranscript);
  // console.log('transcript', transcript);
  useEffect(() => {
    const contentWords = content.toLowerCase().split(/\s+/);
    const transcriptWords = transcript.toLowerCase().split(/\s+/);

    let contentWordIndexMap = {}; // content 내 각 단어의 마지막 하이라이트 인덱스 추적
    let newHighlightedIndices = [];

    transcriptWords.forEach((word) => {
      let startIndex =
        contentWordIndexMap[word] !== undefined
          ? contentWordIndexMap[word] + 1
          : 0;
      let indexInContent = contentWords.indexOf(word, startIndex);

      if (indexInContent !== -1) {
        newHighlightedIndices.push(indexInContent);
        contentWordIndexMap[word] = indexInContent; // 단어의 새로운 위치 업데이트
      }
    });

    setHighlightedIndices(newHighlightedIndices);
  }, [transcript, content]);

  // useEffect(() => {
  //   // contentWords에서 구두점을 제거하고 소문자로 변환한 새 배열 생성
  //   const processedContentWords = contentWords.map((word) =>
  //     word.replace(/[.,!?:;"]/g, '').toLowerCase()
  //   );

  //   let newMatchedIndices = [];
  //   let lastIndex = -1;

  //   // words 배열 순회하며 processedContentWords와 매칭되는 인덱스 찾기
  //   words.forEach((word) => {
  //     const wordIndex = processedContentWords.indexOf(
  //       word.toLowerCase(),
  //       lastIndex + 1
  //     );
  //     if (wordIndex !== -1 && !newMatchedIndices.includes(wordIndex)) {
  //       newMatchedIndices.push(wordIndex);
  //       lastIndex = wordIndex; // 다음 검색 시작점 업데이트
  //     }
  //   });

  //   setMatchedIndices(newMatchedIndices);
  // }, [words, interimResult]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); // 예: 1초마다 인덱스 업데이트

    return () => clearInterval(intervalId); // Cleanup
  }, [words]);

  useEffect(() => {
    if (isActive && !isPresentationMode) {
      const updateHighlightingBasedOnSpeech = () => {
        // 여기서 인식된 단어를 바탕으로 하이라이트 업데이트 로직을 수행합니다.
        // 인식된 단어와 대본 내 단어 매칭 로직, matchedIndices 상태 업데이트
        // 이 로직은 words 상태의 변화에 따라 계속 업데이트 될 것입니다.
      };

      updateHighlightingBasedOnSpeech();

      // 하이라이트된 요소가 있다면 스크롤을 조정하여 사용자에게 보이게 합니다.
      const highlightedElement =
        notesRef.current?.querySelector('.highlighted');
      if (highlightedElement) {
        const container = notesRef.current;
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
      }

      // 마지막 단어가 하이라이트 되었을 때, 다음 슬라이드로 자동 전환
      if (
        matchedIndices.length > 0 &&
        matchedIndices[matchedIndices.length - 1] === contentWords.length - 1
      ) {
        // 마지막 단어에 도달했으면, 다음 슬라이드로 전환
        if (index < totalItems - 1) {
          setTimeout(() => {
            // 다음 슬라이드로 넘어가기 전에 약간의 지연 추가
            const nextIndex = (index + 1) % totalItems;
            setActiveItemIndex(nextIndex);
          }, 1000); // 1초 후 다음 슬라이드 전환
        }
      }
    }
  }, [
    words,
    isActive,
    isPresentationMode,
    matchedIndices,
    contentWords.length,
    index,
    totalItems,
  ]);

  const prevMatchedIndicesRef = useRef(); // 이전 matchedIndices 값을 저장하기 위한 ref
  const prevWordsRef = useRef(); // 이전 words 값을 저장하기 위한 ref

  // useEffect(() => {
  //   if (
  //     prevMatchedIndicesRef.current !== matchedIndices.join(',') ||
  //     prevWordsRef.current !== words.join(',')
  //   ) {
  //     console.log('PresenterNotes-interimResult', interimResult);
  //     console.log('words', words);
  //     console.log('matchedIndices:', matchedIndices);
  //     console.log(
  //       'Last matched index:',
  //       matchedIndices[matchedIndices.length - 1]
  //     );
  //     console.log('contentWords length:', contentWords.length);

  //     // 이전 값을 현재 값으로 업데이트
  //     prevMatchedIndicesRef.current = matchedIndices.join(',');
  //     prevWordsRef.current = words.join(',');
  //   }
  // }, [words]);

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
          {/* <Content>
            {contentWords.map((word, idx) => (
              <Word
                key={idx}
                className={matchedIndices.includes(idx) ? 'highlighted' : ''}
                highlighted={matchedIndices.includes(idx)}
              >
                {word}
              </Word>
            ))}
          </Content> */}
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
