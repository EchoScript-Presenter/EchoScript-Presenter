import React, { useState } from 'react';

function NoteEditor({ notes, setNotes }) {
  const [noteContent, setNoteContent] = useState('');

  const handleNoteChange = (event) => {
    setNoteContent(event.target.value);
  };

  const saveNote = () => {
    const newNote = { content: noteContent };
    setNotes([...notes, newNote]);
    // 입력 필드 초기화
    setNoteContent('');
  };

  return (
    <div>
      <textarea
        value={noteContent}
        onChange={handleNoteChange}
        placeholder="노트 내용을 입력하세요"
      />
      <button onClick={saveNote}>저장</button>
    </div>
  );
}

export default NoteEditor;
