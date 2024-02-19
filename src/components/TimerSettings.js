import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 90%;
  padding: 8px;
  margin: 0px 10px 20px 10px; // top 마진을 0으로 조정
  border: 2px solid #4caf50;
  border-radius: 8px;
  outline: none;
  }
`;

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
        placeholder="시간을 설정하세요 (분)"
      />
    </div>
  );
}

export default TimerSettings;
