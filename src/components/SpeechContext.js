import React, { createContext, useState, useContext } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import axios from 'axios';

const SpeechContext = createContext();

export const useSpeech = () => useContext(SpeechContext);

export const SpeechProvider = ({ children }) => {
  const [speechResults, setSpeechResults] = useState([]);

  const { error, startSpeechToText, stopSpeechToText, results, interimResult } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
      speechRecognitionProperties: { lang: 'en-US', interimResults: true },
    });

  // 음성 인식 결과 업데이트 로직
  const updateSpeechResults = () => {
    // `results`를 사용, 음성 인식 결과 업데이트
    setSpeechResults(results.map((result) => result.transcript));
  };

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
            console.log('SpeechContext', interimResult);
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
        // 음성 인식 중지 시 결과 업데이트
        updateSpeechResults();
      })
      .catch((error) => {
        console.error('Error stopping recording:', error);
      });
  };

  // 음성 인식 결과가 변경될 때마다 결과 업데이트
  React.useEffect(() => {
    updateSpeechResults();
  }, [results]);

  return (
    <SpeechContext.Provider
      value={{ interimResult, startRecording, stopRecording }}
    >
      {children}
    </SpeechContext.Provider>
  );
};
