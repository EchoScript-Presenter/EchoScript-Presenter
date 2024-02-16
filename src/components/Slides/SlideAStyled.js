import styled, { css } from 'styled-components';

// export const Slide = styled.div`
//   width: 70%;
//   height: 100%;
//   background: gray;
// `;

export const commonStyles = css`
  color: #ffffff;
  font-family: 'Arial', sans-serif;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const SlideContainer = styled.div`
  ${commonStyles}
  background-color: #1a1a1a;
  width: 70%;
  height: 100%;
`;

export const HexagonAll = styled.div`
  background: url('images/hexagonAll.png') center/contain no-repeat;
  width: 660px;
  height: 230px;
`;

export const Hexagon = styled.div`
  background: url(${(props) => props.image}) center/contain no-repeat;
  width: 200px;
  height: 210px;
`;

export const Title = styled.span`
  position: absolute;
  font-size: 32px;
  color: #e87a40;
  top: 5%;
  left: 5%;
  // 하이라이트 동적 요소
  /* background-color: ${(props) =>
    props.highlight ? 'yellow' : 'transparent'};
  color: ${(props) => (props.highlight ? 'black' : '#ffffff')}; */
`;

export const TitleCenter = styled.span`
  position: absolute;
  font-size: 32px;
  color: #e87a40;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // 정 중앙 배치
  display: block;
  width: 100%;
  line-height: 1.2;
  // 하이라이트 동적 요소
  /* background-color: ${(props) =>
    props.highlight ? 'yellow' : 'transparent'};
  color: ${(props) => (props.highlight ? 'black' : '#ffffff')}; */
`;

export const Text = styled.span`
  position: absolute;
  font-size: 18px;
  // 하이라이트 동적 요소
  /* background-color: ${(props) =>
    props.highlight ? 'yellow' : 'transparent'};
  color: ${(props) => (props.highlight ? 'black' : '#ffffff')}; */
`;

export const TextCenter = styled.span`
  position: absolute;
  font-size: 20px;
  color: #ffffff; // 기본 텍스트 색상 설정
  width: 100%; // 가로 전체 사용
  text-align: center; // 텍스트 중앙 정렬
`;
