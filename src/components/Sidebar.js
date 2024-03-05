import React from 'react';
import { SidebarContainer, ToggleButton } from './SidebarStyled';
import { FaPencilAlt, FaCheckSquare } from 'react-icons/fa';
import { useSpeech } from './SpeechContext';

function Sidebar({ isPresentationMode, setIsPresentationMode }) {
  const { startRecording, stopRecording } = useSpeech();

  return (
    <SidebarContainer>
      <ToggleButton
        onClick={() => {
          setIsPresentationMode(!isPresentationMode);
          isPresentationMode ? startRecording() : stopRecording();
        }}
      >
        {isPresentationMode ? (
          <FaCheckSquare size="24px" />
        ) : (
          <FaPencilAlt size="24px" />
        )}
      </ToggleButton>
    </SidebarContainer>
  );
}

export default Sidebar;
