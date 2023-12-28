import React, { useState } from 'react';
import SlideEditor from './SlideEditor';
import NoteEditor from './NoteEditor';
import TimerSettings from './TimerSettings';
import StartPresentationButton from './StartPresentationButton';

function PresentationManager() {
  const [mode, setMode] = useState('edit'); // 'edit' 또는 'presentation'
  const [slides, setSlides] = useState([]);
  const [notes, setNotes] = useState([]);
  const [timer, setTimer] = useState(0);

  const onStartPresentation = () => {
    setMode('presentation'); // 프레젠테이션 모드로 전환
  };

  return (
    <div>
      {mode === 'edit' && (
        <>
          <SlideEditor slides={slides} setSlides={setSlides} />
          <NoteEditor notes={notes} setNotes={setNotes} />
          <TimerSettings timer={timer} setTimer={setTimer} />
          <StartPresentationButton onStartPresentation={onStartPresentation} />
        </>
      )}

      {mode === 'presentation' && (
        <div>프레젠테이션 모드 화면</div> // 여기에 프레젠테이션 모드 UI 구현
      )}
    </div>
  );
}

export default PresentationManager;
