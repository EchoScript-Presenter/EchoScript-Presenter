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
  width: 100%;
  height: 100%;
`;

export const HexagonAll = styled.div`
  background: url('images/hexagonAll.png') center/contain no-repeat;
  width: 700px;
  height: 300px;
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

export const SubTitle = styled.span`
  position: absolute;
  font-size: 20px;
  color: #ffffff; // 기본 텍스트 색상 설정
  text-align: center;
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
  font-size: 20px;
  // 하이라이트 동적 요소
  background-color: ${(props) => (props.highlight ? 'yellow' : 'transparent')};
  color: ${(props) => (props.highlight ? 'black' : '#ffffff')};
`;

export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TextCenter = styled.span`
  position: absolute;
  font-size: 20px;
  color: #ffffff; // 기본 텍스트 색상 설정
  text-align: center;
  background-color: ${(props) => (props.highlight ? 'yellow' : 'transparent')};
  color: ${(props) => (props.highlight ? 'black' : '#ffffff')};
  /* Hexagon 이미지 위에 위치시키기 위한 top, left, right, bottom 값 조정 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
`;
