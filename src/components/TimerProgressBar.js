import React from 'react';
import {
  ProgressBarContainer,
  ProgressBarFiller,
} from './TimerProgressBarStyled';

function TimerProgressBar({ maxTime, remainTime }) {
  // 남은 시간을 비율로 계산
  const progress = (remainTime / maxTime) * 100;

  return (
    <ProgressBarContainer>
      <ProgressBarFiller style={{ width: `${progress}%` }} />
    </ProgressBarContainer>
  );
}

export default TimerProgressBar;
