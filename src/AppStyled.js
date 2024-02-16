import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const HeaderContainer = styled.header`
  display: flex;
  flex-grow: 1; // 비율 1
  max-height: 90px; // 최대 높이 제한 (선택 사항)
  justify-content: center; // 자식 요소들을 중앙 정렬
  align-items: center; // 수직 방향 중앙 정렬
  background: pink;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-grow: 3; // 비율 4
  background: greenyellow;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-grow: 1.5; // 비율 2
  background: papayawhip;
`;
