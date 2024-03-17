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

    let color = "rgba(128, 128, 128, 0.1)"; // 기본 색상
    if (barsToColor === 2 && (props.no === 0 || props.no === 1)) {
      color = "red"; // 1, 2번째 바만 빨간색
    } else if (barsToColor >= 3 && barsToColor <= 6 && props.no < barsToColor) {
      color = "green"; // 3~6개 바가 채워지면 전부 보라색
    } else if (barsToColor >= 7 && props.no < barsToColor) {
      color = "red"; // 7개 이상 바가 채워지면 전부 빨간색
    }
    return color;
  }};
  border-radius: 4rem;
`;

export const CBar_pitch = styled.div`
  width: 1.6rem;
  height: 100%;
  background-color: ${(props) => {
    const pitchColorIndex = props.pitchColorIndex ;

    // 전체 바에 대한 색상 결정 로직
    let color = "rgba(128, 128, 128, 0.1)"; // 기본 색상
    if (pitchColorIndex === 2 && (props.no === 0 || props.no === 1)) {
      color = "red"; // 1, 2번째 바만 빨간색
    } else if (pitchColorIndex >= 3 && pitchColorIndex <= 6 && props.no < pitchColorIndex) {
      color = "green"; // 3~6개 바가 채워지면 전부 보라색
    } else if (pitchColorIndex >= 7 && props.no < pitchColorIndex) {
      color = "red"; // 7개 이상 바가 채워지면 전부 빨간색
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
    const speed = isNull(props.speed) ? 0 : props.speed; 
    const barsToColor = speed;

    // 전체 바에 대한 색상 결정 로직
    let color = "rgba(128, 128, 128, 0.1)"; // 기본 색상
    if (barsToColor === 2 && (props.no === 0 || props.no === 1)) {
      color = "red"; // 1, 2번째 바만 빨간색
    } else if (barsToColor >= 3 && barsToColor <= 6 && props.no < barsToColor) {
      color = "green"; // 3~6개 바가 채워지면 전부 보라색
    } else if (barsToColor >= 7 && props.no < barsToColor) {
      color = "red"; // 7개 이상 바가 채워지면 전부 빨간색
    }
    return color;
  }};
  border-radius: 4rem;
`;
