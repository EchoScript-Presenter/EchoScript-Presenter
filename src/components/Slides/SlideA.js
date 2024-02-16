import React from 'react';
import {
  SlideContainer,
  HexagonAll,
  Hexagon,
  Title,
  TitleCenter,
  Text,
  TextCenter,
} from './SlideAStyled';

function SlideA({ slideNumber, onHighlight, highlightedContent }) {
  // Slide 컴포넌트의 로직과 렌더링

  return (
    <SlideContainer>
      <Hexagon image={`images/hexagonOrange.png`} />
      <Title>Design Thinking Process</Title>
      <TextCenter style={{ bottom: '48%' }}>IDEATE</TextCenter>
      <Text style={{ top: '28%', left: '14%', fontSize: '22px' }}>
        innovation
        <br />
        potential
      </Text>
      <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
        separate
        <br />
        generation &<br />
        evaluation
      </Text>
      <Text style={{ bottom: '15%', left: '11%', fontSize: '22px' }}>
        find solutions
        <br />
        - brainstorming
        <br />- prototyping
      </Text>
    </SlideContainer>
  );
}

export default SlideA;

/*slideNumber 제공 시 적용 */
// // slideNumber에 따라 다른 스타일 컴포넌트를 렌더링
// switch (slideNumber) {
//   case 1:
//     return (
{
  /* <SlideContainer>
      <TitleCenter>
      Design Thinking Process
      <br />
      for User Experience Design
    </TitleCenter style={{ top: '45%' }}>
    <TextCenter style={{ bottom: '25%' }}>
      Ewha Woman’s University
      <br />
      Human-Computer Interaction Lab
    </TextCenter>
  </SlideContainer> */
}
//     );
//   case 2:
//     return (
//   <SlideContainer>
//   <HexagonAll />
//   {/* 하이라이트 적용 예시 */}
//   {/* <Text highlight={onHighlight && highlightedContent === 'EMPATHIZE'} style={{ top: '10%', left: '50%' }}>
// EMPATHIZE
// </Text> */}
//   <Title>Design Thinking Process</Title>
//   <Text style={{ top: '37%', left: '13%' }}>EMPATHIZE</Text>
//   <Text style={{ bottom: '48%', left: '30%' }}>DEFINE</Text>
//   <Text style={{ top: '37%', right: '45%' }}>IDEATE</Text>
//   <Text style={{ bottom: '48%', right: '27%' }}>PROTOTYPE</Text>
//   <Text style={{ bottom: '36%', right: '17%' }}>TEST</Text>
//   <Text style={{ bottom: '10%', right: '45%' }}>
//     - Iterating within stages & back to prior stages
//   </Text>
// </SlideContainer>
//     );
//   case 3:
//     return (
// <SlideContainer>
//     <Hexagon image={`images/hexagonBlue.png`} />
//     <Title>Design Thinking Process</Title>
//     <TextCenter style={{ bottom: '48%' }}>EMPATHIZE</TextCenter>
//     <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
//       close and intimate
//       <br /> familiarity
//     </Text>
//     <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
//       key principles <br />
//       - immerse <br />
//       - observe <br />
//       - engage
//       <br />
//     </Text>
//   </SlideContainer>
//   )
// case 4:
// return (
// <SlideContainer>
//     <Hexagon image={`images/hexagonGreen.png`} />
//     <Title>Design Thinking Process</Title>
//     <TextCenter style={{ bottom: '48%' }}>DEFINE</TextCenter>
//     <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
//       making realizations
//     </Text>
//     <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
//      creating<br/>a focus
//     </Text>
//   </SlideContainer>
// case5:
// return(
// <SlideContainer>
//     <Hexagon image={`images/hexagonOrange.png`} />
//     <Title>Design Thinking Process</Title>
//     <TextCenter style={{ bottom: '48%' }}>IDEATE</TextCenter>
//     <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
//       innovation<br/>potential
//     </Text>
//     <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
//      separate<br/>generation &<br/>evaluation
//     </Text>
//   </SlideContainer>
//)
// case6:
// return(
// <SlideContainer>
//     <Hexagon image={`images/hexagonRed.png`} />
//     <Title>Design Thinking Process</Title>
//     <TextCenter style={{ bottom: '48%' }}>PROTOTYPE</TextCenter>
//     <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
//       - to think<br/>- to learn<br/>- to test
//     </Text>
//     <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
//      failing then fixing
//     </Text>
//   </SlideContainer>
//)
//case7:
// return(
// <SlideContainer>
//     <Hexagon image={`images/hexagonBrick.png`} />
//     <Title>Design Thinking Process</Title>
//     <TextCenter style={{ bottom: '48%' }}>TEST</TextCenter>
//     <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
//       new information<br/>about the<br/>user's need
//     </Text>
//     <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
//      right assumption,<br/>correct solution
//     </Text>
//   </SlideContainer>
//)
//case8:
// return(
{
  /* <SlideContainer>
        <TitleCenter  style={{ top: '45%' }}>
      Thank you :)
      </TitleCenter>
    </SlideContainer> */
}
//)
//   default:
//     return <div>Invalid slide number</div>;
// }
