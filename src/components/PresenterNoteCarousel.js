import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import PresenterNotes from './PresenterNotes/PresenterNotes';

function PresenterNotesCarousel({currentSlideIndex, isPresentationMode}) {

  // 배열로 대본 노트 정보 (ppt 슬라이드 인덱스, 타이틀, 내용 저장)
  const carouselItems = [
    { slideIndex: 1, noteindex:'1/1', title: 'Greetings', content: 'Good morning, everyone! Today, I want to explore the concept of "The Design Thinking Process in User Experience Design."' },
    // @여울언니! title에 하이라이트 하고 싶은거 적으시면 됩니당 ~~! 
    { slideIndex: 2, noteindex: '1/3', title: 'Design Process', content: 'This process is a creative and innovative problem-solving methodology that adopts a user-centered approach to define and address problems through a series of steps. While there are various versions, I will explain the most basic stages.' },
    { slideIndex: 2, noteindex: '2/3', title: '2-2', content: 'Essentially, it involves understanding user experiences, defining problems clearly based on collected information, ideating to generate ideas, creating prototypes based on promising ideas, and testing these prototypes with real users to gather feedback. To design user experiences, these stages are often followed sequentially, sometimes iterated forward or even backward as needed.' },
    { slideIndex: 2, noteindex: '3/3', title: '2-3', content: 'Detailed information for each stage will be covered starting from the next slide.' },
    
    { slideIndex: 3, noteindex: '1/3', title: '3-1', content: 'The first stage is the Empathize stage. Here, the purpose of this stage is to get close and familiar with our target users.' },
    { slideIndex: 3, noteindex: '2/3', title: '3-2', content: 'During this phase, our focus is on understanding and empathizing with user experiences. We aim to gather valuable insights by closely observing and immersing ourselves in the users perspective.' },
    { slideIndex: 3, noteindex: '3/3', title: '3-3', content: 'Empathy involves 3 key principles: first, immersing ourselves in the environment; second, observing; and third, interacting with the target users and customers.' },
    
    { slideIndex: 4, noteindex: '1/3', title: '4-1', content: 'Next, the Define stage involves the clear definition of the problem at hand, drawing upon the information we have gathered through empathetic exploration. This step helps us establish a solid foundation for problem-solving based on a comprehensive understanding of user needs.' },
    { slideIndex: 4, noteindex: '2/3', title: '4-2', content: 'In this stage, we identify user needs arising from interactions with potential customers, we aim to utilize this awareness to pinpoint our focus.'},
    { slideIndex: 4, noteindex: '3/3',title: '4-3', content: 'The Define stage is about gaining insights and then establishing the focus of the task.' },
    
    { slideIndex: 5, noteindex: '1/2', title: '5-1', content: 'The next stage is Ideate. It involves breaking down the problem into more specific issues and finding several solutions for them. ' },
    { slideIndex: 5, noteindex: '2/2', title: '5-2', content: 'Primarily using brainstorming, we explore ideas that could be solutions through prototyping and iteration. Regardless of the idea generation technique used, the key principle is to separate the process of creating ideas from evaluating them. It is essential not to criticize but to strive to produce a substantial quantity of them in this process.' },
  
    { slideIndex: 6, noteindex: '1/2', title: '6-1', content: 'Having identified the most promising idea during the previous stage, we proceed to the Prototype phase. Here, we bring the concept to life by creating a simplified prototype. This tangible representation allows us to visualize and test the idea more effectively.' },
    { slideIndex: 6, noteindex: '2/2', title: '6-2', content: 'Those who fail often spend too much time planning and building without testing assumptions about how things will work and without rapidly iterating on diverse ideas. It is crucial to test ideas, embrace failures, and iterate through modifications.' },
  
    { slideIndex: 7, noteindex: '1/1',title: '7-1', content: 'The final stage is testing. Think of the experience prototype as another method of discovering needs and inquire what, if any, new information there is about the users needs. This is essentially testing not the prototype of your ideas themselves, but how well they address the users needs. It is crucial to check if you are creating a solution that genuinely meets user needs and if your assumptions are accurate.' },
    
    { slideIndex: 8, noteindex: '1/1', title: '8-1', content: 'Thank you for listening to my presentation so far.' },

  ];

  // 현재 출력된 ppt 슬라이드의 인덱스 (carouselItems 배열에서 ppt pg에 해당하는 항목의 slideIndex를 가져와서 할당? )
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  // 현재 활성화된 슬라이드와 동일한 slideIndex를 가진 항목들로 구성 (filter 함수 사용)
  const [filteredCarouselItems, setFilteredCarouselItems] = useState([]);
  
  useEffect(() => {
    // currentSlideIndex 값이 변경될 때마다 carouselItems 배열에서 필터링하여 해당 슬라이드와 일치하는 항목들을 설정
    const filteredItems = carouselItems.filter(item => item.slideIndex === currentSlideIndex);
    setFilteredCarouselItems(filteredItems);
    // activeItemIndex가 존재하는 경우, 해당 슬라이드의 인덱스로 설정
    if (filteredItems.length > 0) {
      setActiveItemIndex(0); // 예시로 첫 번째 항목을 활성화
    }
  }, [currentSlideIndex]);

  
  
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
          noteindex = {item.noteindex}
          title={item.title}
          content={item.content}
          isActive={index === activeItemIndex}
          setActiveItemIndex={setActiveItemIndex}
          isPresentationMode = {isPresentationMode}
          index={index}
          totalItems={filteredCarouselItems.length}
        />
      ))}
    </ItemsCarousel>
  );
}

export default PresenterNotesCarousel;
