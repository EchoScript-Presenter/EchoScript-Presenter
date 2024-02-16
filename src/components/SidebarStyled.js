import styled from 'styled-components';

export const SidebarContainer = styled.div`
  display: flex;
  width: 5%;
  min-width: 0; // 내부 컨텐츠에 의한 확장 방지
  background: yellow;
`;

export const ToggleButton = styled.button`
  padding: 10px;
  padding: 5px; /* 상하 패딩을 줄여 세로 길이 감소 */
  margin: 5px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px; /* 버튼의 높이를 직접 지정 */
  &:hover {
    background-color: #e0e0e0;
  }
`;
