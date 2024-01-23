import styled from 'styled-components';

export const SidebarContainer = styled.div`
  display: flex;
  width: 5%;
  min-width: 0; // 내부 컨텐츠에 의한 확장 방지
  background: yellow;
`;

export const ToggleButton = styled.button`
  padding: 10px;
  margin: 5px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
