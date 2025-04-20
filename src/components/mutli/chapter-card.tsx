import Editor from "@/components/Tiptap"; // Assuming Tiptap is correctly memoized or pure
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Layers2, X } from "lucide-react";
import { motion } from "motion/react";
import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Toggle } from "../ui/toggle";

interface ChapterData {
  id: string;
  content: string;
  chapterNumber: string; // Keep as string if input allows non-numeric initially
  chapterTitle: string;
  postOnOtherWebsite: boolean;
}

// Memoize ChapterCard as its props might change, but maybe not always when parent re-renders
const ChapterCard = React.memo(
  ({
    chapter,
    isLoading,
    onRemove,
    onUpdate,
    disabled, // Combined disabled state (processing sequence or specific card loading)
  }: {
    chapter: ChapterData;
    isLoading: boolean;
    onRemove: (id: string) => void;
    onUpdate: (id: string, field: keyof ChapterData, value: unknown) => void;
    disabled: boolean;
  }) => {
    // Define animation variants outside if they are static

    // Specific handler for content change to potentially debounce or add specific logic
    const handleContentChange = useCallback(
      (value: string) => {
        // Debounce could be added here if TipTap updates very frequently
        onUpdate(chapter.id, "content", value);
      },
      [onUpdate, chapter.id]
    );

    return (
      // Use article for semantic representation of a chapter
      <motion.article
        // Removed internal motion.div, apply variants directly to Card or a wrapper
        // The motion.li in ChaptersList already handles entrance/exit animation for the item
        className={`rounded-lg overflow-hidden transition-opacity ${
          disabled && !isLoading ? "opacity-60 pointer-events-none" : ""
        } ${isLoading ? "ring-2 ring-primary ring-offset-2" : ""}`}
      >
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 relative py-3 px-4">
            {" "}
            {/* Reduced padding */}
            {/* Title is part of the main content, not just a heading for the button */}
            <CardTitle
              id={`chapter-title-${chapter.id}`}
              className="text-lg font-semibold truncate pr-12"
            >
              {" "}
              {/* Allow truncation */}
              {chapter.chapterTitle || "Untitled Chapter"}
              {isLoading && (
                <span className="ml-2 text-xs font-normal text-primary animate-pulse">
                  (Processing...)
                </span>
              )}
            </CardTitle>
            <Button
              type="button"
              variant="ghost" // Use ghost or destructive outline for less emphasis
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={() => onRemove(chapter.id)}
              disabled={disabled} // Use the combined disabled prop
              aria-label={`Remove chapter: ${
                chapter.chapterTitle || "Untitled"
              }`}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Input Fields Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 pb-3 border-b">
            <div className="space-y-1">
              <Label
                htmlFor={`chapterNumber-${chapter.id}`}
                className="text-xs"
              >
                Number
              </Label>
              <Input
                id={`chapterNumber-${chapter.id}`}
                type="text" // Use text to allow leading zeros or other formats if needed initially
                inputMode="numeric" // Hint for mobile keyboards
                pattern="\d*" // Allow only digits via HTML5 validation (basic)
                value={chapter.chapterNumber}
                onChange={(e) =>
                  onUpdate(chapter.id, "chapterNumber", e.target.value)
                }
                placeholder="e.g., 10"
                disabled={disabled}
                className="h-8 text-sm" // Smaller input
                aria-label="Chapter number"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`chapterTitle-${chapter.id}`} className="text-xs">
                Title
              </Label>
              <Input
                id={`chapterTitle-${chapter.id}`}
                value={chapter.chapterTitle}
                onChange={(e) =>
                  onUpdate(chapter.id, "chapterTitle", e.target.value)
                }
                placeholder="Enter chapter title"
                disabled={disabled}
                className="h-8 text-sm" // Smaller input
                aria-label="Chapter title"
              />
            </div>
          </div>

          {/* Content Editor Section */}
          <CardContent className="p-0">
            {" "}
            {/* Remove default padding */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="chapter-content" className="border-none">
                <AccordionTrigger
                  className="text-sm font-medium px-4 py-2 hover:no-underline [&[data-state=open]>svg]:rotate-180" // Custom styles
                  disabled={disabled}
                >
                  Chapter Content Editor
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  {/* Assuming Editor component is memoized or handles updates efficiently */}
                  <Editor
                    content={chapter.content}
                    onChange={handleContentChange} // Use specific handler
                    disabled={disabled}
                    // Pass aria labels if the Editor supports them
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>

          {/* Options/Footer Section */}
          <CardHeader className="py-2 px-4 border-t">
            {" "}
            {/* Use CardHeader like a footer */}
            <div className="flex items-center justify-start">
              <Toggle
                pressed={chapter.postOnOtherWebsite}
                onPressedChange={
                  (pressed) =>
                    onUpdate(chapter.id, "postOnOtherWebsite", pressed) // Toggle sends pressed state directly
                }
                disabled={disabled}
                size="sm" // Smaller toggle
                aria-label="Toggle posting on the other website"
              >
                <Layers2 className="mr-2 h-4 w-4" />
                Post on other website
              </Toggle>
            </div>
          </CardHeader>
        </Card>
      </motion.article>
    );
  }
);
ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
