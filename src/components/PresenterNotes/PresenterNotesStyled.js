import styled from 'styled-components';

export const Content = styled.div``;

export const HighlightedText = styled.span`
  color: gray;
`;

export const GrayText = styled.span`
  background-color: yellow;
`;

export const ScriptTitle = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 7px;
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 0px;
`;

export const FontSizeButton = styled.button`
  font-size: 16px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: #be8be1;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #6a5acd;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  overflow-y: auto;
  margin-top: 0px;
  border: #eaeaea solid 2px;
`;

export const PresenterNotesContainer = styled.div`
  padding: 20px;
  margin: 10px auto;
  width: 300px;
  max-height: 260px;
  overflow-y: auto;
  background-color: #ffffff; /* 메모장 배경색 */
  border-top: 10px solid #e8d9ff; /* 테이프 또는 클립 색상 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  word-wrap: break-word;
  font-weight: normal;
  line-height: 1.5;
  position: relative;
`;

export const Title = styled.div`
  margin-top: -5px;
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 20px;
`;

export const Word = styled.span`
  margin-right: 5px;
  color: ${(props) => {
    if (props.highlighted) return 'black';
    if (props.previous) return 'gray';
    return 'black';
  }};
  background-color: ${(props) => (props.highlighted ? '#ff0' : 'transparent')};
  display: inline-block;

  &.highlighted {
    background-color: #ff0;
  }
`;

export const BottomRightText = styled.h3`
  position: absolute;
  top: 0;
  right: 15px;
  font-size: 16px;
  font-weight: normal;
  color: black;
  padding: 4px 6px; /* 내부 여백 추가 */
  background-color: #f8f9fa; /* 배경색 지정 */
  border: 1px solid #ced4da; /* 테두리 추가 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  border: #eaeaea solid 2px;
`;
