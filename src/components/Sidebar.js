import React from 'react';
import { SidebarContainer, ToggleButton } from './SidebarStyled';
import { FaPencilAlt, FaCheckSquare } from 'react-icons/fa';
import axios from 'axios';
import useSpeechToText from 'react-hook-speech-to-text';
import PresenterNotes from './PresenterNotes/PresenterNotes';

function Sidebar({ isPresentationMode, setIsPresentationMode }) {
  
    const {
        error,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const startRecording = () => {
        axios.post('http://localhost:8000/start_recording')
            .then(response => {
                console.log(response.data);
                startSpeechToText();
                console.log(interimResult);
            })
            .catch(error => {
                console.error('Error starting recording:', error);
            });
    };

    const stopRecording = () => {
        axios.post('http://localhost:8000/stop_recording')
            .then(response => {
                console.log(response.data);
                stopSpeechToText();
            })
            .catch(error => {
                console.error('Error stopping recording:', error);
            });
    };

    const { results, interimResult } = useSpeechToText({
      speechRecognitionProperties: {
        lang: 'en-US',
        interimResults: true 
      }
    });

    if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <SidebarContainer>
      <ToggleButton onClick={() => { setIsPresentationMode(!isPresentationMode); isPresentationMode ? startRecording() : stopRecording(); }}>
        {isPresentationMode ? (
          <FaCheckSquare size="24px" />
        ) : (
          <FaPencilAlt size="24px" />
        )}
      </ToggleButton>
      {/* 편집 모드에서 발표자 모드 클릭 시 편집 완료 & 바로 시작 */}
      <PresenterNotes interimResult={interimResult} />
    </SidebarContainer>
  );
}

export default Sidebar;
