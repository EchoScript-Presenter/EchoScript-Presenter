import React from 'react';
import { SidebarContainer, ToggleButton } from './SidebarStyled';
import { FaPencilAlt, FaCheckSquare } from 'react-icons/fa';

function Sidebar({ isPresentationMode, setIsPresentationMode }) {
  return (
    <SidebarContainer>
      <ToggleButton onClick={() => setIsPresentationMode(!isPresentationMode)}>
        {isPresentationMode ? (
          <FaCheckSquare size="24px" />
        ) : (
          <FaPencilAlt size="24px" />
        )}
      </ToggleButton>
      {/* 편집 모드에서 발표자 모드 클릭 시 편집 완료 & 바로 시작 */}
    </SidebarContainer>
  );
}

export default Sidebar;
