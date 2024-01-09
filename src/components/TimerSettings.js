import React, { useState } from 'react';

function TimerSettings({ setTimeLimit }) {
  const [inputTime, setInputTime] = useState('');

  const handleTimeChange = (event) => {
    setInputTime(event.target.value);
  };

  const handleSubmit = () => {
    // 분을 초로 변환하여 상위 컴포넌트에 전달
    setTimeLimit(Number(inputTime) * 60);
  };

  return (
    <div>
      <input
        type="number"
        value={inputTime}
        onChange={handleTimeChange}
        placeholder="시간을 설정하세요 (분)"
      />
      <button onClick={handleSubmit}>타이머 설정</button>
    </div>
  );
}

export default TimerSettings;
