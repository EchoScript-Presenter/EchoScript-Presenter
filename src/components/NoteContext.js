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
          'Hello everyone!  Today I want to explore the concept of "Design Thinking Process in User Experience.',
      },
      {
        index: 1,
        slideIndex: 2,
        noteindex: '1/3',
        title: 'Design Process-1',
        content:
          'Design Thinking Process is a flexible problem-solving approach emphasizing creativity and innovation. It centered on understanding user needs through structured steps. I will outline the fundamental stages.',
      },
      {
        index: 2,
        slideIndex: 2,
        noteindex: '2/3',
        title: 'Design Process-2',
        content:
          'Design Thinking Process begins with empathizing to understand users experiences, then defining problem clearly. Next, diverse ideas are generated during ideation to address problem, followed by prototyping based on the most promising concepts.',
      },


      {
        index: 3,
        slideIndex: 2,
        noteindex: '3/3',
        title: 'Design Process-3',
        content:
          'The final stage tests prototypes with real users to gather feedback on designs. Design Thinking Process is not strictly linear but iterative, allowing stages to be revisited or iterated forward and backward as needed.'
         },


      {
        index: 4,
        slideIndex: 3,
        noteindex: '1/3',
        title: 'EMPATHIZE-1',
        content:
          'The first stage is the Empathize stage. This phase serves to get close and familiar with our target users. ',
      },

      {
        index: 5,
        slideIndex: 3,
        noteindex: '2/3',
        title: 'EMPATHIZE-2',
        content:
          'During this stage, we focus on grasping user experiences through empathy, aiming to gather insights by observing and immersing in their perspective.',
      },

      {
        index: 6,
        slideIndex: 3,
        noteindex: '3/3',
        title: 'EMPATHIZE-3',
        content:
          'Empathy is based on 3 key principles. Immersing ourselves in the environment. Second observing. Third interacting with target users and customers.',
      },

      {
        index: 7,
        slideIndex: 4,
        noteindex: '1/3',
        title: 'DEFINE-1',
        content:
        'The Define stage focuses on identifying problems through empathy insights, setting a solid base for solving it with a deep understanding of user needs.',
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
          'Define stage focuses on collecting information to identify clearly the main goal of the task.',
      },

      {
        index: 10,
        slideIndex: 5,
        noteindex: '1/3',
        title: 'IDEATE-1',
        content:
          'The next stage is Ideate. It involves breaking down the problem into more specific issues and finding several solutions for them. ',
      },
      {
        index: 11,
        slideIndex: 5,
        noteindex: '2/3',
        title: 'IDEATE-2',
        content:
          'Brainstorming is the main technique in this phase, focusing on generating ideas through team creativity, later refined by prototyping and testing. Evaluation and improvement happen afterwards, promoting creativity without early criticism. ',
      },

      {
        index: 12,
        slideIndex: 5,
        noteindex: '3/3',
        title: 'IDEATE-3',
        content:
          'The Ideate phase aims to generate a strong array of solutions for further refinement and development in later Design Thinking stages.',
      },
      {
        index: 13,
        slideIndex: 6,
        noteindex: '1/2',
        title: 'PROTOTYPE-1',
        content:
          'The next step, Prototype, transforms concepts into simplified models. This physical form helps visualize and evaluate the ideas effectively.',
      },
      {
        index: 14,
        slideIndex: 6,
        noteindex: '2/2',
        title: 'PROTOTYPE-2',
        content:
          'Frequent failures stem from excessive planning and constructing without verifying hypotheses on functionality or iterating on varied concepts quickly. Essential is the prompt testing and refining of ideas.',
      },

      {
        index: 15,
        slideIndex: 7,
        noteindex: '1/3',
        title: 'TEST-1',
        content:
          "Testing, the layout process's culmination, employs the prototype to collect critical feedback from participants in this phase.",
      },
      {
        index: 16,
        slideIndex: 7,
        noteindex: '2/3',
        title: 'TEST-2',
        content:
          'Vital is not just affirming our predictions but also revealing unforeseen participant needs or actions. Monitoring interactions with the model yields insights into genuine requirements and improvement opportunities.',
      },
      {
        index: 17,
        slideIndex: 7,
        noteindex: '3/3',
        title: 'TEST-3',
        content:
          'Testing the prototype offers a chance to refine our designs iteratively. This ongoing process enhances our solutions until they satisfactorily meet participant demands.',
      },

      {
        index: 18,
        slideIndex: 8,
        noteindex: '1/1',
        title: 'END',
        content:
          'This marks the completion of my prepared material. I appreciate your attention.',
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
