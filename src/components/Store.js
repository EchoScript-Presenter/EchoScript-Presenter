import { create } from 'zustand';

const useStore = create((set) => ({
  highlightedIndices: [],
  setHighlightedIndices: (indices) => set({ highlightedIndices: indices }),
}));

export default useStore;
