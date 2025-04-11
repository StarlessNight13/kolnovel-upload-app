import { Layers2, Plus, Upload, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import Editor from "@/components/Tiptap";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";

interface ChapterData {
  id: string;
  content: string;
  chapterNumber: string;
  chapterTitle: string;
  postOnOtherWebsite: boolean;
}

interface FileData {
  type: string;
  name: string;
  content: string;
}

interface MultipleTabProps {
  novel: string;
  volume: string;
}
// interface ResponseData {
//   status: string;
//   id: string;
//   // Add other potential response fields if needed
//   error?: string;
// }

export function MultipleTab({ novel, volume }: MultipleTabProps) {
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isProcessingSequence, setIsProcessingSequence] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Define IPC channel names as constants for better maintainability
  const IPC_PROCESS_ARRAY = "process-data-array";
  const IPC_TAB_PROCESSING = "tab-processing"; // Corrected typo
  const IPC_TAB_PROCESSED = "tab-processed";

  // Stable function to remove a chapter using functional update
  const removeChapter = useCallback((idToRemove: string) => {
    toast("Chapter removed");
    setChapters((prevChapters) =>
      prevChapters.filter((ch) => ch.id !== idToRemove)
    );
  }, []); // No dependencies needed as setChapters is stable

  // Effect for setting up and tearing down IPC listeners
  useEffect(() => {
    // Handler for when a specific tab starts processing
    const handleTabProcessing = (_: unknown, result: { id: string }) => {
      console.log(`${IPC_TAB_PROCESSING}:`, result);
      setLoadingId(result.id);
    };

    // Handler for when a specific tab finishes processing
    const handleTabProcessed = (
      _: unknown,
      result: { id: string /* add other potential result props */ }
    ) => {
      console.log(`${IPC_TAB_PROCESSED}:`, result);

      // Use functional update for setChapters to ensure we have the latest state
      // and check the length *after* the update within the same state transition.
      setChapters((prevChapters) => {
        const updatedChapters = prevChapters.filter(
          (ch) => ch.id !== result.id
        );

        // Check if this was the last chapter
        if (updatedChapters.length === 0) {
          console.log("All chapters processed successfully.");
          setIsSuccess(true);
          setIsProcessingSequence(false); // Sequence finished
          setLoadingId(null); // Clear loading indicator
        }
        // else {
        // Optional: If you needed to trigger the *next* item explicitly here,
        // you could, but the original logic implied the main process handles the sequence.
        // }

        return updatedChapters; // Return the new state for chapters
      });
    };

    // Register listeners
    window.ipcRenderer.on(IPC_TAB_PROCESSING, handleTabProcessing);
    window.ipcRenderer.on(IPC_TAB_PROCESSED, handleTabProcessed);

    // Cleanup function: remove listeners when the component unmounts
    return () => {
      console.log("Cleaning up IPC listeners...");
    };
    // Rerun effect only if IPC channel names change (which they shouldn't)
    // or if the component mounts/unmounts.
  }, [IPC_TAB_PROCESSING, IPC_TAB_PROCESSED]); // Dependency array ensures setup/cleanup runs once

  // Function to start the whole process
  const handleMultipleChaptersSubmit = (e?: React.FormEvent) => {
    e?.preventDefault(); // Optional preventDefault

    // Don't start if already processing or no chapters left
    if (isProcessingSequence || chapters.length === 0) {
      console.log("Processing already in progress or no chapters to process.");
      return;
    }

    console.log("Starting chapter processing sequence...");

    // Reset states for a new sequence run
    setLoadingId(null);
    setIsSuccess(false);
    setIsProcessingSequence(true); // Signal that the sequence is starting

    // Send the initial data to the main process
    // The main process is expected to handle iterating through the chapters.
    window.ipcRenderer.send(
      IPC_PROCESS_ARRAY,
      // Map current chapters state with novel and volume info
      chapters.map((ch) => ({ ...ch, novel, volume }))
    );
  };

  //  the rest ================

  const handleFileChange = async () => {
    const filePath = await window.ipcRenderer.invoke("open-file-dialog");
    if (!filePath) return;

    const fileContent = (await window.ipcRenderer.invoke(
      "read-and-convert-file",
      filePath
    )) as FileData | FileData[];
    if (Array.isArray(fileContent)) {
      console.log("Array of files");
      for (const file of fileContent) {
        addNewChapter({
          content: file.content,
          chapterTitle: file.name,
          chapterNumber: "1",
          postOnOtherWebsite: true,
        });
      }
    } else {
      addNewChapter({
        content: fileContent.content,
        chapterTitle: fileContent.name,
        chapterNumber: "1",
        postOnOtherWebsite: true,
      });
    }
  };

  const addNewChapter = (chapterData?: Partial<Omit<ChapterData, "id">>) => {
    const newChapter: ChapterData = {
      id: crypto.randomUUID(),
      content: "",
      chapterTitle: "",
      chapterNumber: "",
      postOnOtherWebsite: true,
      ...chapterData,
    };

    setChapters((prev) => [...prev, newChapter]);
  };

  const updateChapter = (
    id: string,
    field: keyof ChapterData,
    value: unknown
  ) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === id ? { ...chapter, [field]: value } : chapter
      )
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        {isProcessingSequence && <span>Processing...</span>}
        {loadingId && (
          <span>
            Posting {chapters.find((ch) => ch.id === loadingId)?.chapterTitle}
          </span>
        )}
        {isSuccess && <span>Posted!</span>}
      </div>
      <form onSubmit={handleMultipleChaptersSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Upload Section */}
          <UploadSection onFileUpload={handleFileChange} />

          {/* Chapters List */}
          <ChaptersList
            chapters={chapters}
            loadingId={loadingId}
            onRemove={removeChapter}
            onUpdate={updateChapter}
          />
          {/* Add New Chapter Button */}
          <div>
            <Button type="button" onClick={() => addNewChapter()}>
              <Plus className="h-4 w-4 mr-1" /> New Chapter
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Upload and Process
        </Button>
      </form>
    </Card>
  );
}

