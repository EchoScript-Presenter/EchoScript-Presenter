import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; // 노트 사이의 간격 설정
`;

const PresenterNotesContainer = styled.div`
  padding: 20px;
  margin: 10px 10px 10px 10px; // 위아래 마진 10px, 좌우 마진은 자동으로 중앙 정렬
  width: 90%; // 너비 조정
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
  overflow-y: auto;
  max-height: 200px; 
`;

const Word = styled.span`
  &.highlighted {
    background-color: #ff0;
    font-weight: bold;
  }
  margin-right: 5px;
`;

function PresenterNotes({ content, index, isActive, setActiveItemIndex, totalItems }) {
  const words = content.split(' ');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      if (highlightedIndex < words.length) {
        intervalId = setInterval(() => {
          setHighlightedIndex((prevIndex) => prevIndex + 1);
        }, 1000);
      } else {
        const nextIndex = (index + 1) % totalItems;
        setActiveItemIndex(nextIndex);
      }
    }

    return () => {
      clearInterval(intervalId);
      if (!isActive) {
        setHighlightedIndex(0);
      }
    };
  }, [isActive, highlightedIndex, words.length, index, setActiveItemIndex, totalItems]);

  return (
    <NotesWrapper>
      <PresenterNotesContainer>
        {words.map((word, idx) => (
          <Word key={idx} className={idx < highlightedIndex ? 'highlighted' : ''}>
            {word}
          </Word>
        ))}
      </PresenterNotesContainer>
    </NotesWrapper>
  );
}

export default PresenterNotes;
