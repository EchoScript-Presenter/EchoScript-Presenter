import React, { createContext, useState, useContext, useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import axios from 'axios';

const SpeechContext = createContext();

export const useSpeech = () => useContext(SpeechContext);

export const SpeechProvider = ({ children }) => {
  const [speechResults, setSpeechResults] = useState([]);
  const [words, setWords] = useState([]);
  const [interimWords, setInterimWords] = useState([]);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.error("Browser doesn't support speech recognition.");
  }

  const startRecording = async () => {
    if (isMicrophoneAvailable) {
      try {
        const response = await axios.post(
          'http://localhost:8000/start_recording'
        );
        console.log("Response Data:",response.data);

        SpeechRecognition.startListening({
          continuous: true,
          language: 'en-US',
        });
        resetTranscript(); // 시작할 때 리셋
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    } else {
      console.error('Microphone is not available.');
    }
  };

  const stopRecording = async () => {
    try {
      await SpeechRecognition.stopListening();
      const response = await axios.post('http://localhost:8000/stop_recording');
      console.log(response.data);

      localStorage.setItem('savedWords', JSON.stringify(words));
      resetTranscript(); // 종료 시 리셋
      setWords([]); // 단어 비우기
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  useEffect(() => {
    setWords(
      finalTranscript.split(' ').filter((word) => word.trim().length > 0)
    );
  }, [finalTranscript]);

  useEffect(() => {
    // interimTranscript 변화 시 변경
  }, [interimTranscript]);

  return (
    <SpeechContext.Provider
      value={{
        transcript,
        interimTranscript,
        finalTranscript,
        words,
        listening,
        startRecording,
        stopRecording,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};