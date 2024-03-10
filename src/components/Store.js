import { create } from 'zustand';

const useStore = create((set) => ({
  highlightedIndicesState: {beforeIndices: [], afterIndices: []},
  setHighlightedIndicesState: (indices) => set({ highlightedIndicesState: indices }),
}));

export default useStore;
