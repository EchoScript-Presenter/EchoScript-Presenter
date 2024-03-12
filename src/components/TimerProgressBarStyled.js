import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  margin: 20px;
  height: 15px;
  width: 85%; // 컨테이너 너비를 100%로 설정
  margin: 30px 10px 10px 10px;
`;

export const ProgressBarFiller = styled.div`
  background-color: #be8be1; 
  height: 100%;
  border-radius: 8px;
  transition: width 0.5s ease-in-out;
  width: 50%; // 진행 상태에 따라 조절
`;

export const StyledInput = styled.input`
  width: 50%;
  padding: 8px;
  margin: 3px 10px 20px 10px; // top 마진을 0으로 조정
  border: 2px solid #be8be1; 
  border-radius: 8px;
  outline: none;
`;

export const StyledText = styled.div`
  width: 50%;
  padding: 8px;
  margin: 0px 10px 20px 10px;
  text-align: center;
`;