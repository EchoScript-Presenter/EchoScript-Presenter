import React, { useState } from 'react';

function TimerSettings({ timer, setTimer }) {
  const [inputTime, setInputTime] = useState(timer);

  const handleTimeChange = (event) => {
    setInputTime(event.target.value);
  };

  const applyTimerSetting = () => {
    setTimer(inputTime);
  };

  return (
    <div>
      <input
        type="number"
        value={inputTime}
        onChange={handleTimeChange}
        placeholder="시간을 설정하세요 (분)"
      />
      <button onClick={applyTimerSetting}>설정</button>
    </div>
  );
}

export default TimerSettings;
