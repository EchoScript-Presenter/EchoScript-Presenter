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
  sec,
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
  const endOfContentRef = useRef(null);
  const [fontSizes, setFontSizes] = useState(() =>
    new Array(totalItems).fill(16)
  );

  const currentFontSize = fontSizes[index];

  const [highlightStartTime, setHighlightStartTime] = useState(null);
  const {
    highlightedIndicesState,
    setHighlightedIndicesState,
    duration,
    setDuration,
    setIntervals,
    setIndex,
  } = useStore();

  // 폰트 크기 전역으로 관리 (저장) 웹 브라우저 간단한 키-값 저장소 이용... 페이지를 새로고침하거나 다시 방문했을 때도 이전에 설정한 폰트 크기를 유지...
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSizes(() =>
        new Array(totalItems).fill(parseInt(savedFontSize, 10))
      );
    }
  }, [totalItems]);

  const increaseFontSize = () => {
    setFontSizes((prevSizes) => {
      const newSize = Math.min(prevSizes[index] + 2, 26);
      localStorage.setItem('fontSize', newSize.toString()); // 새 폰트 크기를 localStorage에 저장합니다.
      return prevSizes.map(() => newSize);
    });
  };

  const decreaseFontSize = () => {
    setFontSizes((prevSizes) => {
      const newSize = Math.max(prevSizes[index] - 2, 14);
      localStorage.setItem('fontSize', newSize.toString()); // 새 폰트 크기를 localStorage에 저장합니다.
      return prevSizes.map(() => newSize);
    });
  };

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
      let newHighlightedIndices = preprocessTranscript.reduce(
        (acc, word) => {
          //여기를 바꾸기
          let startIndex =
            contentWordIndexMap[word] !== undefined
              ? contentWordIndexMap[word] + 1
              : 0;
          //console.log('Start Index:',startIndex)
          //console.log('Word:',word)
          let indexInContent = preprocessContent.indexOf(word, startIndex);
          //console.log("IndexinContent:",indexInContent)

          if (indexInContent !== -1) {
            let beforeIndices = Array.from(
              { length: indexInContent + 1 },
              (_, i) => i
            );
            let endIndex = Math.min(
              indexInContent + 3,
              preprocessContent.length
            );
            let afterIndices = Array.from(
              { length: endIndex - indexInContent },
              (_, i) => indexInContent + 1 + i
            );

            //console.log('beforeIndices:',beforeIndices)
            //console.log('afterIndices:',afterIndices)

            acc.beforeIndices = [
              ...new Set([...acc.beforeIndices, ...beforeIndices]),
            ]; // 중복 제거
            acc.afterIndices = [
              ...new Set([...acc.afterIndices, ...afterIndices]),
            ]; // 중복 제거

            contentWordIndexMap[word] = indexInContent;
          }
          return acc;
        },
        { beforeIndices: [], afterIndices: [] }
      );

      setHighlightedIndicesState(newHighlightedIndices);

      // 새로운 코드: 여기서부터는 speed 개선 코드
      if (!highlightStartTime) {
        setHighlightStartTime(Date.now());
      }

      // 모든 글자가 Gray 처리되었는지 확인하고, 다 되면 endtime
      const allGray =
        newHighlightedIndices.afterIndices.length === preprocessContent.length;
      //console.log("newHighlightedIndices.afterIndices.length",newHighlightedIndices.afterIndices.length);
      //console.log("processContent.length:",preprocessContent.length);
      if (allGray) {
        const endTime = Date.now();
        //console.log("End time:",endTime);
        setDuration((endTime - highlightStartTime) / 1000);
      } else {
        setDuration(0);
      }
      //console.log('Duration:', duration, '\n\n\n');

      let lower_bound = Math.floor(sec - (sec * 1) / 3); // 얼마나 민감한지 보고 결정하기
      let upper_bound = Math.floor(sec + (sec * 1) / 3);
      let intervals = [];

      for (let i = 0; i < 8; i++) {
        intervals.push([
          lower_bound + ((upper_bound - lower_bound) / 8) * i,
          lower_bound + ((upper_bound - lower_bound) / 8) * (i + 1),
        ]);
      }

      let index = null;
      for (let i = 0; i < intervals.length; i++) {
        if (duration == 0) {
          index = 4;
        }
        else if (duration > 0 && duration < intervals[0][0]){
          index = 8;
        } else if (duration > intervals[7][1]) {
          index = 1;
        } else if (duration >= intervals[i][0] && duration < intervals[i][1]) {
          index = intervals.length - 1 - i;
          break;
        }
      }
      /* console.log(
        '!Sec:',
        sec,
        'Intervals:',
        intervals,
        'Index:',
        index,
        '\n\n\n'
      );*/
      setIntervals(intervals);
      setIndex(index);

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

  // 하이라이트된 텍스트가 있으면 해당 위치로 스크롤
  const highlightedRef = useRef(null);
  useEffect(() => {
    if (highlightedRef.current) {
      highlightedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [highlightedIndicesState]);

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

    if (
      (checkWordsMatch(last3WordsContent, last3WordsTranscript, 3) ||
        checkWordsMatch(last5WordsContent, last5WordsTranscript, 3)) &&
      index < totalItems - 1
    ) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        navigateNotes('next');
      }, 500);
    }

    return () => clearTimeout(timeoutId); // 컴포넌트 unmount 시 타이머 정리
  }, [content, finalTranscript, transcript]);

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
              const isBeforeHighlighted =
                highlightedIndicesState?.beforeIndices?.includes(idx);
              const isAfterHighlighted =
                highlightedIndicesState?.afterIndices?.includes(idx);

              if (isBeforeHighlighted) {
                return (
                  <HighlightedText key={idx} ref={highlightedRef}>
                    {word + ' '}
                  </HighlightedText>
                );
              } else if (isAfterHighlighted) {
                return <GrayText key={idx}>{word + ' '}</GrayText>;
              } else {
                return <span key={idx}>{word + ' '}</span>;
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
