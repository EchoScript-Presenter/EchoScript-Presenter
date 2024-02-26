import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import PresenterNotes from './PresenterNotes/PresenterNotes';

function PresenterNotesCarousel() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // useEffect(() => {
  //   // 현재 가운데 노트의 마지막 단어 확인
  //   const currentNote = notes[activeItemIndex];
  //   const lastWord = currentNote.content.split(' ').pop();

  //   // 백엔드에서 받은 단어와 마지막 단어가 일치하면 다음 노트로 이동
  //   if (lastWord === triggerWord && activeItemIndex < notes.length - 1) {
  //     setActiveItemIndex(activeItemIndex + 1);
  //   }
  // }, [triggerWord, activeItemIndex, notes]);

  const carouselItems = [
    { title: 'Title 1', content: 'Good morning, everyone! Today, I want to explore the concept of "The Design Thinking Process in User Experience Design."' },
    { title: 'Title 2', content: 'The Design Thinking Process is a creative and innovative problem-solving methodology that adopts a user-centered approach to define and address problems through a series of steps. While there are various versions, I will explain the most basic stages.' },
    { title: 'Title 3', content: 'Essentially, it involves understanding user experiences, defining problems clearly based on collected information, ideating to generate ideas, creating prototypes based on promising ideas, and testing these prototypes with real users to gather feedback. To design user experiences, these stages are often followed sequentially, sometimes iterated forward or even backward as needed.' },
    { title: 'Title 4', content: 'The first stage is the Empathize stage. Here, the purpose of this stage is to get close and familiar with our target users. '},
    { title: 'Title 5', content: 'During this phase, our focus is on understanding and empathizing with user experiences. We aim to gather valuable insights by closely observing and immersing ourselves in the users perspective.'},
  ];


  return (
    <ItemsCarousel
      vertical={true} // 아이템들을 수직으로 나열.....인데 왜 수평으로 나열되는거지?!
      numberOfCards={1} // 한 번에 하나의 카드만 보여주기
      activeItemIndex={activeItemIndex}
      requestToChangeActive={setActiveItemIndex}
      gutter={20} // item 간 간격
      slidesToScroll={2}
      showSlither={true}
      firstAndLastGutter={false}
      activePosition={'center'}
      //outsideChevron={true}
      //alwaysShowChevrons={false}
      //chevronWidth={60} // 일단 넘기기 버튼은 안넣음 (자동 기능 위해)
      //rightChevron={'👇'} // 아래 화살표로 변경
      //leftChevron={'👆'} // 위 화살표로 변경
    >
      {carouselItems.map((item, index) => (
        <PresenterNotes
          key={index}
          content={item.content}
          index={index}
          isActive={index === activeItemIndex}
          setActiveItemIndex={setActiveItemIndex}
          totalItems={carouselItems.length}
        />
      ))}
    </ItemsCarousel>
  );
}

export default PresenterNotesCarousel;