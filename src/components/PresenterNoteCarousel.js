import React, { useState, useEffect, useMemo } from 'react';
import ItemsCarousel from 'react-items-carousel';
import PresenterNotes from './PresenterNotes/PresenterNotes';

function PresenterNotesCarousel({
  currentSlideIndex,
  isPresentationMode,
  setActiveTitle,
}) {
  // 배열로 대본 노트 정보 (ppt 슬라이드 인덱스, 타이틀, 내용 저장)

  const carouselItems = useMemo(
    () => [
      {
        slideIndex: 1,
        noteindex: '1/1',
        title: 'Greetings',
        content:
          'Good morning everyone . Today I want to explore the concept of The Design Thinking Process in User Experience Design .',
      },
      {
        slideIndex: 2,
        noteindex: '1/3',
        title: 'Design Process-1',
        content:
          'The Design Thinking Process is a flexible and dynamic problem-solving approach that emphasizes creativity and innovation . It revolves around understanding and addressing user needs through a series of structured steps . While there are several versions of the process I will outline the fundamental stages .'},
      {
        slideIndex: 2,
        noteindex: '2/3',
        title: 'Design Process-2',
        content:
          'At its core the Design Thinking Process begins with empathizing with users to gain insights into their experiences . This is followed by clearly defining the problem based on the information gathered . The process moves into the ideation phase where diverse ideas are generated to tackle the identified problem . Subsequently prototypes develop based on the most promising ideas .'
      },
      {
        slideIndex: 2,
        noteindex: '3/3',
        title: '2-3',
        content:
          'The final stage involves testing these prototypes with real users to gather feedback and iterate on the designs . The Design Thinking Process is not strictly linear . Instead it is iterative and adaptable . Depending on the context and requirements the stages may be revisited or iterated forward and backward as necessary .',
      },

      {
        slideIndex: 3,
        noteindex: '1/3',
        title: 'EMPATHIZE-1',
        content:
          'The first stage is the Empathize stage . This stage serves to get close and familiar with our target users .',
      },
      {
        slideIndex: 3,
        noteindex: '2/3',
        title: 'EMPATHIZE-2',
        content:
          'During this phase our focus is on understanding and empathizing with user experiences . We aim to gather valuable insights by closely observing and immersing ourselves in the users perspective .',
      },
      {
        slideIndex: 3,
        noteindex: '3/3',
        title: 'EMPATHIZE-3',
        content:
          'Empathy involves 3 key principles . Immersing ourselves in the environment . Second observing . And third interacting with the target users and customers .',
      },

      {
        slideIndex: 4,
        noteindex: '1/3',
        title: 'DEFINE-1',
        content:
          'The Define stage involves the clear definition of the problem at hand drawing upon the information we have gathered through empathetic exploration . This step helps us establish a solid foundation for problem-solving based on a comprehensive understanding of user needs .',
      },
      {
        slideIndex: 4,
        noteindex: '2/3',
        title: 'DEFINE-2',
        content:
          'In this stage we identify user needs arising from interactions with potential customers .',
      },
      {
        slideIndex: 4,
        noteindex: '3/3',
        title: 'DEFINE-3',
        content:
          'The Define stage is about gaining insights and then establishing the focus of the task .',
      },




      {
        slideIndex: 5,
        noteindex: '1/3',
        title: 'IDEATE-1',
        content:
          'The next stage is Ideate . It involves breaking down the problem into more specific issues and finding several solutions for them .',
      },
      {
        slideIndex: 5,
        noteindex: '2/3',
        title: 'IDEATE-2',
        content:
          'Brainstorming serves as the primary technique during the Ideate phase . By engaging in brainstorming sessions teams can harness collective creativity to generate a multitude of ideas . These ideas are then refined through prototyping and iterative testing . It is important to emphasize that during this phase the focus is solely on idea generation . The evaluation and refinement of ideas come later in the process . We can be more creative without worrying about criticism too early.'      
        },
      {
        slideIndex: 5,
        noteindex: '3/3',
        title: 'IDEATE-3',
        content:
          'Ultimately the goal of Ideate is to produce a robust pool of potential solutions that can be further refined and developed in subsequent stages of the Design Thinking Process .',
      },
      {
        slideIndex: 6,
        noteindex: '1/2',
        title: 'PROTOTYPE-1',
        content:
          'Next phase is Prototype . Here we bring the concept to life by creating a simplified prototype . This tangible representation allows us to visualize and test the idea more effectively .',
      },
      {
        slideIndex: 6,
        noteindex: '2/2',
        title: 'PROTOTYPE-2',
        content:
          'Those who fail often spend too much time planning and building without testing assumptions about how things will work and without rapidly iterating on diverse ideas . It is crucial to test ideas and iterate through modifications .',
      },

      {
        slideIndex: 7,
        noteindex: '1/3',
        title: 'TEST-1',
        content: 'The final stage of the design process is testing . We utilize the experience prototype as a means to gather invaluable feedback from users during this phase .',
      },
      {
        slideIndex: 7,
        noteindex: '2/3',
        title: 'TEST-2',
        content:
          'It is essential to seek not only to validate our assumptions but also to uncover any unexpected user needs or behaviors . By observing how users interact with the prototype we can gain new information about the actual users needs and find areas for improvement .',
      },
      {
        slideIndex: 7,
        noteindex: '3/3',
        title: 'TEST-3',
        content:
          'Prototype testing provides an opportunity to iterate on our designs . This iterative process allows us to continuously improve and refine our solutions until they meet the needs of our users effectively .',
      },

      {
        slideIndex: 8,
        noteindex: '1/1',
        title: '8-1',
        content: 'Here concludes the content I have prepared . Thank you for your attention .',
      },
    ],
    []
  );

  // 현재 출력된 ppt 슬라이드의 인덱스 (carouselItems 배열에서 ppt pg에 해당하는 항목의 slideIndex를 가져와서 할당? )
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  // 현재 활성화된 슬라이드와 동일한 slideIndex를 가진 항목들로 구성 (filter 함수 사용)
  const [filteredCarouselItems, setFilteredCarouselItems] = useState([]);

  useEffect(() => {
    // currentSlideIndex 값이 변경될 때마다 carouselItems 배열에서 필터링하여 해당 슬라이드와 일치하는 항목들을 설정
    const filteredItems = carouselItems.filter(
      (item) => item.slideIndex === currentSlideIndex
    );
    setFilteredCarouselItems(filteredItems);
    // activeItemIndex가 존재하는 경우, 해당 슬라이드의 인덱스로 설정
    if (filteredItems.length > 0) {
      setActiveItemIndex(0); // 예시로 첫 번째 항목을 활성화
    }
  }, [currentSlideIndex, carouselItems]);

  // activeItemIndex가 변경될 때마다 해당 아이템의 title을 상위 컴포넌트의 상태로 설정
  useEffect(() => {
    if (
      filteredCarouselItems.length > 0 &&
      filteredCarouselItems[activeItemIndex]
    ) {
      // 현재 활성화된 아이템의 title을 가져와서 상위 컴포넌트의 상태로 설정
      const activeTitle = filteredCarouselItems[activeItemIndex].title;
      setActiveTitle(activeTitle);
      console.log('Presenter', activeTitle);
    }
  }, [
    currentSlideIndex,
    activeItemIndex,
    filteredCarouselItems,
    setActiveTitle,
  ]);

  return (
    <ItemsCarousel
      vertical={true}
      numberOfCards={1}
      activeItemIndex={activeItemIndex}
      requestToChangeActive={setActiveItemIndex}
      gutter={20}
      slidesToScroll={1}
      showSlither={false}
      firstAndLastGutter={false}
    >
      {filteredCarouselItems.map((item, index) => (
        <PresenterNotes
          key={index}
          noteindex={item.noteindex}
          title={item.title}
          content={item.content}
          isActive={index === activeItemIndex}
          setActiveItemIndex={setActiveItemIndex}
          isPresentationMode={isPresentationMode}
          index={index}
          totalItems={filteredCarouselItems.length}
        />
      ))}
    </ItemsCarousel>
  );
}

export default PresenterNotesCarousel;
