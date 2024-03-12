import styled from 'styled-components';

export const PresenterNoteContainer = styled.div`
  height: 70%;
  //background: whitesmoke;
`;

export const FeedbackGraphContainer = styled.div`
  height: 30%;
  // background: palevioletred;
`;

export const SlideIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px; // 상단 Carousel과의 간격
`;

export const SlideIndicatorInput = styled.input`
  width: 30px; // 입력란 크기 조절
  text-align: center;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const TotalSlides = styled.span`
  margin-left: 10px; // 입력란과 전체 슬라이드 번호 사이의 간격
`;
