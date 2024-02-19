import React, { useState, useEffect } from 'react';
import TimerSettings from './TimerSettings';
import TimerProgressBar from './TimerProgressBar';
import { TimerContainer } from './HeaderStyled';

function Header({ isPresentationMode }) {
  const [timeLimit, setTimeLimit] = useState(10 * 60); //10분이 기본값
  const [remainTime, setRemainTime] = useState(timeLimit);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  useEffect(() => {
    let interval;
    if (!isPresentationMode && remainTime > 0) {
      interval = setInterval(() => {
        setRemainTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPresentationMode, remainTime]);

  return (
    <TimerContainer>
      <TimerProgressBar maxTime={timeLimit} remainTime={remainTime} />
      {!isPresentationMode && (
        <div>
          {formatTime(remainTime)} / {formatTime(timeLimit)}
        </div>
      )}
      {isPresentationMode && (
        <TimerSettings
          setTimeLimit={(newTime) => {
            setTimeLimit(newTime);
            setRemainTime(newTime); // 시간 설정 시 remainTime도 업데이트
          }}
        />
      )}
    </TimerContainer>

    
  );
}

export default Header;
