import React, { useEffect } from 'react';
import axios from 'axios';

const ScrollLogger = () => {
  useEffect(() => {
    let timer;

    // 휠 한 번만 굴려도 20개씩 찍히길래 중복 동작 중 마지막에만 로그 찍히도록 했습니다
    // 0.5초 동안 동일 이벤트가 발생하지 않으면 다시 실행합니다
    const debounceInterval = 500; 

    const handleScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const scrollData = { time: new Date().toLocaleString() };
        axios.post('/api/scroll-event', scrollData)
          .then(response => {
            console.log(response.data.message);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, debounceInterval);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollLogger;