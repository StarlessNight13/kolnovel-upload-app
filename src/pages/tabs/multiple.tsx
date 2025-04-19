import { Layers2, Plus, StopCircle, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";

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

export default function MultipleTab({ novel, volume }: MultipleTabProps) {
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isProcessingSequence, setIsProcessingSequence] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Stable function to remove a chapter using functional update
  const removeChapter = useCallback((idToRemove: string) => {
    toast("Chapter removed");
    setChapters((prevChapters) =>
      prevChapters.filter((ch) => ch.id !== idToRemove)
    );
  }, []); // No dependencies needed as setChapters is stable

  // Function to cancel the upload process
  const cancelUpload = useCallback(() => {
    if (!isProcessingSequence) return;

    window.ipcRenderer
      .invoke("cancel-upload")
      .then(() => {
        toast.info("Upload cancelled");
        setIsProcessingSequence(false);
        setLoadingId(null);
      })
      .catch((err) => {
        console.error("Failed to cancel upload:", err);
        toast.error("Failed to cancel upload");
      });
  }, [isProcessingSequence]);

  // Function to start the whole process
  const handleMultipleChaptersSubmit = async (e?: React.FormEvent) => {
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
    const chaptersData = chapters.map((ch) => ({ ...ch, novel, volume }));

    try {
      for (const chapter of chaptersData) {
        if (!isProcessingSequence) break; // Check if process was cancelled

        setLoadingId(chapter.id);

        const posted = await window.ipcRenderer.invoke("post-chapter", chapter);

        if (!posted) {
          toast.error(`Error posting chapter: ${chapter.chapterTitle}`);
          continue; // Move to the next item in the array
        }

        toast.success(`Posted chapter: ${chapter.chapterTitle}`);
        setChapters((prevChapters) => {
          return prevChapters.filter((ch) => ch.id !== chapter.id);
        });
      }

      // Check if all chapters were processed
      setChapters((prevChapters) => {
        if (prevChapters.length === 0) {
          console.log("All chapters processed successfully.");
          setIsSuccess(true);
        }
        return prevChapters;
      });
    } catch (error) {
      console.error("Error during upload:", error);
      toast.error("Upload process encountered an error");
    } finally {
      setIsProcessingSequence(false);
      setLoadingId(null);
    }
  };

  function wrapParagraphs(htmlString: string): string {
    const paragraphs = htmlString
      .split(/<br\s*\/?>/i)
      .filter((p) => p.trim() !== "");
    let result = "";
    for (const paragraph of paragraphs) {
      let temp = "";
      let inTag = false;
      for (let i = 0; i < paragraph.length; i++) {
        const char = paragraph[i];
        if (char === "<") {
          inTag = true;
          temp += char;
        } else if (char === ">") {
          inTag = false;
          temp += char;
        } else {
          if (!inTag) {
            let textRun = "";
            while (i < paragraph.length && paragraph[i] !== "<") {
              textRun += paragraph[i];
              i++;
            }
            i--;
            if (textRun.trim()) {
              temp += `<p>${textRun.trim()}</p>\n<br/>`; // Add newline after closing p tag
            }
          } else {
            temp += char;
          }
        }
      }
      result += temp;
    }
    return result;
  }

  const handleFileChange = async () => {
    if (isProcessingSequence) return;

    const filePath = await window.ipcRenderer.invoke("open-file-dialog");
    if (!filePath) return;

    const fileContent = (await window.ipcRenderer.invoke(
      "read-and-convert-file",
      filePath
    )) as FileData | FileData[];

    if (Array.isArray(fileContent)) {
      for (const file of fileContent) {
        addNewChapter({
          content: wrapParagraphs(file.content),
          chapterTitle: file.name,
          chapterNumber: isNaN(Number(file.name.split(".")[0]))
            ? "1"
            : file.name.split(".")[0],
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
    if (isProcessingSequence) return;

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
    if (isProcessingSequence) return;

    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === id ? { ...chapter, [field]: value } : chapter
      )
    );
  };

  return (
    <Card className="p-6 mb-14">
      <div className="flex items-center justify-between">
        {isProcessingSequence && (
          <div className="flex items-center gap-4 w-full justify-between">
            <span className="text-sm font-medium">
              {loadingId
                ? `Posting ${
                    chapters.find((ch) => ch.id === loadingId)?.chapterTitle ||
                    "chapter"
                  }...`
                : "Processing..."}
            </span>
            <Button
              variant="destructive"
              onClick={cancelUpload}
              className="flex items-center gap-2"
            >
              <StopCircle className="h-4 w-4" />
              Cancel Upload
            </Button>
          </div>
        )}
        {isSuccess && (
          <span className="text-green-500 font-medium">
            All chapters posted successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleMultipleChaptersSubmit} className="space-y-6 mt-4">
        <div className="space-y-4">
          {/* Upload Section */}
          <UploadSection
            onFileUpload={handleFileChange}
            disabled={isProcessingSequence}
          />

          {/* Chapters List */}
          <ChaptersList
            chapters={chapters}
            loadingId={loadingId}
            onRemove={removeChapter}
            onUpdate={updateChapter}
            disabled={isProcessingSequence}
          />

          {/* Add New Chapter Button */}
          <div className="flex items-center gap-2 fixed bottom-0 left-1/2 transform -translate-x-1/2  w-screen justify-center bg-black/20 p-4 backdrop-blur-sm">
            <Button
              type="button"
              onClick={() => addNewChapter()}
              disabled={isProcessingSequence}
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-1" /> New Chapter
            </Button>
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isProcessingSequence || chapters.length === 0}
            >
              Upload and Process
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}

// Sub-components
function UploadSection({
  onFileUpload,
  disabled,
}: {
  onFileUpload: () => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">Upload Chapters</Label>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center border-border ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div
          className="flex flex-col items-center justify-center space-y-2"
          onClick={disabled ? undefined : onFileUpload}
        >
          <Upload className="h-10 w-10" />
          <span className="text-sm font-medium">
            {disabled
              ? "Uploading in progress..."
              : "Click to upload or drag and drop"}
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
  disabled,
}: {
  chapters: ChapterData[];
  loadingId: string | null;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof ChapterData, value: unknown) => void;
  disabled: boolean;
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
          disabled={disabled}
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
  disabled,
}: {
  chapter: ChapterData;
  isLoading: boolean;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof ChapterData, value: unknown) => void;
  disabled: boolean;
}) {
  return (
    <div className="p-4 rounded-lg">
      <Card className={disabled && !isLoading ? "opacity-70" : ""}>
        <CardHeader>
          <CardTitle>
            {chapter.chapterTitle || "Untitled Chapter"}
            {isLoading && (
              <span className="ml-2 text-xs font-normal text-blue-500">
                Uploading...
              </span>
            )}
          </CardTitle>
          <Button
            type="button"
            variant="destructive"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={() => onRemove(chapter.id)}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </Button>
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
              disabled={disabled}
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
              disabled={disabled}
            />
          </div>
        </div>

        <CardContent className="flex flex-col flex-1">
          <Accordion type="single" collapsible>
            <AccordionItem value="chapter-content">
              <AccordionTrigger disabled={disabled}>
                Chapter Content
              </AccordionTrigger>
              <AccordionContent>
                <Editor
                  content={chapter.content}
                  onChange={(value) => onUpdate(chapter.id, "content", value)}
                  editorClassName="min-h-44 overflow-clip"
                  disabled={disabled}
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
            disabled={disabled}
          >
            <Layers2 className="mr-2 h-4 w-4" />
            Post on the other website
          </Toggle>
        </CardHeader>
      </Card>
    </div>
  );
}
