import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw; // 전체 뷰포트 너비를 차지하도록 설정
`;

export const HeaderContainer = styled.header`
  display: flex;
  height: 10vh;
  width: 100%;
  margin-bottom: 5px;
  max-height: 90px; // 최대 높이 제한 (선택 사항)
  justify-content: space-between; // 자식 요소들을 중앙 정렬
  align-items: center; // 수직 방향 중앙 정렬
  // background: pink;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-grow: 1; // 남은 공간을 모두 차지하도록 설정
  width: 100vw; // 부모 컨테이너의 너비에 맞춰 설정
  height: 100%;
`;

// BodyContainer 내부의 컬럼을 위한 스타일
export const BodyColumnContainer1 = styled.div`
  display: flex;
  flex-direction: column; // 컴포넌트를 세로로 나열
  width: 70%; // 전체 너비의 70%
`;

export const BodyColumnContainer2 = styled.div`
  display: flex;
  flex-direction: column; // 컴포넌트를 세로로 나열
  width: 30%; // 전체 너비의 30%
`;
