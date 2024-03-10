import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSpeech } from '../SpeechContext';
import { useNote } from '../NoteContext';
import {
  ScriptTitle,
  FontSizeButton,
  NotesWrapper,
  PresenterNotesContainer,
  Title,
  BottomRightText,
  Content,
  HighlightedText,
  GrayText,
} from './PresenterNotesStyled';
import useStore from '../Store';
import { useNavigation } from '../useNavigation';

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
    resetTranscript,
  } = useSpeech();
  const { navigateNotes } = useNavigation();
  const notesRef = useRef(null);
  const [fontSizes, setFontSizes] = useState(() =>
    new Array(totalItems).fill(16)
  );
  const { highlightedIndicesState, setHighlightedIndicesState } = useStore();
  const currentFontSize = fontSizes[index];

  const removeEmojis = (string) => {
    var regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
  };

  //새로운 코드
  useEffect(() => {
    if (isActive && !isPresentationMode && transcript.trim().length > 0) {
      const preprocessContent = content
        .toLowerCase()
        .replace(/[.,!?:;]/g, '')
        .split(/\s+/);
      const preprocessTranscript = transcript
        .toLowerCase()
        .replace(/[.,!?:;]/g, '')
        .split(/\s+/);

      let contentWordIndexMap = {}; // content를 잘라서 index 가져오기
      let newHighlightedIndices = preprocessTranscript.reduce((acc, word) => { //여기를 바꾸기
        let startIndex =
          contentWordIndexMap[word] !== undefined
            ? contentWordIndexMap[word] + 1
            : 0;
        console.log('Start Index:',startIndex)
        console.log('Word:',word)
        let indexInContent = preprocessContent.indexOf(word, startIndex);
        console.log("IndexinContent:",indexInContent)
        
        if (indexInContent !== -1) {

          let beforeIndices = Array.from({ length: indexInContent + 1 }, (_, i) => i);
          let endIndex = Math.min(indexInContent + 3, preprocessContent.length); 
          let afterIndices = Array.from({ length: endIndex - indexInContent }, (_, i) => indexInContent + 1 + i);

          console.log('beforeIndices:',beforeIndices)
          console.log('afterIndices:',afterIndices)
          
          acc.beforeIndices = [...new Set([...acc.beforeIndices, ...beforeIndices])]; // 중복 제거
          acc.afterIndices = [...new Set([...acc.afterIndices, ...afterIndices])]; // 중복 제거

          contentWordIndexMap[word] = indexInContent;
        }
        return acc;
      }, {beforeIndices: [], afterIndices: []});

      setHighlightedIndicesState(newHighlightedIndices);

      // 새로운 상태와 현재 상태를 비교
      const arraysEqual = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      };

      // 실제로 변경이 필요한 경우에만 상태를 업데이트
      if (!arraysEqual(newHighlightedIndices, highlightedIndicesState)) {
        setHighlightedIndicesState(newHighlightedIndices);
      }
    }
  }, [transcript, content, isActive, isPresentationMode]);

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

  // const goToPreviousNote = () => {
  //   // 첫번째 presenternote라면 previous slide move 중지
  //   if (index > 0) {
  //     setActiveItemIndex((index - 1 + totalItems) % totalItems);
  //   }
  // };

  // const goToNextNote = () => {
  //   // 마지막 presenternote라면 애니메이션 중지 & next move 중지
  //   if (index < totalItems - 1) {
  //     setActiveItemIndex((index + 1) % totalItems);
  //   }
  // };

  // 'Prev' 버튼 클릭 핸들러
  const handlePrevNoteClick = () => {
    console.log('handlePrevNoteClick called');
    navigateNotes('prev');
  };

  // 'Next' 버튼 클릭 핸들러
  const handleNextNoteClick = () => {
    console.log('handleNextNoteClick called');
    navigateNotes('next');
  };

  useEffect(() => {
    const extractLastWords = (text, numberOfWords) => {
      text = removeEmojis(text);
      return text
        .toLowerCase()
        .replace(/[.,!?:;]/g, '')
        .split(/\s+/)
        .slice(-numberOfWords);
    };

    const checkWordsMatch = (arr1, arr2, requiredMatches) => {
      const matches = arr1.filter((word) => arr2.includes(word)).length;
      return matches >= requiredMatches;
    };

    const last3WordsContent = extractLastWords(content, 3);
    const last3WordsTranscript = extractLastWords(finalTranscript, 3);
    const last5WordsContent = extractLastWords(content, 5);
    const last5WordsTranscript = extractLastWords(finalTranscript, 5);

    let timeoutId;

    // 조건 검사
    if (
      (checkWordsMatch(last3WordsContent, last3WordsTranscript, 3) ||
        checkWordsMatch(last5WordsContent, last5WordsTranscript, 3)) &&
      index < totalItems - 1
    ) {
      // 기존에 설정된 타이머가 있다면 초기화
      clearTimeout(timeoutId);
      // 1초 후에 다음 노트로 자동 이동
      timeoutId = setTimeout(() => {
        navigateNotes('next');
      }, 500);
    }

    return () => clearTimeout(timeoutId); // 컴포넌트 unmount 시 타이머 정리
  }, [content, finalTranscript, transcript]);

  // useEffect(() => {
  //   const highlightedElement = notesRef.current?.querySelector('.highlighted');
  //   if (highlightedElement) {
  //     const container = notesRef.current;
  //     const containerHeight = container.clientHeight;
  //     const elementHeight = highlightedElement.clientHeight;
  //     const scrollPosition = container.scrollTop;
  //     const elementTop = highlightedElement.offsetTop;
  //     const elementBottom = elementTop + elementHeight;

  //     if (elementTop < scrollPosition) {
  //       container.scrollTo({ top: elementTop, behavior: 'smooth' });
  //     } else if (elementBottom > scrollPosition + containerHeight) {
  //       container.scrollTo({
  //         top: elementBottom - containerHeight,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }
  // }, [highlightedIndices]);

  return (
    <>
      <ScriptTitle>
        <h2
          style={{
            marginTop: '0',
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
          <FontSizeButton onClick={handlePrevNoteClick}>◀︎</FontSizeButton>
          <FontSizeButton
            onClick={handleNextNoteClick}
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
              const isBeforeHighlighted = highlightedIndicesState?.beforeIndices?.includes(idx);
              const isAfterHighlighted = highlightedIndicesState?.afterIndices?.includes(idx);

              if (isBeforeHighlighted) {
                return (
                  <HighlightedText
                    key={idx}
                  >
                    {word + ' '}
                  </HighlightedText>
                );
              } else if (isAfterHighlighted) {
                return (
                  <GrayText 
                  key={idx}
                  >
                    {word + ' '}
                  </GrayText>
                );
              } else {
                return (
                  <span key={idx}>{word + ' '}</span>
                );
              }
            })}
          </Content>


          <BottomRightText>{noteindex}</BottomRightText>
        </PresenterNotesContainer>
      </NotesWrapper>
    </>
  );
}

export default PresenterNotes;
