import React from 'react';
import { SidebarContainer, ToggleButton } from './SidebarStyled';
import { FaPencilAlt, FaCheckSquare } from 'react-icons/fa';
import { RiPresentationFill } from 'react-icons/ri';
import { MdOutlinePausePresentation } from 'react-icons/md';
import { LuMonitorPause } from 'react-icons/lu';
import { PiMonitorPlay } from 'react-icons/pi';
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
          <RiPresentationFill size="24px" />
        ) : (
          <LuMonitorPause size="24px" />
        )}
      </ToggleButton>
    </SidebarContainer>
  );
}

export default Sidebar;