// Sub-components
function UploadSection({ onFileUpload }: { onFileUpload: () => void }) {
  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">Upload Chapters</Label>
      <div className="border-2 border-dashed rounded-lg p-8 text-center border-border">
        <div
          className="flex flex-col items-center justify-center space-y-2 cursor-pointer"
          onClick={onFileUpload}
        >
          <Upload className="h-10 w-10" />
          <span className="text-sm font-medium">
            Click to upload or drag and drop
          </span>
          <span className="text-xs">
            ZIP file for multiple chapters or single file for one chapter
          </span>
        </div>
      </div>
    </div>
  );
}

function ChaptersList({
  chapters,
  loadingId,
  onRemove,
  onUpdate,
}: {
  chapters: ChapterData[];
  loadingId: string | null;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof ChapterData, value: unknown) => void;
}) {
  if (chapters.length === 0) return null;

  return (
    <div className="space-y-4">
      {chapters.map((chapter) => (
        <ChapterCard
          key={chapter.id}
          chapter={chapter}
          isLoading={loadingId === chapter.id}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

function ChapterCard({
  chapter,
  isLoading,
  onRemove,
  onUpdate,
}: {
  chapter: ChapterData;
  isLoading: boolean;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof ChapterData, value: unknown) => void;
}) {
  return (
    <div className="p-4 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>{chapter.chapterTitle}</CardTitle>
          <Button
            type="button"
            variant="destructive"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => onRemove(chapter.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          {isLoading && (
            <span className="text-xs">
              Uploading Chapter {chapter.chapterNumber}
            </span>
          )}
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="space-y-2">
            <Label htmlFor={`chapterNumber-${chapter.id}`}>
              Chapter Number
            </Label>
            <Input
              id={`chapterNumber-${chapter.id}`}
              type="number"
              value={chapter.chapterNumber}
              onChange={(e) =>
                onUpdate(chapter.id, "chapterNumber", e.target.value)
              }
              placeholder="e.g., 1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`chapterTitle-${chapter.id}`}>Chapter Title</Label>
            <Input
              id={`chapterTitle-${chapter.id}`}
              value={chapter.chapterTitle}
              onChange={(e) =>
                onUpdate(chapter.id, "chapterTitle", e.target.value)
              }
              placeholder="Enter chapter title"
            />
          </div>
        </div>

        <CardContent className="flex flex-col flex-1">
          <Accordion type="single" collapsible>
            <AccordionItem value="chapter-content">
              <AccordionTrigger>Chapter Content</AccordionTrigger>
              <AccordionContent>
                <Editor
                  content={chapter.content}
                  onChange={(value) => onUpdate(chapter.id, "content", value)}
                  editorClassName="max-h-44 overflow-clip"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>

        <CardHeader>
          <Toggle
            pressed={chapter.postOnOtherWebsite}
            onPressedChange={() =>
              onUpdate(
                chapter.id,
                "postOnOtherWebsite",
                !chapter.postOnOtherWebsite
              )
            }
          >
            <Layers2 />
            Post on the other website
          </Toggle>
        </CardHeader>
      </Card>
    </div>
  );
}
