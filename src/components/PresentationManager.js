import React, { useState } from 'react';
import SlideEditor from './SlideEditor';
import NoteEditor from './NoteEditor';
import TimerSettings from './TimerSettings';
import StartPresentationButton from './StartPresentationButton';

function PresentationManager() {
  // 상태 관리 예시
  const [slides, setSlides] = useState([]);
  const [notes, setNotes] = useState([]);
  const [timer, setTimer] = useState(0);

  return (
    <div>
      <SlideEditor slides={slides} setSlides={setSlides} />
      <NoteEditor notes={notes} setNotes={setNotes} />
      <TimerSettings timer={timer} setTimer={setTimer} />
      <StartPresentationButton />
    </div>
  );
}

export default PresentationManager;
