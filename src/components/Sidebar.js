import React from 'react';
import { ToggleButton } from './SidebarStyled';

function Sidebar({ isPresentationMode, setIsPresentationMode }) {
  return (
    <div>
      <ToggleButton onClick={() => setIsPresentationMode(!isPresentationMode)}>
        {isPresentationMode ? '편집 완료' : '편집 모드'}
      </ToggleButton>
      {/* 편집 모드에서 발표자 모드 클릭 시 편집 완료 & 바로 시작 */}
    </div>
  );
}

export default Sidebar;
