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
  flex-direction: row-reverse; /* 수평 정렬로 변경 */
  justify-content: space-between; /* 간격을 일정하게 유지하며 요소들을 수평으로 배치 */
  align-items: center; 
  gap: 0.6rem; /* 요소 사이의 간격 설정 */
`;

export const CBar = styled.div`
  width: 1.6rem;
  height: 100%;
  background-color: ${(props) => {
    // Check if values are NaN and set them to a default value if they are
    const volume = isNaN(props.volume) ? 1 : props.volume;
    const pitch = isNaN(props.pitch) ? 1 : props.pitch;
    const speed = isNaN(props.speed) ? 1 : props.speed;

    // Determine the background color based on the highest priority condition met
    if (volume / 8 > 7 - props.no) return "#E3C4FF";
    if (pitch / 8 > 7 - props.no) return "#E3C4FF";
    if (speed / 8 > 7 - props.no) return "#E3C4FF";
    return "rgba(128, 128, 128, 0.1)"; // Default color if no conditions are met
  }};
  border-radius: 4rem;
`;
