import { useNote } from './NoteContext';
import { useSpeech } from './SpeechContext';
import useStore from './Store';

export const useNavigation = () => {
  const { nextNote, prevNote, totalItems, activeNoteIndex } = useNote();
  const { resetTranscript } = useSpeech();
  const { setHighlightedIndicesState } = useStore();

  const navigateNotes = (direction) => {
    if (direction === 'prev' && activeNoteIndex > 0) {
      prevNote();
      resetTranscript();
      setHighlightedIndicesState([],[]);
    } else if (direction === 'next' && activeNoteIndex < totalItems - 1) {
      nextNote();
      resetTranscript();
      setHighlightedIndicesState([],[]);
    }
  };

  return { navigateNotes };
};
