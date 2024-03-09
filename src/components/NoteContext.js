import React, { createContext, useContext, useState, useMemo } from 'react';

const NoteContext = createContext();

export const useNote = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const [activeNoteIndex, setActiveNoteIndex] = useState(0); // carouselItems 배열에서 현재 활성화된 노트의 인덱스

  const carouselItems = useMemo(
    () => [
      {
        index: 0,
        slideIndex: 1,
        noteindex: '1/1',
        title: 'Greetings',
        content:
          'Hello, everyone! 👀 Today I want to explore the concept of The Design Thinking Process in User Experience Design.',
      },
      {
        index: 1,
        slideIndex: 2,
        noteindex: '1/3',
        title: 'Design Process-1',
        content:
          'The Design Thinking Process is a flexible and dynamic problem - solving approach that emphasizes creativity and innovation. 👀 It revolves around understanding and addressing user needs through a series of structured steps. While there are several versions of the process I will outline the fundamental stages.',
      },
      {
        index: 2,
        slideIndex: 2,
        noteindex: '2/3',
        title: 'Design Process-2',
        content:
          'At its core the Design Thinking Process begins with empathizing with users to gain insights into their experiences. 👀 This is followed by clearly defining the problem based on the information gathered. The process moves into the ideation phase where diverse ideas are generated to tackle the identified problem.👀 Subsequently, prototypes develop based on the most promising ideas. ',
      },
      {
        index: 3,
        slideIndex: 2,
        noteindex: '3/3',
        title: 'Design Process-3',
        content:
          'The final stage involves testing these prototypes with real users to gather feedback and iterate on the designs. The Design Thinking Process is not strictly linear. 👀 Instead, it is iterative and adaptable. Depending on the context and requirements the stages may be revisited or iterated forward and backward as necessary.',
      },

      {
        index: 4,
        slideIndex: 3,
        noteindex: '1/3',
        title: 'EMPATHIZE-1',
        content:
          'The first stage is the Empathize stage. 👀This stage serves to get close and familiar with our target users. ',
      },
      {
        index: 5,
        slideIndex: 3,
        noteindex: '2/3',
        title: 'EMPATHIZE-2',
        content:
          'During this phase our focus is on understanding and empathizing with user experiences. We aim to gather valuable insights 👀 by closely observing and immersing ourselves in the users perspective.',
      },
      {
        index: 6,
        slideIndex: 3,
        noteindex: '3/3',
        title: 'EMPATHIZE-3',
        content:
          'Empathy involves 3 key principles. Immersing ourselves in the environment. 👀 Second observing. 👀 And third interacting with the target users and customers.',
      },

      {
        index: 7,
        slideIndex: 4,
        noteindex: '1/3',
        title: 'DEFINE-1',
        content:
          'The Define stage involves the clear definition of the problem at hand drawing upon the information we have gathered through empathetic exploration. 👀 This step helps us establish a solid foundation for problem-solving based on a comprehensive understanding of user needs.',
      },
      {
        index: 8,
        slideIndex: 4,
        noteindex: '2/3',
        title: 'DEFINE-2',
        content:
          'In this stage we identify user needs arising from interactions with potential customers. ',
      },
      {
        index: 9,
        slideIndex: 4,
        noteindex: '3/3',
        title: 'DEFINE-3',
        content:
          '👀 The Define stage is about gaining insights and then establishing the focus of the task.',
      },

      {
        index: 10,
        slideIndex: 5,
        noteindex: '1/3',
        title: 'IDEATE-1',
        content:
          'The next stage is Ideate. 👀 It involves breaking down the problem into more specific issues and finding several solutions for them. ',
      },
      {
        index: 11,
        slideIndex: 5,
        noteindex: '2/3',
        title: 'IDEATE-2',
        content:
          '👀Brainstorming serves as the primary technique during the Ideate phase. 👀 By engaging in brainstorming sessions, teams can harness collective creativity to generate a multitude of ideas. 👀 These ideas are then refined through prototyping and iterative testing. 👀 It is important to emphasize that during this phase, the focus is solely on idea generation. The evaluation and refinement of ideas come later in the process. 👀 We can be more creative without worrying about criticism too early. ',
      },
      {
        index: 12,
        slideIndex: 5,
        noteindex: '3/3',
        title: 'IDEATE-3',
        content:
          '👀Ultimately the goal of Ideate is to produce a robust pool of potential solutions 👀 that can be further refined and developed in subsequent stages of the Design Thinking Process.',
      },
      {
        index: 13,
        slideIndex: 6,
        noteindex: '1/2',
        title: 'PROTOTYPE-1',
        content:
          'Next phase is Prototype. Here we bring the concept to life by creating a simplified prototype. 👀 This tangible representation allows us to visualize and test the idea more effectively.',
      },
      {
        index: 14,
        slideIndex: 6,
        noteindex: '2/2',
        title: 'PROTOTYPE-2',
        content:
          'Those who fail often spend too much time planning and building without testing assumptions about how things will work and without rapidly iterating on diverse ideas. 👀 It is crucial to test ideas and iterate through modifications.',
      },

      {
        index: 15,
        slideIndex: 7,
        noteindex: '1/3',
        title: 'TEST-1',
        content:
          'The final stage of the design process is testing. We utilize the experience prototype as a means to gather invaluable feedback from users during this phase. ',
      },
      {
        index: 16,
        slideIndex: 7,
        noteindex: '2/3',
        title: 'TEST-2',
        content:
          '👀It is essential to seek not only to validate our assumptions but also to uncover any unexpected user needs or behaviors. By observing how users interact with the prototype, we can gain new information about the actual users needs and find areas for improvement.',
      },
      {
        index: 17,
        slideIndex: 7,
        noteindex: '3/3',
        title: 'TEST-3',
        content:
          '👀Prototype testing provides an opportunity to iterate on our designs. This iterative process allows us to continuously improve and refine our solutions 👀 until they meet the needs of our users effectively.',
      },

      {
        index: 18,
        slideIndex: 8,
        noteindex: '1/1',
        title: 'END',
        content:
          'Here concludes the content I have prepared. Thank you for your attention.',
      },
    ],
    []
  );

  const currentSlideItems = useMemo(() => {
    return carouselItems.filter(
      (item) => item.slideIndex === currentSlideIndex
    );
  }, [carouselItems, currentSlideIndex]);

  const totalItems = carouselItems.length;

  const nextNote = () => {
    setActiveNoteIndex((prevIndex) => {
      // 다음 아이템의 인덱스 계산
      const nextIndex = (prevIndex + 1) % carouselItems.length;
      return nextIndex;
    });
  };

  const prevNote = () => {
    setActiveNoteIndex((prevIndex) => {
      // 이전 아이템의 인덱스 계산
      const newIndex =
        prevIndex - 1 < 0 ? carouselItems.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const value = {
    currentSlideIndex,
    setCurrentSlideIndex,
    carouselItems,
    activeNoteIndex,
    setActiveNoteIndex,
    totalItems,
    activeNote: carouselItems[activeNoteIndex], // 현재 활성화된 노트 정보
    currentSlideItems, // 현재 슬라이드에 해당하는 아이템
    nextNote,
    prevNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
