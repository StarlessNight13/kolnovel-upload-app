import { StopCircle } from "lucide-react";
import { useCallback, useMemo, useReducer, useRef } from "react";

import ActionButtons from "@/components/mutli/action";
import ChaptersList from "@/components/mutli/chapter-list";
import UploadSection from "@/components/mutli/uploadSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

// --- Type Definitions ---

interface ChapterData {
  id: string;
  content: string;
  chapterNumber: string; // Keep as string if input allows non-numeric initially
  chapterTitle: string;
  postOnOtherWebsite: boolean;
}

interface FileData {
  type: string;
  name: string;
  content: string; // Assuming HTML string
}

interface MultipleTabProps {
  novel: string;
  volume: string;
}

// --- State Management (useReducer) ---

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

const initialState: ComponentState = {
  chapters: [],
  loadingId: null,
  isProcessingSequence: false,
  isSuccess: false,
  error: null,
  progress: 0,
};

function chapterReducer(state: ComponentState, action: Action): ComponentState {
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

// --- Utility Function ---
/**
 * Replaces <br> tags and empty <p> tags (containing only whitespace or &nbsp;)
 * with a paragraph containing a newline character (<p>\n</p>).
 * Moved outside the component to prevent re-creation on renders.
 */
function normalizeLineBreaks(htmlString: string): string {
  if (!htmlString) return ""; // Handle null/undefined input
  const newlineParagraph = "<p>\n</p>";

  // 1. Replace all variations of <br> tags
  const brRegex = /<br\s*\/?>/gi;
  let processedHtml = htmlString.replace(brRegex, newlineParagraph);

  // 2. Replace <p> tags that are empty or contain only whitespace or &nbsp;
  const emptyPRegex = /<p[^>]*>\s*(?:&nbsp;)?\s*<\/p>/gi;
  processedHtml = processedHtml.replace(emptyPRegex, newlineParagraph);

  return processedHtml;
}

// --- Main Component ---

export default function MultipleTab({ novel, volume }: MultipleTabProps) {
  const [state, dispatch] = useReducer(chapterReducer, initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  // --- Memoized Callbacks for Actions ---
  // These functions now dispatch actions to the reducer

  const removeChapter = useCallback((idToRemove: string) => {
    dispatch({ type: "REMOVE_CHAPTER", payload: idToRemove });
    toast("Chapter removed"); // Toast remains immediate feedback
  }, []); // dispatch is stable and doesn't need to be dependency

  const updateChapter = useCallback(
    (id: string, field: keyof ChapterData, value: unknown) => {
      dispatch({ type: "UPDATE_CHAPTER", payload: { id, field, value } });
    },
    [] // dispatch is stable
  );

  const addNewChapter = useCallback(
    (chapterData?: Partial<Omit<ChapterData, "id">>) => {
      const newChapter: ChapterData = {
        id: crypto.randomUUID(),
        content: chapterData?.content ?? "",
        chapterTitle: chapterData?.chapterTitle ?? "Untitled Chapter",
        chapterNumber: chapterData?.chapterNumber ?? "", // Default to empty string, let validation handle it
        postOnOtherWebsite: chapterData?.postOnOtherWebsite ?? true,
      };
      dispatch({ type: "ADD_CHAPTER", payload: newChapter });
    },
    [] // dispatch is stable
  );

  // --- Electron Interaction Logic ---

  const handleFileChange = useCallback(async () => {
    if (state.isProcessingSequence) return;

    try {
      const filePath = await window.ipcRenderer.invoke("open-file-dialog");
      if (!filePath) return; // User cancelled dialog

      // Add loading state feedback if file reading takes time
      const fileResult = (await window.ipcRenderer.invoke(
        "read-and-convert-file",
        filePath
      )) as FileData | FileData[] | null; // Expect null on error

      if (!fileResult) {
        toast.error("Failed to read or convert file.");
        return;
      }

      const processFile = (file: FileData): ChapterData => {
        // Try to extract number, default to empty string or a placeholder if needed
        const potentialNumber = file.name.split(".")[0];
        const chapterNumber = /^\d+$/.test(potentialNumber)
          ? potentialNumber
          : "";

        return {
          id: crypto.randomUUID(),
          content: normalizeLineBreaks(file.content),
          chapterTitle: file.name, // Consider cleaning up the extension here too if desired
          chapterNumber: chapterNumber,
          postOnOtherWebsite: true,
        };
      };

      if (Array.isArray(fileResult)) {
        // Create chapters first, then dispatch once
        const newChapters = fileResult.map(processFile);
        if (newChapters.length > 0) {
          dispatch({ type: "ADD_MULTIPLE_CHAPTERS", payload: newChapters });
          toast.success(`${newChapters.length} chapters added from ZIP.`);
        } else {
          toast.info("No valid chapter files found in the ZIP.");
        }
      } else {
        const newChapter = processFile(fileResult);
        dispatch({ type: "ADD_CHAPTER", payload: newChapter });
        toast.success(`Chapter "${newChapter.chapterTitle}" added.`);
      }
    } catch (error) {
      console.error("Error handling file change:", error);
      toast.error("An error occurred while processing the file.");
      // Optionally dispatch an error state to the reducer
    }
  }, [state.isProcessingSequence]); // dispatch is stable

  const cancelUpload = useCallback(async () => {
    if (!abortControllerRef.current) return;

    abortControllerRef.current.abort(); // Signal abortion

    try {
      // Ask main process to clean up anything it might be doing
      await window.ipcRenderer.invoke("cancel-upload");
      toast.info("Upload cancelled");
      dispatch({
        type: "FINISH_PROCESSING",
        payload: { success: false, error: "Cancelled by user" },
      });
    } catch (err) {
      console.error("Failed to formally cancel upload in main process:", err);
      // Still update UI state even if main process cancellation fails
      dispatch({
        type: "FINISH_PROCESSING",
        payload: { success: false, error: "Cancellation failed" },
      });
      toast.error("Failed to fully cancel upload process.");
    } finally {
      abortControllerRef.current = null; // Clean up ref
    }
  }, []); // dispatch is stable

  function extractTextFromAllElements(htmlString: string): string[] {
    const textContent: string[] = [];
    const elementRegex = /<([a-zA-Z0-9]+)[^>]*>([^<]*?)<\/\1>/g;
    let match;

    while ((match = elementRegex.exec(htmlString)) !== null) {
      const innerText = match[2].trim(); // The text content within the tags

      if (innerText) {
        textContent.push(innerText);
      }
    }

    return textContent;
  }

  const handleMultipleChaptersSubmit = useCallback(async () => {
    if (!novel || novel === "") {
      toast.error("Please select a novel.");
      return;
    }
    if (state.isProcessingSequence || state.chapters.length === 0) {
      toast.info("Processing already in progress or no chapters to process.");
      return;
    }

    toast.info("Starting chapter processing sequence...");


    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    dispatch({ type: "START_PROCESSING" });

    // Create a snapshot of chapters to process at this moment
    const chaptersToProcess = state.chapters.map((ch) => {
      const paragraphs = extractTextFromAllElements(ch.content);
      const contentString = paragraphs.join("\n\n");
      return {
        ...ch,
        content: contentString,
        novel, // Add novel/volume context here
        volume,
      };
    });

    let processingError: string | null = null;

    try {
      const chaptersNumber = chaptersToProcess.length;
      for (const chapter of chaptersToProcess) {
        if (signal.aborted) {
          toast.error("Upload aborted by user, breaking loop.");
          processingError = "Cancelled by user";
          break; // Exit the loop
        }

        dispatch({ type: "SET_LOADING_ID", payload: chapter.id });

        try {
          const posted = await window.ipcRenderer.invoke(
            "post-chapter",
            chapter
          );

          if (signal.aborted) {
            // Check again *after* await, in case cancelled during wait
            toast.error("Upload aborted during chapter post, breaking loop.");
            processingError = "Cancelled by user";
            break;
          }
          const index = chaptersToProcess.findIndex(
            (ch) => ch.id === chapter.id
          );
          if (posted) {
            toast.success(`Posted chapter: ${chapter.chapterTitle}`);
            dispatch({
              type: "UPDATE_PROGRESS",
              payload: (index * 100) / chaptersNumber,
            });
            // Remove from UI state *after* successful post confirmed by main process
            // Note: This dispatches inside a loop, causing re-renders.
            // If performance is critical, consider batching removals or updating status differently.
            dispatch({ type: "REMOVE_CHAPTER", payload: chapter.id });
          } else {
            // Handle failure for a single chapter
            toast.error(`Error posting chapter: ${chapter.chapterTitle}`);
            console.warn(
              `Failed to post chapter ${chapter.id} - ${chapter.chapterTitle}`
            );
            // Decide if one failure should stop the whole process
            // processingError = `Failed to post ${chapter.chapterTitle}`;
            // break; // Uncomment to stop on first error
            continue; // Continue with the next chapter
          }
        } catch (err: unknown) {
          if (signal.aborted) {
            console.log("Upload aborted during chapter post error handling.");
            processingError = "Cancelled by user";
          } else {
            console.error(`IPC Error posting chapter ${chapter.id}:`, err);
            toast.error(
              `Error posting chapter: ${chapter.chapterTitle} (IPC Error)`
            );
            processingError = `Error during posting of ${chapter.chapterTitle}`;
            // break; // Uncomment to stop on first error
          }
          break; // Stop processing further chapters on IPC error or abort
        }
      } // End of for loop
    } catch (error) {
      // Catch errors outside the loop (e.g., setup issues)
      console.error("Unexpected error during upload sequence:", error);
      processingError =
        "An unexpected error occurred during the upload process.";
      toast.error(processingError);
    } finally {
      // Check the final state based on what happened
      // Need to read the *current* state here, as chapters might have been removed by dispatch
      const finalChapterCount = chapterReducer(state, {
        type: "FINISH_PROCESSING",
        payload: { success: false },
      }).chapters.length; // Simulate state to check count
      const allProcessedSuccessfully =
        processingError === null && finalChapterCount === 0;

      dispatch({
        type: "FINISH_PROCESSING",
        payload: {
          success: allProcessedSuccessfully,
          error: processingError ?? undefined,
        },
      });

      if (allProcessedSuccessfully) {
        console.log("All chapters processed successfully.");
        // Success toast is implicitly handled by the state update now
      } else if (!processingError) {
        console.log(
          "Processing finished, but some chapters may remain or failed."
        );
      }

      abortControllerRef.current = null; // Clean up controller ref
    }
  }, [state, novel, volume]); // dispatch is stable

  // --- Render Logic ---

  // Memoize sub-components if their props don't change often and rendering is expensive
  // Note: Pass primitive state values instead of the whole state object if possible
  const uploadSection = useMemo(
    () => (
      <UploadSection
        onFileUpload={handleFileChange}
        disabled={state.isProcessingSequence}
        hasChapters={state.chapters.length > 0}
      />
    ),
    [handleFileChange, state.isProcessingSequence, state.chapters.length]
  );

  const chaptersList = useMemo(
    () => (
      <ChaptersList
        chapters={state.chapters}
        loadingId={state.loadingId}
        onRemove={removeChapter}
        onUpdate={updateChapter}
        disabled={state.isProcessingSequence}
      />
    ),
    [
      state.chapters,
      state.loadingId,
      state.isProcessingSequence,
      removeChapter,
      updateChapter,
    ]
  );

  return (
    // Use React.Fragment if Card is not always the root
    <Card className="p-6 mb-14 relative">
      {" "}
      {/* Added relative for absolute positioning inside */}
      {/* Processing/Status Indicator */}
      <div className="absolute top-2 right-2 left-2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded border border-border shadow-sm flex items-center justify-between min-h-[40px]">
        {state.isProcessingSequence && (
          <>
            <span className="text-sm font-medium animate-pulse">
              {state.loadingId
                ? `Posting ${
                    state.chapters.find((ch) => ch.id === state.loadingId)
                      ?.chapterTitle || "chapter"
                  }...`
                : "Processing..."}
            </span>
            <Button
              variant="destructive"
              size="sm" // Smaller button for status area
              onClick={cancelUpload}
              className="flex items-center gap-1" // Reduced gap
            >
              <StopCircle className="h-4 w-4" />
              Cancel
            </Button>
          </>
        )}
        {state.isSuccess && !state.isProcessingSequence && (
          <span className="text-green-600 font-medium text-sm">
            All chapters posted successfully!
          </span>
        )}
        {state.error && !state.isProcessingSequence && (
          <span className="text-red-600 font-medium text-sm">
            Error: {state.error}
          </span>
        )}
        {!state.isProcessingSequence &&
          !state.isSuccess &&
          !state.error &&
          state.chapters.length > 0 && (
            <span className="text-muted-foreground font-medium text-sm">
              Ready to upload {state.chapters.length} chapter(s).
            </span>
          )}
        {!state.isProcessingSequence &&
          state.chapters.length === 0 &&
          !state.isSuccess && (
            <span className="text-muted-foreground font-medium text-sm">
              Add or upload chapters to begin.
            </span>
          )}
      </div>
      {/* Add margin-top to form to prevent overlap with status indicator */}
      <div className="space-y-6 mt-16">
        {uploadSection}
        <div className="space-y-4">
          {chaptersList}

          <ActionButtons
            addNew={addNewChapter}
            onCancel={cancelUpload}
            onPost={handleMultipleChaptersSubmit}
            progress={state.progress}
            posting={state.isProcessingSequence}
            hasChapters={state.chapters.length > 0}
          />
        </div>
      </div>
    </Card>
  );
}
