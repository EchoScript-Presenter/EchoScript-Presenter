import styled from 'styled-components';

const boxStyle = {
    border: '1px solid #000',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: '150px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };

export const CBars = styled.div`
  width: auto;
  height: 0.9rem;
  display: flex;
  flex-direction: row; /* 수평 정렬로 변경 */
  justify-content: space-between; /* 간격을 일정하게 유지하며 요소들을 수평으로 배치 */
  align-items: center; 
  gap: 0.6rem; /* 요소 사이의 간격 설정 */
`;


export const CBar_volume = styled.div`
  width: 1.6rem;
  height: 100%;
  background-color: ${(props) => {
    const volume = isNaN(props.volume) ? 0 : props.volume;
    const barsToColor = Math.ceil(volume / 12.5); // volume이 0에서 100 사이라고 가정

    let color = "rgba(128, 128, 128, 0.1)"; // 기본 색상 설정

    if (barsToColor >= 7 && props.no < barsToColor) {
      color = "red"; // 7번째 바까지 (및 그 이상) 모두 빨간색
    } else if (barsToColor === 6 && props.no <= 5) {
      color = "#55d36a"; // 6번째 바까지 모두 #55d36a
    } else if (barsToColor === 5 && props.no <= 4) {
      color = "#4ba85a"; // 오직 5번째 바만 #4ba85a
    } else if (barsToColor === 4 && props.no <= 3) {
      color = "#4ba85a"; // 오직 4번째 바만 #4ba85a
    } else if (barsToColor === 3 && props.no <= 2) {
      color = "#55d36a"; // 3번째 바까지 모두 #55d36a
    } else if (barsToColor <= 2 && props.no < barsToColor) {
      color = "red"; // 1, 2번째 바까지 모두 빨간색
    }

    return color;
  }};
  border-radius: 4rem;
`;


export const CBar_pitch = styled.div`
  width: 1.6rem;
  height: 100%;
  background-color: ${(props) => {
    const pitchColorIndex = props.pitchColorIndex;

    let color = "rgba(128, 128, 128, 0.1)"; // 기본 색상

    if (pitchColorIndex >= 7 && props.no < pitchColorIndex) {
      color = "red"; // 7번째 바까지 (및 그 이상) 모두 빨간색
    } else if (pitchColorIndex === 6 && props.no <= 5) {
      color = "#55d36a"; // 6번째 바까지 모두 #55d36a
    } else if (pitchColorIndex === 5 && props.no <= 4) {
      color = "#4ba85a"; // 오직 5번째 바만 #4ba85a
    } else if (pitchColorIndex === 4 && props.no <= 3) {
      color = "#4ba85a"; // 오직 4번째 바만 #4ba85a
    } else if (pitchColorIndex === 3 && props.no <= 2) {
      color = "#55d36a"; // 3번째 바까지 모두 #55d36a
    } else if (pitchColorIndex <= 2 && props.no < pitchColorIndex) {
      color = "red"; // 1, 2번째 바까지 모두 빨간색
    }

    return color;
  }};
  border-radius: 4rem;
`;


function isNull(v) {
  return (v === undefined || v === null) ? true : false;
}

export const CBar_speed = styled.div`
  width: 1.6rem;
  height: 100%;
  background-color: ${(props) => {
    const speed = props.speed == null ? 0 : props.speed;
    const barsToColor = speed;

    let color = "rgba(128, 128, 128, 0.1)"; // 기본 색상

    // 조건에 맞는 색상 적용
    if (barsToColor >= 7 && props.no < barsToColor) {
      color = "red"; // 7번째 바까지 (및 그 이상) 모두 빨간색
    } else if (barsToColor === 6 && props.no <= 5) {
      color = "#55d36a"; // 6번째 바까지 모두 #55d36a
    } else if (barsToColor === 5 && props.no <= 4) {
      color = "#4ba85a"; // 오직 5번째 바만 #4ba85a
    } else if (barsToColor === 4 && props.no <= 3) {
      color = "#4ba85a"; // 오직 4번째 바만 #4ba85a
    } else if (barsToColor === 3 && props.no <= 2) {
      color = "#55d36a"; // 3번째 바까지 모두 #55d36a
    } else if (barsToColor <= 2 && props.no < barsToColor) {
      color = "red"; // 1, 2번째 바까지 모두 빨간색
    }

    return color;
  }};
  border-radius: 4rem;
  `;
