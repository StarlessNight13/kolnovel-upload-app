// --- Type Definitions ---

interface ChapterData {
  id: string;
  content: string;
  chapterNumber: string; // Keep as string if input allows non-numeric initially
  chapterTitle: string;
  postOnOtherWebsite: boolean;
  scheduledDate: Date | undefined;
}

interface ComponentState {
  chapters: ChapterData[];
  loadingId: string | null;
  isProcessingSequence: boolean;
  isSuccess: boolean;
  error: string | null; // Add error state for better feedback
  progress: number;
}
type Action =
  | { type: "ADD_CHAPTER"; payload: ChapterData }
  | { type: "ADD_MULTIPLE_CHAPTERS"; payload: ChapterData[] }
  | { type: "REMOVE_CHAPTER"; payload: string } // id
  | {
      type: "UPDATE_CHAPTER";
      payload: { id: string; field: keyof ChapterData; value: unknown };
    }
  | { type: "START_PROCESSING" }
  | { type: "SET_LOADING_ID"; payload: string | null }
  | { type: "FINISH_PROCESSING"; payload: { success: boolean; error?: string } }
  | { type: "RESET_STATE" } // Optional: for complete reset
  | { type: "UPDATE_PROGRESS"; payload: number };

export const initialState: ComponentState = {
  chapters: [],
  loadingId: null,
  isProcessingSequence: false,
  isSuccess: false,
  error: null,
  progress: 0,
};

export default function chapterReducer(
  state: ComponentState,
  action: Action
): ComponentState {
  switch (action.type) {
    case "ADD_CHAPTER":
      // Prevent adding if processing
      if (state.isProcessingSequence) return state;
      return {
        ...state,
        chapters: [...state.chapters, action.payload],
        isSuccess: false, // Reset success state on modification
        error: null,
      };
    case "ADD_MULTIPLE_CHAPTERS":
      if (state.isProcessingSequence) return state;
      return {
        ...state,
        chapters: [...state.chapters, ...action.payload],
        isSuccess: false, // Reset success state on modification
        error: null,
      };
    case "REMOVE_CHAPTER":
      // Note: This allows removing chapters even during processing in the UI,
      // but they might still be processed if already sent. Consider disabling removal during processing.
      return {
        ...state,
        chapters: state.chapters.filter((ch) => ch.id !== action.payload),
        isSuccess: state.chapters.length - 1 === 0 && state.isSuccess, // Maintain success if last chapter removed was the one making it successful
        error: null,
      };
    case "UPDATE_CHAPTER":
      // Prevent updates during processing
      if (state.isProcessingSequence) return state;
      return {
        ...state,
        chapters: state.chapters.map((chapter) =>
          chapter.id === action.payload.id
            ? { ...chapter, [action.payload.field]: action.payload.value }
            : chapter
        ),
        isSuccess: false, // Reset success state on modification
        error: null,
      };
    case "START_PROCESSING":
      return {
        ...state,
        isProcessingSequence: true,
        loadingId: null,
        isSuccess: false,
        error: null,
      };
    case "SET_LOADING_ID":
      return {
        ...state,
        loadingId: action.payload,
      };
    case "FINISH_PROCESSING":
      return {
        ...state,
        isProcessingSequence: false,
        loadingId: null,
        isSuccess: action.payload.success && !action.payload.error, // Only success if no error occurred overall
        error: action.payload.error || null,
      };
    case "RESET_STATE":
      return initialState;
    case "UPDATE_PROGRESS":
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
}
