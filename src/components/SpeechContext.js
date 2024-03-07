import React, { createContext, useState, useContext, useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import axios from 'axios';

const SpeechContext = createContext();

export const useSpeech = () => useContext(SpeechContext);

export const SpeechProvider = ({ children }) => {
  const [speechResults, setSpeechResults] = useState([]);
  const [words, setWords] = useState([]);
  const [interimWords, setInterimWords] = useState([]);

  const { error, startSpeechToText, stopSpeechToText, results, interimResult } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
      speechRecognitionProperties: { lang: 'en-US', interimResults: true },
    });

  // startRecording, stopRecording 로직
  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // 마이크 사용 권한이 승인되었을 때 로직
        console.log('마이크 접근 권한 승인됨');

        // 음성 인식 시작 로직
        axios
          .post('http://localhost:8000/start_recording')
          .then((response) => {
            console.log(response.data);
            startSpeechToText();
            // 음성 인식 시작 시 결과 초기화
            setSpeechResults([]);
            console.log('interimResult', interimResult);
          })
          .catch((error) => {
            console.error('Error starting recording:', error);
          });
      })
      .catch((err) => {
        // 마이크 접근 권한이 거부되었거나 다른 오류 발생
        console.error('Microphone Access Denied or Error:', err);
      });
  };

  const stopRecording = () => {
    axios
      .post('http://localhost:8000/stop_recording')
      .then((response) => {
        console.log(response.data);
        stopSpeechToText();
        // 로컬스토리지에 현재 words 저장
        localStorage.setItem('savedWords', JSON.stringify(words));
        // 음성 인식 중지 시 결과 비우기
        setSpeechResults([]);
        setWords([]); // 이제 words 상태를 비웁니다.
      })
      .catch((error) => {
        console.error('Error stopping recording:', error);
      });
  };

  // 음성 인식 결과가 변경될 때마다 결과 업데이트
  useEffect(() => {
    if (results.length > 0) {
      setSpeechResults(results.map((result) => result.transcript));
    }
  }, [results]);

  // console.log('speechResults', speechResults);

  // 음성 인식 결과가 업데이트될 때마다 단어별로 분할하여 상태 업데이트
  useEffect(() => {
    const newWords = speechResults
      .flatMap((result) => result.split(' '))
      .filter((word) => word.trim().length > 0);
    setWords(newWords);
  }, [speechResults]);

  useEffect(() => {
    if (interimResult) {
      const interimWords = interimResult
        .split(' ')
        .filter((word) => word.trim().length > 0);
      // interimWords를 사용하여 실시간으로 단어를 처리하거나 하이라이트하는 로직 구현
    }
  }, [interimResult]);

  return (
    <SpeechContext.Provider
      value={{
        interimResult,
        speechResults,
        words,
        startRecording,
        stopRecording,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};
