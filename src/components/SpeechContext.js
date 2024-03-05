import React, { createContext, useState, useContext } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import axios from 'axios';

const SpeechContext = createContext();

export const useSpeech = () => useContext(SpeechContext);

export const SpeechProvider = ({ children }) => {
  const [interimResult, setInterimResult] = useState('');
  console.log(interimResult);
  const { error, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // startRecording, stopRecording 로직
  const startRecording = () => {
    axios
      .post('http://localhost:8000/start_recording')
      .then((response) => {
        console.log(response.data);
        startSpeechToText();
        console.log(interimResult);
      })
      .catch((error) => {
        console.error('Error starting recording:', error);
      });
  };

  const stopRecording = () => {
    axios
      .post('http://localhost:8000/stop_recording')
      .then((response) => {
        console.log(response.data);
        stopSpeechToText();
      })
      .catch((error) => {
        console.error('Error stopping recording:', error);
      });
  };

  return (
    <SpeechContext.Provider
      value={{ interimResult, setInterimResult, startRecording, stopRecording }}
    >
      {children}
    </SpeechContext.Provider>
  );
};
