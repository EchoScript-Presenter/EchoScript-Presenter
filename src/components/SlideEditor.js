import React, { useState } from 'react';

function SlideEditor({ slides, setSlides }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const saveSlide = () => {
    const newSlide = { title, content };
    setSlides([...slides, newSlide]);
    // 입력 필드 초기화
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="내용을 입력하세요"
      />
      <button onClick={saveSlide}>저장</button>
    </div>
  );
}

export default SlideEditor;
