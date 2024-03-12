import React, { useState, useEffect } from 'react';
import TimerSettings from './TimerSettings';
import TimerProgressBar from './TimerProgressBar';
import { TimerContainer, Logo } from './HeaderStyled';
import { StyledText } from './TimerProgressBarStyled';

function Header({ isPresentationMode }) {
  const [timeLimit, setTimeLimit] = useState(5 * 60); //5분이 기본값
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
    <>
      <Logo image={`images/logo3.png`} />
      <TimerContainer>
        <TimerProgressBar maxTime={timeLimit} remainTime={remainTime} />
        {!isPresentationMode && (
          <StyledText>
            {formatTime(remainTime)} / {formatTime(timeLimit)}
          </StyledText>
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
    </>
  );
}

export default Header;
