import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';

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
          'Hello everyone! Today, I want to explore the concept of "Early Creating Prototypes". ',
        sec: 8,
      },
      {
        index: 1,
        slideIndex: 2,
        noteindex: '1/3',
        title: 'Design Process-1',
        content:
          "Let's start with sketching and storyboarding. Storyboarding, originating in movies and animation, visually outlines the narrative, simplifying complex stories into sequential chunks. It helps organize thoughts and fosters collaboration among team members, ensuring alignment on the project's vision and direction.",
        sec: 14,
      },
      {
        index: 2,
        slideIndex: 2,
        noteindex: '2/3',
        title: 'Design Process-2',
        content:
          "It's like a 'script,' captures vital story events, bypassing details to spotlight key experiences. Particularly useful for prototype creation, it showcases user interactions with the product.",
        sec: 22,
      },

      {
        index: 3,
        slideIndex: 2,
        noteindex: '3/3',
        title: 'Design Process-3',
        content:
          'Storyboarding distills the user journey into key frames, enabling designers to spot pain points and improvement opportunities early for more user-centric designs and a smoother experience.',
        sec: 16,
      },

      {
        index: 4,
        slideIndex: 3,
        noteindex: '1/3',
        title: 'EMPATHIZE-1',
        content:
          "When discussing prototypes, we're essentially talking about early samples or models used to test concepts. They're invaluable tools for designers, providing tangible representations of ideas and demonstrating how they operate in real-world scenarios.",
        sec: 9,
      },

      {
        index: 5,
        slideIndex: 3,
        noteindex: '2/3',
        title: 'EMPATHIZE-2',
        content:
          'By creating prototypes, designers can gain insights into the functionality of their ideas. They provide a platform for experimentation and iteration, allowing for the refinement of designs before moving into full-scale production.',
        sec: 11,
      },

      {
        index: 6,
        slideIndex: 3,
        noteindex: '3/3',
        title: 'EMPATHIZE-3',
        content:
          'Different dimensions of prototypes should be considered, as they serve to clearly showcase designs.',
        sec: 10,
      },

      {
        index: 7,
        slideIndex: 4,
        noteindex: '1/3',
        title: 'DEFINE-1',
        content:
          'Prototypes vary in their representation of the final product, level of detail, interactivity, and evolution over time. Selecting the appropriate prototype type depends on specific design goals and stage, ensuring an efficient path to the final product.',
        sec: 11,
      },
      {
        index: 8,
        slideIndex: 4,
        noteindex: '2/3',
        title: 'DEFINE-2',
        content:
          "Let's explore a critical aspect of prototyping - Fidelity. Fidelity denotes the level of detail incorporated into a prototype.",
        sec: 6,
      },
      {
        index: 9,
        slideIndex: 4,
        noteindex: '3/3',
        title: 'DEFINE-3',
        content:
          'When discussing high fidelity, we mean prototypes resembling the final product, with intricate details, aiding in envisioning it accurately.',
        sec: 7,
      },

      {
        index: 10,
        slideIndex: 5,
        noteindex: '1/3',
        title: 'IDEATE-1',
        content:
          'On the other hand, Low fidelity prototypes, unlike detailed ones, are akin to basic sketches with undeveloped areas. They intentionally lack final product details, serving as a swift and economical means to communicate primary design concepts without fixating on minutiae.',
        sec: 10,
      },
      {
        index: 11,
        slideIndex: 5,
        noteindex: '2/3',
        title: 'IDEATE-2',
        content:
          "So, How should we set the 'Fidelity' criteria? High-fidelity prototypes might distort testers' perception. 'Finished' prototypes mainly prompt comments on colors, fonts, and alignment.",
        sec: 16,
      },

      {
        index: 12,
        slideIndex: 5,
        noteindex: '3/3',
        title: 'IDEATE-3',
        content:
          'Moreover, high-fidelity prototypes are time-consuming to implement and may not fully capture the overall appearance, potentially limiting creativity in the design process.',
        sec: 10,
      },
      {
        index: 13,
        slideIndex: 6,
        noteindex: '1/2',
        title: 'PROTOTYPE-1',
        content:
          'In traditional design methods, we begin with sketches, then move to prototypes, evaluate, and iterate based on feedback. However, this can be time-consuming and delay development schedules.',
        sec: 10,
      },
      {
        index: 14,
        slideIndex: 6,
        noteindex: '2/2',
        title: 'PROTOTYPE-2',
        content:
          'Low - fidelity prototypes provide a faster way to evaluate and iterate. Designers can make changes swiftly while others observe and document the process.',
        sec: 13,
      },

      {
        index: 15,
        slideIndex: 7,
        noteindex: '1/3',
        title: 'TEST-1',
        content:
          "Additionally, creating low-fidelity prototypes doesn't always require programming skills, simplifying the process and enabling faster iterations, enhancing efficiency towards the final product.",
        sec: 10,
      },
      {
        index: 16,
        slideIndex: 7,
        noteindex: '2/3',
        title: 'TEST-2',
        content:
          'It is crucial not only to confirm our predictions but also to uncover unexpected needs or behaviors of the participants. ',
        sec: 16,
      },
      {
        index: 17,
        slideIndex: 7,
        noteindex: '3/3',
        title: 'TEST-3',
        content:
          'Monitoring interactions with the model yields insights into genuine requirements and improvement opportunities.',
        sec: 11,
      },

      {
        index: 18,
        slideIndex: 8,
        noteindex: '1/1',
        title: 'END',
        content:
          'Here concludes the content I have prepared. Thank you for your attention.',
        sec: 6,
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

  // currentSlideIndex가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    const newActiveIndex = carouselItems.findIndex(
      (item) => item.slideIndex === currentSlideIndex
    );
    if (newActiveIndex !== -1) {
      setActiveNoteIndex(newActiveIndex);
    }
  }, [currentSlideIndex, carouselItems]);

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
