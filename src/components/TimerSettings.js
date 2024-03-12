import React, { useState, useEffect } from 'react';
import { StyledInput } from './TimerProgressBarStyled';

function TimerSettings({ setTimeLimit }) {
  const [inputTime, setInputTime] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputTime !== '') {
        setTimeLimit(Number(inputTime) * 60);
      }
    }, 500); // 0.5초 후에 상태 업데이트

    return () => clearTimeout(timer);
  }, [inputTime, setTimeLimit]);

  const handleTimeChange = (event) => {
    const { value } = event.target;
    // 입력된 값이 음수일 경우 절대값으로 변경, 빈 문자열인 경우 그대로 빈 문자열을 유지!
    const newTime = value === '' ? '' : Math.abs(Number(value)).toString();
    setInputTime(newTime);
  };

  return (
    <div>
      <StyledInput
        type="number"
        value={inputTime}
        onChange={handleTimeChange}
        placeholder="5 (Minutes)"
      />
    </div>
  );
}

export default TimerSettings;
