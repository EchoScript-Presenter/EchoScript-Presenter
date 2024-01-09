import React, { useState, useEffect } from 'react';
import TimerSettings from './TimerSettings';
import TimerProgressBar from './TimerProgressBar';

function Header({ isEditMode }) {
  const [timeLimit, setTimeLimit] = useState(10 * 60); //10분이 기본값
  const [remainTime, setRemainTime] = useState(timeLimit);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  useEffect(() => {
    let interval;
    if (!isEditMode && remainTime > 0) {
      interval = setInterval(() => {
        setRemainTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isEditMode, remainTime]);

  return (
    <div>
      <TimerProgressBar maxTime={timeLimit} remainTime={remainTime} />
      {!isEditMode && (
        <div>
          {formatTime(remainTime)} / {formatTime(timeLimit)}
        </div>
      )}
      {isEditMode && (
        <TimerSettings
          setTimeLimit={(newTime) => {
            setTimeLimit(newTime);
            setRemainTime(newTime); // 시간 설정 시 remainTime도 업데이트
          }}
        />
      )}
    </div>
  );
}

export default Header;
