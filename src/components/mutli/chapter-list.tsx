import { AnimatePresence, motion } from "motion/react";
import React from "react";
import ChapterCard from "./chapter-card";

interface ChapterData {
  id: string;
  content: string;
  chapterNumber: string; // Keep as string if input allows non-numeric initially
  chapterTitle: string;
  postOnOtherWebsite: boolean;
}

const ChaptersList = React.memo(
  ({
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
  }) => {
    // Animation variants can be defined outside the component
    const listContainerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.07 } }, // Faster stagger
    };

    const listItemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        x: -30,
        transition: { duration: 0.2, ease: "easeIn" },
      }, // Changed exit animation slightly
    };

    if (chapters.length === 0) return null;

    return (
      // Use semantic list elements
      <motion.ul
        className="space-y-4 list-none p-0 m-0" // Reset default list styles
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
        aria-label="List of chapters to upload"
      >
        <AnimatePresence mode="popLayout">
          {" "}
          {/* popLayout helps animate smoothly when items reorder or sizes change */}
          {chapters.map((chapter, index) => (
            <motion.li
              key={chapter.id + index}
              layout // Animate layout changes (e.g. when items are removed)
              variants={listItemVariants}
              // initial="hidden" // Not needed if parent handles initial/animate
              // animate="visible"
              exit="exit"
              aria-labelledby={`chapter-title-${chapter.id}`}
            >
              {/* Pass props down to ChapterCard */}
              <ChapterCard
                chapter={chapter}
                isLoading={loadingId === chapter.id}
                onRemove={onRemove}
                onUpdate={onUpdate}
                disabled={disabled || loadingId === chapter.id} // Also disable card interaction if it's the one currently loading
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    );
  }
);
ChaptersList.displayName = "ChaptersList";

export default ChaptersList;
