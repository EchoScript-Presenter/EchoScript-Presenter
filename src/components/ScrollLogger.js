import React, { useEffect } from 'react';
import fs from 'fs';

const ScrollLogger = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollData = { time: new Date().toLocaleString() };
      const jsonData = JSON.stringify(scrollData);
      fs.appendFile('scroll_log.json', jsonData + '\n', err => {
        if (err) throw err;
        console.log('스크롤 정보 기록됨');
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollLogger;
