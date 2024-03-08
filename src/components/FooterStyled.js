import styled from 'styled-components';

export const FooterCarouselContainer = styled.div`
  width: 70%;
<<<<<<< HEAD
  //background: whitesmoke;
=======
  // background: whitesmoke;
>>>>>>> f5801d19ef11b531ecf4d877a00fbac5d44a61b9
`;

export const FeedbackGraphContainer = styled.div`
  width: 30%;
<<<<<<< HEAD
  background: #B98AF2;
=======
  // background: palevioletred;
>>>>>>> f5801d19ef11b531ecf4d877a00fbac5d44a61b9
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
