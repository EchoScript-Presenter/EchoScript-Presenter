import { create } from 'zustand';

const useStore = create((set) => ({
  currentSlideIndex: 5,
  highlightedContent: null,
  triggerWord: '',
  activeTitle: '',

  duration: null,
  intervals: [],
  index: null,


  setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),
  setHighlightedContent: (content) => set({ highlightedContent: content }),
  setTriggerWord: (word) => set({ triggerWord: word }),
  setActiveTitle: (title) => set({ activeTitle: title }),

  highlightedIndicesState: { beforeIndices: [], afterIndices: [] },
  setHighlightedIndicesState: (indices) =>
    set({ highlightedIndicesState: indices }),

  setDuration: (duration) => set({ duration: duration }),
  setIntervals: (intervals) => set({ intervals: intervals }),
  setIndex: (index) => set({ index: index }),
  
}));

export default useStore;
