import React from 'react';
import {
  SlideContainer,
  HexagonAll,
  Hexagon,
  Title,
  SubTitle,
  TitleCenter,
  Text,
  CenterContainer,
  TextCenter,
} from './SlideAStyled';
import { useNote } from '../NoteContext';

function SlideA({ activeTitle }) {
  const { activeNote } = useNote();
  // console.log('activeTitle', activeTitle);

  const activeSlideIndex = activeNote.slideIndex;

  switch (activeSlideIndex) {
    case 1:
      return (
        <SlideContainer>
          <TitleCenter style={{ top: '45%' }}>
            Design Thinking Process
            <br />
            for User Experience Design
          </TitleCenter>
          <SubTitle style={{ bottom: '25%' }}>
            Ewha Woman’s University
            <br />
            Human-Computer Interaction Lab
          </SubTitle>
        </SlideContainer>
      );
    case 2:
      return (
        <SlideContainer>
          <HexagonAll />
          <Title>Design Thinking Process</Title>
          <Text
            highlight={activeTitle === 'Design Process-1'}
            style={{ top: '36%', left: '19%' }}
          >
            EMPATHIZE
          </Text>
          <Text
            highlight={activeTitle === 'Design Process-1'}
            style={{ bottom: '48%', left: '33%' }}
          >
            DEFINE
          </Text>
          <Text
            highlight={activeTitle === 'Design Process-1'}
            style={{ top: '36%', right: '46%' }}
          >
            IDEATE
          </Text>
          <Text
            highlight={activeTitle === 'Design Process-1'}
            style={{ bottom: '48%', right: '31%' }}
          >
            PROTOTYPE
          </Text>
          <Text
            highlight={activeTitle === 'Design Process-1'}
            style={{ bottom: '36%', right: '22%' }}
          >
            TEST
          </Text>
          <Text
            highlight={activeTitle === 'Design Process-2'}
            style={{ bottom: '10%', right: '45%' }}
          >
            - Iterating within stages & back to prior stages
          </Text>
        </SlideContainer>
      );
    case 3:
      return (
        <SlideContainer>
          <Hexagon image={`images/hexagonBlue.png`} />
          <Title>Design Thinking Process</Title>
          <CenterContainer>
            <TextCenter highlight={activeTitle === 'EMPATHIZE-1'}>
              EMPATHIZE
            </TextCenter>
          </CenterContainer>
          <Text
            highlight={activeTitle === 'EMPATHIZE-2'}
            style={{ top: '28%', left: '7%', fontSize: '22px' }}
          >
            close and intimate
            <br /> familiarity
          </Text>
          <Text
            highlight={activeTitle === 'EMPATHIZE-3'}
            style={{ bottom: '15%', right: '12%', fontSize: '22px' }}
          >
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
          <CenterContainer>
            <TextCenter highlight={activeTitle === 'DEFINE-1'}>
              DEFINE
            </TextCenter>
          </CenterContainer>
          <Text
            highlight={activeTitle === 'DEFINE-2'}
            style={{ top: '28%', left: '7%', fontSize: '22px' }}
          >
            making realizations
          </Text>
          <Text
            highlight={activeTitle === 'DEFINE-3'}
            style={{ bottom: '15%', right: '12%', fontSize: '22px' }}
          >
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
          <CenterContainer>
            <TextCenter highlight={activeTitle === 'IDEATE-1'}>
              IDEATE
            </TextCenter>
          </CenterContainer>
          <Text
            highlight={activeTitle === 'IDEATE-2'}
            style={{ top: '28%', left: '7%', fontSize: '22px' }}
          >
            innovation
            <br />
            potential
          </Text>
          <Text
            highlight={activeTitle === 'IDEATE-3'}
            style={{ bottom: '15%', right: '12%', fontSize: '22px' }}
          >
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
          <CenterContainer>
            <TextCenter highlight={activeTitle === 'PROTOTYPE-1'}>
              PROTOTYPE
            </TextCenter>
          </CenterContainer>
          <Text
            highlight={activeTitle === 'PROTOTYPE-2'}
            style={{ top: '28%', left: '7%', fontSize: '22px' }}
          >
            - to think
            <br />- to learn
            <br />- to test
          </Text>
          <Text
            highlight={activeTitle === 'PROTOTYPE-2'}
            style={{ bottom: '15%', right: '12%', fontSize: '22px' }}
          >
            failing then fixing
          </Text>
        </SlideContainer>
      );
    case 7:
      return (
        <SlideContainer>
          <Hexagon image={`images/hexagonBrick.png`} />
          <Title>Design Thinking Process</Title>
          <CenterContainer>
            <TextCenter highlight={activeTitle === 'TEST-1'}>TEST</TextCenter>
          </CenterContainer>
          <Text
            highlight={activeTitle === 'TEST-2'}
            style={{ top: '28%', left: '7%', fontSize: '22px' }}
          >
            new information
            <br />
            about the
            <br />
            user's need
          </Text>
          <Text
            highlight={activeTitle === 'TEST-3'}
            style={{ bottom: '15%', right: '12%', fontSize: '22px' }}
          >
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
