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

function SlideA({ currentSlideIndex, onHighlight, highlightedContent }) {
  switch (currentSlideIndex) {
    case 1:
      return (
        <SlideContainer>
          <TitleCenter style={{ top: '45%' }}>
            Design Thinking Process
            <br />
            for User Experience Design
          </TitleCenter>
          <TextCenter style={{ bottom: '25%' }}>
            Ewha Woman’s University
            <br />
            Human-Computer Interaction Lab
          </TextCenter>
        </SlideContainer>
      );
    case 2:
      return (
        <SlideContainer>
          <HexagonAll />
          <Title>Design Thinking Process</Title>
          <Text style={{ top: '36%', left: '20%' }}>EMPATHIZE</Text>
          <Text style={{ bottom: '48%', left: '34%' }}>DEFINE</Text>
          <Text style={{ top: '36%', right: '47%' }}>IDEATE</Text>
          <Text style={{ bottom: '48%', right: '31%' }}>PROTOTYPE</Text>
          <Text style={{ bottom: '36%', right: '22%' }}>TEST</Text>
          <Text style={{ bottom: '10%', right: '45%' }}>
            - Iterating within stages & back to prior stages
          </Text>
        </SlideContainer>
      );
    case 3:
      return (
        <SlideContainer>
          <Hexagon image={`images/hexagonBlue.png`} />
          <Title>Design Thinking Process</Title>
          <TextCenter style={{ bottom: '48%' }}>EMPATHIZE</TextCenter>
          <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
            close and intimate
            <br /> familiarity
          </Text>
          <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
            key principles <br />
            - immerse <br />
            - observe <br />
            - engage
            <br />
          </Text>
        </SlideContainer>
      );
    case 4:
      return (
        <SlideContainer>
          <Hexagon image={`images/hexagonGreen.png`} />
          <Title>Design Thinking Process</Title>
          <TextCenter style={{ bottom: '48%' }}>DEFINE</TextCenter>
          <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
            making realizations
          </Text>
          <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
            creating
            <br />a focus
          </Text>
        </SlideContainer>
      );
    case 5:
      return (
        <SlideContainer>
          <Hexagon image={`images/hexagonOrange.png`} />
          <Title>Design Thinking Process</Title>
          <TextCenter style={{ bottom: '48%' }}>IDEATE</TextCenter>
          <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
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
        </SlideContainer>
      );
    case 6:
      return (
        <SlideContainer>
          <Hexagon image={`images/hexagonRed.png`} />
          <Title>Design Thinking Process</Title>
          <TextCenter style={{ bottom: '48%' }}>PROTOTYPE</TextCenter>
          <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
            - to think
            <br />- to learn
            <br />- to test
          </Text>
          <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
            failing then fixing
          </Text>
        </SlideContainer>
      );
    case 7:
      return (
        <SlideContainer>
          <Hexagon image={`images/hexagonBrick.png`} />
          <Title>Design Thinking Process</Title>
          <TextCenter style={{ bottom: '48%' }}>TEST</TextCenter>
          <Text style={{ top: '28%', left: '7%', fontSize: '22px' }}>
            new information
            <br />
            about the
            <br />
            user's need
          </Text>
          <Text style={{ bottom: '15%', right: '12%', fontSize: '22px' }}>
            right assumption,
            <br />
            correct solution
          </Text>
        </SlideContainer>
      );
    case 8:
      return (
        <SlideContainer>
          <TitleCenter style={{ top: '45%' }}>Thank you :)</TitleCenter>
        </SlideContainer>
      );
    default:
      return <div>Invalid slide number</div>;
  }
}

export default SlideA;
