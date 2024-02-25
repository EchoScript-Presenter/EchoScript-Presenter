import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import PresenterNote from './PresenterNotes/PresenterNotes';

function PresenterNotesCarousel({ notes, triggerWord }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(3); // 슬라이드에 보여줄 아이템의 수

  // useEffect(() => {
  //   // 현재 가운데 노트의 마지막 단어 확인
  //   const currentNote = notes[activeItemIndex];
  //   const lastWord = currentNote.content.split(' ').pop();

  //   // 백엔드에서 받은 단어와 마지막 단어가 일치하면 다음 노트로 이동
  //   if (lastWord === triggerWord && activeItemIndex < notes.length - 1) {
  //     setActiveItemIndex(activeItemIndex + 1);
  //   }
  // }, [triggerWord, activeItemIndex, notes]);

  return (
    <ItemsCarousel
      vertical
      numberOfCards={3}
      activeItemIndex={activeItemIndex}
      requestToChangeActive={setActiveItemIndex}
      rightChevron={'>'}
      leftChevron={'<'}
      outsideChevron
    >
      {/* {notes.map((note, index) => (
        <PresenterNote key={index} title={note.title} content={note.content} />
      ))} */}
    </ItemsCarousel>
  );
}

export default PresenterNotesCarousel;
