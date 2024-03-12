import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import PresenterNotes from './PresenterNotes/PresenterNotes';
import { useNote } from './NoteContext';
import useStore from './Store';

function PresenterNotesCarousel({ isPresentationMode }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { carouselItems, activeNoteIndex, activeNote } = useNote(); // Context에서 필요한 데이터를 가져옴
  const { activeTitle, setActiveTitle } = useStore();

  useEffect(() => {
    setActiveItemIndex(activeNoteIndex);
  }, [activeNoteIndex]);

  useEffect(() => {
    if (activeNote) {
      setActiveTitle(activeNote.title);
    }
  }, [activeNote]);

  return (
    <ItemsCarousel
      vertical={true}
      numberOfCards={1}
      activeItemIndex={activeItemIndex}
      requestToChangeActive={setActiveItemIndex}
      gutter={20}
      slidesToScroll={1}
      showSlither={false}
      firstAndLastGutter={false}
    >
      <PresenterNotes
        key={activeNote.index}
        noteindex={activeNote.noteindex}
        title={activeNote.title}
        content={activeNote.content}
        isActive={true}
        setActiveItemIndex={setActiveItemIndex}
        isPresentationMode={isPresentationMode}
        index={activeNoteIndex}
        totalItems={carouselItems.length}
      />
    </ItemsCarousel>
  );
}

export default PresenterNotesCarousel;
