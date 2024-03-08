import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const HeaderContainer = styled.header`
  display: flex;
  height: 10vh;
  width: 100%;
  max-height: 90px; // 최대 높이 제한 (선택 사항)
  justify-content: space-between; // 자식 요소들을 중앙 정렬
  align-items: center; // 수직 방향 중앙 정렬
`;

export const BodyContainer = styled.div`
  display: flex;
  height: 65vh;
`;

export const FooterContainer = styled.div`
  display: flex;
  height: 25vh;
`;
