import { create } from 'zustand';

const useStore = create((set) => ({
  currentSlideIndex: 5,
  highlightedContent: null,
  triggerWord: '',
  activeTitle: '',

  setCurrentSlideIndex: (index) => set({ currentSlideIndex: index }),
  setHighlightedContent: (content) => set({ highlightedContent: content }),
  setTriggerWord: (word) => set({ triggerWord: word }),
  setActiveTitle: (title) => set({ activeTitle: title }),

  highlightedIndicesState: { beforeIndices: [], afterIndices: [] },
  setHighlightedIndicesState: (indices) =>
    set({ highlightedIndicesState: indices }),
}));

export default useStore;
