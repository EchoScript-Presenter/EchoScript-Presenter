import React, { useState, useEffect } from 'react';

function TimerSettings({ setTimeLimit }) {
  const [inputTime, setInputTime] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 타이머 클리어
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setInputTime(newTime);

    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      setTimeLimit(Number(newTime) * 60);
    }, 500); // 0.5초 후에 상태 업데이트

    setTimer(newTimer);
  };

  return (
    <div>
      <input
        type="number"
        value={inputTime}
        onChange={handleTimeChange}
        placeholder="시간을 설정하세요 (분)"
      />
    </div>
  );
}

export default TimerSettings;
