import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  margin: 10px;
  height: 20px;
`;

export const ProgressBarFiller = styled.div`
  background-color: #4caf50;
  height: 100%;
  border-radius: 8px;
  transition: width 0.5s ease-in-out;
`;
