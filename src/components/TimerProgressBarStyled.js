import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  margin: 10px;
  height: 20px;
  width: 100%; // 컨테이너 너비를 100%로 설정
`;

export const ProgressBarFiller = styled.div`
  background-color: #4caf50;
  height: 100%;
  border-radius: 8px;
  transition: width 0.5s ease-in-out;
  width: 50%; // 진행 상태에 따라 조절
`;
